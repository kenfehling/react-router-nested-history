import Page from './Page'
import Container from './Container'
import * as R from 'ramda'
import IContainer from './IContainer'
import ISubGroup from './ISubGroup'
import Group from './Group'
import Window from './Window'
import PathTitle from './PathTitle'
import {HistoryStack, default as Pages} from './Pages'
import VisitedPage from './VistedPage'
import {VisitType} from './PageVisit'
import IGroupContainer from './IGroupContainer'
import {Map, fromJS} from 'immutable'
import {PartialComputedState, ComputedGroup} from './ComputedState'
import IState from '../store/IState'

abstract class State implements IState {
  readonly groups: Map<string, Group>
  readonly windows: Map<string, Window>
  readonly titles: PathTitle[]
  readonly zeroPage?: string
  readonly lastUpdate: number
  readonly loadedFromRefresh: boolean
  readonly isOnZeroPage: boolean

  constructor({groups=fromJS({}), windows=fromJS({}), zeroPage, lastUpdate=0,
    loadedFromRefresh=false, isOnZeroPage=false, titles=[]}:
    {groups?:Map<string, Group>, windows?:Map<string, Window>,
      zeroPage?:string, lastUpdate?:number, loadedFromRefresh?:boolean,
      isOnZeroPage?:boolean, titles?:PathTitle[]}={}) {
    this.groups = groups
    this.windows = windows
    this.zeroPage = zeroPage
    this.lastUpdate = lastUpdate
    this.loadedFromRefresh = loadedFromRefresh
    this.isOnZeroPage = isOnZeroPage
    this.titles = titles
  }

  get allComputedGroups():Map<string, ComputedGroup> {
    return fromJS({}).merge(
      this.groups.map((g:Group) => g.computeState()),
      ...this.groups.toArray().map((g:Group) => g.computeSubGroups())
    )
  }

  computeState():PartialComputedState {
    return {
      isInitialized: this.isInitialized,
      loadedFromRefresh: this.loadedFromRefresh,
      activeUrl: this.activeUrl,
      groups: fromJS(this.allComputedGroups),
      windows: fromJS(this.windows.map((w:Window) => w.computeState())),
      activeGroupName: this.activeGroupName,
      lastUpdate: this.lastUpdate,
      pages: this.pages,
      activeTitle: this.activeTitle
    }
  }

  abstract get pages():Pages
  abstract assign(obj:Object):State
  abstract get isInitialized():boolean
  abstract getContainerStackOrderForGroup(groupName:string):IContainer[]
  abstract switchToGroup({groupName, time}:{groupName:string, time:number}):State
  abstract closeWindow(forName:string):State
  abstract get activeGroupName():string

  abstract switchToContainer({groupName, name, time}:
      {groupName:string, name:string, time:number}):State

  abstract getRootGroupOfGroupByName(name:string):Group
  abstract getRootGroupOfGroup(group:Group):Group
  abstract push(page:Page, time:number):State
  abstract go(n:number, time:number):State
  abstract back(n:number, time:number):State
  abstract forward(n:number, time:number):State

  abstract canGoBack(n:number):boolean
  abstract canGoForward(n:number):boolean
  abstract isContainerAtTopPage(groupName:string, containerName:string):boolean
  abstract top({groupName, containerName, time, reset}:
      {groupName:string, containerName:string,
        time:number, reset?:boolean}):State

  abstract getShiftAmount(page:Page):number

  abstract containsPage(page:Page):boolean
  protected abstract getHistory(maintainFwd:boolean):HistoryStack
  abstract get groupStackOrder():Group[]
  abstract getBackPageInGroup(groupName:string):Page|undefined
  abstract getActiveContainerNameInGroup(groupName:string)
  abstract getActiveContainerIndexInGroup(groupName:string)
  abstract getActivePageInGroup(groupName:string):Page
  abstract getActiveUrlInGroup(groupName:string):string
  abstract urlMatchesGroup(url:string, groupName:string):boolean
  abstract get activePage():Page
  abstract isContainerActive(groupName:string, containerName:string):boolean
  abstract get activeUrl():string
  abstract getActivePageInContainer(groupName:string, containerName:string):Page
  abstract getActiveUrlInContainer(groupName:string, containerName:string):string
  abstract get activeGroup():Group
  abstract isGroupActive(groupName:string):boolean
  abstract get activeContainer():IContainer
  abstract getContainer(groupName:string, containerName:string):IContainer
  abstract isActiveContainer(groupName:string, containerName:string):boolean
  abstract getContainerNameByIndex(groupName:string, index:number):string

  replaceGroup(group:Group):State {
    if (group.parentGroupName) {
      const parentGroup:Group = this.getGroupByName(group.parentGroupName)
      return this.replaceGroup(parentGroup.replaceContainer(group as ISubGroup))
    }
    else {
      return this.assign({
        groups: this.groups.set(group.name, group)
      })
    }
  }

  replaceWindow(window:Window):State {
    return this.assign({
      windows: this.windows.set(window.forName, window)
    })
  }

  disallowDuplicateContainerOrGroup(name) {
    if (this.hasGroupOrContainerWithName(name)) {
      throw new Error(`A group or container with name: '${name}' already exists`)
    }
  }

  disallowDuplicateWindow(forName) {
    if (this.windows.has(forName)) {
      throw new Error(`A window for name '${forName}' already exists`)
    }
  }

  addTopLevelGroup({name, resetOnLeave=false, allowInterContainerHistory=false,
    gotoTopOnSelectActive=false}:
    {name:string, resetOnLeave?:boolean, allowInterContainerHistory?:boolean,
      gotoTopOnSelectActive?:boolean}):State {
    this.disallowDuplicateContainerOrGroup(name)
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      allowInterContainerHistory,
      parentGroupName: null,
      isDefault: null
    })
    return this.replaceGroup(group)
  }

  addSubGroup({name, parentGroupName, isDefault=false,
    allowInterContainerHistory=false, resetOnLeave=false,
    gotoTopOnSelectActive=false}:
    {name:string, parentGroupName:string, isDefault:boolean,
      allowInterContainerHistory?:boolean,
      resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):State {
    this.disallowDuplicateContainerOrGroup(name)
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      allowInterContainerHistory,
      parentGroupName,
      isDefault
    })
    return this.replaceGroup(group)
  }

  addContainer({time, name, groupName, initialUrl, isDefault=false,
    resetOnLeave=false, patterns}:
    {time:number, name:string, groupName:string, initialUrl:string,
      patterns:string[], isDefault:boolean, resetOnLeave:boolean}):State {
    this.disallowDuplicateContainerOrGroup(name)
    const group:Group = this.getGroupByName(groupName)
    const container:Container = new Container({
      time,
      initialUrl,
      patterns,
      resetOnLeave,
      groupName,
      name,
      isDefault
    })
    return this.replaceGroup(group.replaceContainer(container))
  }

  addWindow({forName, visible=true}:{forName:string, visible?:boolean}):State {
    this.disallowDuplicateWindow(forName)
    return this.replaceWindow(new Window({forName, visible}))
  }

  /**
   * Finds a group (top-level or subgroup) by its name
   */
  getGroupByName(name:string):Group {
    const g:Group = this.groups.get(name)
    if (g) {
      return g
    }
    else {
      let foundGroup:ISubGroup|null = null
      this.groups.forEach((group:Group) => {
        const g = group.getNestedGroupByName(name)
        if (g) {
          foundGroup = g
          return
        }
      })
      if (foundGroup) {
        return foundGroup
      }
      else {
        throw new Error('Group \'' + name + '\' not found')
      }
    }
  }

  getContainerByName(name:string):IGroupContainer {
    let foundContainer:IGroupContainer|null = null
    this.groups.forEach((group:Group) => {
      const c:IGroupContainer|null = group.getNestedContainerByName(name)
      if (c) {
        foundContainer = c
        return
      }
    })
    if (foundContainer) {
      return foundContainer
    }
    else {
      throw new Error('Container \'' + name + '\' not found')
    }
  }

  get history():HistoryStack {
    return this.getHistory(false)
  }

  get historyWithFwdMaintained():HistoryStack {
    return this.getHistory(true)
  }

  hasGroupWithName(name:string):boolean {
    try {
      this.getGroupByName(name)
      return true
    }
    catch (e) {
      return false
    }
  }

  hasContainerWithName(name:string):boolean {
    try {
      this.getContainerByName(name)
      return true
    }
    catch (e) {
      return false
    }
  }

  hasGroupOrContainerWithName(name:string):boolean {
    return this.hasGroupWithName(name) || this.hasContainerWithName(name)
  }

  addTitle({pathname, title}:{pathname:string, title:string}):State {
    const existingTitle = this.getTitleForPath(pathname)
    return existingTitle ? this :
      this.assign({titles: [...this.titles, {pathname, title}]})
  }

  getTitleForPath(pathname:string):string|null {
    const found = R.find(t => t.pathname === pathname, this.titles)
    return found ? found.title : null
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