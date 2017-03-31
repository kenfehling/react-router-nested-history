import Page from './Page'
import Container from './Container'
import * as R from 'ramda'
import Group from './Group'
import PathTitle from './PathTitle'
import VisitedPage from './VistedPage'
import {VisitType} from './PageVisit'
import IContainer from './IContainer'
import {Map, List, fromJS} from 'immutable'
import {PartialComputedState} from './ComputedState'
import IState from '../store/IState'
import HistoryWindow from './HistoryWindow'
import HistoryStack from './HistoryStack'

abstract class State implements IState {
  readonly containers: Map<string, IContainer>
  readonly windows: Map<string, HistoryWindow>
  readonly pages: List<VisitedPage>
  readonly titles: PathTitle[]
  readonly zeroPage?: string
  readonly isOnZeroPage: boolean

  constructor({windows=fromJS({}), containers=fromJS({}),
                zeroPage, isOnZeroPage=false, titles=[]}:
    {containers?: Map<string, IContainer>, windows?:Map<string, HistoryWindow>,
      zeroPage?:string, isOnZeroPage?:boolean, titles?:PathTitle[]}={}) {
    this.containers = containers
    this.windows = windows
    this.zeroPage = zeroPage
    this.isOnZeroPage = isOnZeroPage
    this.titles = titles
  }

  get groups():Map<string, Group> {
    return this.containers.filter(c => this.isGroup(c.name)).toMap()
  }

  get leafContainers():Map<string, Container> {
    return this.containers.filter(c => !this.isGroup(c.name)).toMap()
  }

  isGroup(name:string):boolean {
    return this.groups.has(name)
  }

  abstract assign(obj:Object):State
  abstract get isInitialized():boolean
  abstract getContainerStackOrderForGroup(groupName:string):List<IContainer>
  abstract switchToGroup({name, time}:{name:string, time:number}):State
  abstract openWindowAtIndex({groupName, index, time}:{groupName:string, index:number, time:number}):State
  abstract openWindowForName({name, time}:{name:string, time:number}):State
  abstract closeWindow({forName, time}:{forName:string, time:number}):State
  abstract switchToContainer({name, time}: { name: string, time: number}):State
  abstract getRootGroupOfGroupByName(name:string):Group
  abstract getRootGroupOfGroup(group:Group):Group
  abstract push({page, time}:{page:Page, time:number}):State
  abstract go({n, time, container}:{n:number, time:number, container?:string}):State
  abstract back({n, time, container}:{n:number, time:number, container?:string}):State
  abstract forward({n, time, container}:{n:number, time:number, container?:string}):State
  abstract isContainerAtTopPage(containerName:string):boolean
  abstract top({containerName, time, reset}:
               {containerName:string, time:number, reset?:boolean}):State
  abstract getShiftAmount(page:Page):number
  abstract containsPage(page:Page):boolean
  protected abstract getHistory(maintainFwd:boolean):HistoryStack
  abstract get groupStackOrder():Group[]
  abstract getGroupBackPage(groupName:string):Page|undefined
  abstract getActiveContainerNameInGroup(groupName:string)
  abstract getActiveContainerIndexInGroup(groupName:string)
  abstract get activePage():VisitedPage
  abstract isContainerActiveAndEnabled(container:string):boolean
  abstract get activeUrl():string
  abstract getContainerActivePage(container:string):VisitedPage
  abstract getContainerActiveUrl(container:string):string
  abstract isGroupActive(groupName:string):boolean
  abstract getContainerNameByIndex(groupName:string, index:number):string
  abstract computeState():PartialComputedState

  replaceContainer(container:IContainer):State {
    return this.assign({
      containers: this.containers.set(container.name, container)
    })
  }

  replacePage(page:VisitedPage):State {
    return this.assign({
      pages: this.pages.set(this.pages.indexOf(page), page)
    })
  }

  disallowDuplicateContainer(name) {
    if (this.containers.has(name)) {
      throw new Error(`A group or container with name: '${name}' already exists`)
    }
  }

  addTopLevelGroup({name, resetOnLeave=false, allowInterContainerHistory=false,
    gotoTopOnSelectActive=false}:
    {name:string, resetOnLeave?:boolean, allowInterContainerHistory?:boolean,
      gotoTopOnSelectActive?:boolean}):State {
    this.disallowDuplicateContainer(name)
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      allowInterContainerHistory,
      parentGroupName: '',
      isDefault: false
    })
    return this.replaceContainer(group)
  }

  addSubGroup({name, parentGroupName, isDefault=false,
    allowInterContainerHistory=false, resetOnLeave=false,
    gotoTopOnSelectActive=false}:
    {name:string, parentGroupName:string, isDefault:boolean,
      allowInterContainerHistory?:boolean,
      resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):State {
    this.disallowDuplicateContainer(name)
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      allowInterContainerHistory,
      parentGroupName,
      isDefault
    })
    return this.replaceContainer(group)
  }

  addContainer({time, name, groupName, initialUrl, isDefault=false,
    resetOnLeave=false, patterns}:
    {time:number, name:string, groupName:string, initialUrl:string,
      patterns:string[], isDefault:boolean, resetOnLeave:boolean}):State {
    this.disallowDuplicateContainer(name)
    const container:Container = new Container({
      time,
      initialUrl,
      patterns,
      resetOnLeave,
      groupName,
      name,
      isDefault
    })
    return this.replaceContainer(container)
  }

  replaceWindow(w:HistoryWindow):State {
    return this.assign({windows: this.windows.set(w.forName, w)})
  }

  setWindowVisibility({forName, visible}:
                      {forName:string, visible:boolean}):State {
    return this.replaceWindow(this.windows.get(forName).setVisible(visible))
  }

  addWindow({forName, visible=true}:{forName:string, visible?:boolean}):State {
    const w:HistoryWindow = new HistoryWindow({forName, visible})
    return this.replaceWindow(w)
  }

  get history():HistoryStack {
    return this.getHistory(false)
  }

  get historyWithFwdMaintained():HistoryStack {
    return this.getHistory(true)
  }

  addTitle({pathname, title}:{pathname:string, title:string}):State {
    const existingTitle = this.getTitleForPath(pathname)
    return existingTitle ? this :
      this.assign({titles: [...this.titles, {pathname, title}]})
  }

  getTitleForPath(pathname:string):string|undefined {
    const found = R.find(t => t.pathname === pathname, this.titles)
    return found ? found.title : undefined
  }

  hasTitleForPath(pathname:string):boolean {
    return !!this.getTitleForPath(pathname)
  }

  get activeTitle() {
    return this.getTitleForPath(this.activeUrl)
  }

  static createZeroPage(url:string) {
    return new VisitedPage({
      url,
      params: {},
      groupName: '',
      containerName: '',
      isZeroPage: true,
      visits: [{time: -1, type: VisitType.AUTO}]
    })
  }

  /**
   * Gets the zero page, or if it's not set defaults to using
   * the initialUrl of the first container in the first group
   */
  getZeroPage():VisitedPage {
    return State.createZeroPage(
        this.zeroPage || this.groups.first().containers.first().initialUrl)
  }
}

export default State