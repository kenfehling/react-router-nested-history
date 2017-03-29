import Page from './Page'
import Container from './Container'
import * as R from 'ramda'
import ISubGroup from './ISubGroup'
import Group from './Group'
import PathTitle from './PathTitle'
import {HistoryStack, default as Pages} from './Pages'
import VisitedPage from './VistedPage'
import {VisitType} from './PageVisit'
import IContainer from './IContainer'
import {Map, OrderedMap, Set, fromJS} from 'immutable'
import {
  PartialComputedState, ComputedGroup, ComputedWindow, ComputingWindow,
  ComputedContainer, ComputedGroupOrContainer
} from './ComputedState'
import IState from '../store/IState'
import HistoryWindow from './HistoryWindow'

abstract class State implements IState {
  readonly groups: Map<string, Group>
  readonly titles: PathTitle[]
  readonly zeroPage?: string
  readonly loadedFromRefresh: boolean
  readonly isOnZeroPage: boolean

  constructor({groups=fromJS({}), zeroPage, loadedFromRefresh=false,
                isOnZeroPage=false, titles=[]}:
    {groups?:Map<string, Group>, zeroPage?:string, loadedFromRefresh?:boolean,
      isOnZeroPage?:boolean, titles?:PathTitle[]}={}) {
    this.groups = groups
    this.zeroPage = zeroPage
    this.loadedFromRefresh = loadedFromRefresh
    this.isOnZeroPage = isOnZeroPage
    this.titles = titles
  }

  abstract get pages():Pages
  abstract assign(obj:Object):State
  abstract get isInitialized():boolean
  abstract getContainerStackOrderForGroup(groupName:string):IContainer[]
  abstract switchToGroup({name, time}:{name:string, time:number}):State
  abstract openWindowAtIndex({groupName, index, time}:{groupName:string, index:number, time:number}):State
  abstract openWindowForName({name, time}:{name:string, time:number}):State
  abstract closeWindow({forName, time}:{forName:string, time:number}):State
  abstract get activeGroupName():string
  abstract switchToContainer({name, time}: { name: string, time: number}):State
  abstract getRootGroupOfGroupByName(name:string):Group
  abstract getRootGroupOfGroup(group:Group):Group
  abstract push({page, time}:{page:Page, time:number}):State
  abstract go({n, time, container}:{n:number, time:number, container?:string}):State
  abstract back({n, time, container}:{n:number, time:number, container?:string}):State
  abstract forward({n, time, container}:{n:number, time:number, container?:string}):State
  abstract canGoBack(n:number):boolean
  abstract canGoForward(n:number):boolean
  abstract isContainerAtTopPage(containerName:string):boolean
  abstract top({containerName, time, reset}:
               {containerName:string, time:number, reset?:boolean}):State
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
  abstract isContainerActiveAndEnabled(containerName:string):boolean
  abstract get activeUrl():string
  abstract getActivePageInContainer(groupName:string, containerName:string):Page
  abstract getActiveUrlInContainer(groupName:string, containerName:string):string
  abstract get activeGroup():Group
  abstract isGroupActive(groupName:string):boolean
  abstract get activeContainer():IContainer
  abstract isActiveContainer(groupName:string, containerName:string):boolean
  abstract getContainerNameByIndex(groupName:string, index:number):string

  get computedGroupsAndContainers():Map<string, ComputedGroupOrContainer> {
    return this.groups.reduce(
        (map:Map<string, ComputedGroupOrContainer>, g:Group) =>
            map.merge(g.computeContainersAndGroups()),
      fromJS({}))
  }

  get computedGroups():Map<string, ComputedGroup> {
    return this.groups.reduce(
      (map:Map<string, ComputedGroup>, g:Group) =>
          map.merge(g.computeGroups()),
      fromJS({}))
  }

  get computedContainers():Map<string, ComputedContainer> {
    const currentUrl = this.activeUrl
    return this.groups.reduce(
      (map:Map<string, ComputedContainer>, g:Group) =>
          map.merge(g.computeContainers(currentUrl)),
      fromJS({}))
  }

  private get computingWindows():OrderedMap<string, ComputingWindow> {
    return this.groups.reduce(
      (map:Map<string, ComputingWindow>, g:Group) =>
        map.merge(g.computeWindows()), OrderedMap<string, ComputingWindow>())
  }

  get computedWindows():OrderedMap<string, ComputedWindow> {
    const ws = this.computingWindows
    let i:number = ws.size
    let seenGroups:Set<string> = Set<string>()
    return ws.map((w:ComputingWindow):ComputedWindow => {
      const sawGroup:boolean = seenGroups.has(w.groupName)
      seenGroups = seenGroups.add(w.groupName)
      return {
        ...w,
        zIndex: i--,
        isOnTop: !sawGroup
      }
    }) as OrderedMap<string, ComputedWindow>
  }

  computeState():PartialComputedState {
    return {
      isInitialized: this.isInitialized,
      loadedFromRefresh: this.loadedFromRefresh,
      activeUrl: this.activeUrl,
      groupsAndContainers: this.computedGroupsAndContainers,
      groups: this.computedGroups,
      containers: this.computedContainers,
      windows: this.computedWindows,
      activeGroupName: this.activeGroupName,
      pages: this.pages,
      activeTitle: this.activeTitle
    }
  }

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

  replaceContainer(container:IContainer):State {
    if (container instanceof Group) {
      return this.replaceGroup(container)
    }
    else {
      const group:Group = this.getGroupByName(container.groupName)
      return this.replaceGroup(group.replaceContainer(container))
    }
  }

  replaceWindow(w:HistoryWindow, c:IContainer):State {
    const newContainer:IContainer = c.replaceWindow(w)
    const group:Group = this.getGroupByName(c.groupName)
    return this.replaceGroup(group.replaceContainer(newContainer))
  }

  disallowDuplicateContainerOrGroup(name) {
    if (this.hasGroupOrContainerWithName(name)) {
      throw new Error(`A group or container with name: '${name}' already exists`)
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
      parentGroupName: '',
      isDefault: false
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

  setWindowVisibility({forName, visible}:
                      {forName:string, visible:boolean}):State {
    const c:IContainer = this.getContainerByName(forName)
    const group:Group = this.getGroupByName(c.groupName)
    return this.replaceGroup(group.replaceContainer(c.setEnabled(visible)))
  }

  addWindow({forName, visible=true}:{forName:string, visible?:boolean}):State {
    const w:HistoryWindow = new HistoryWindow({forName})
    const c:IContainer = this.getContainerByName(forName)
    return this.replaceWindow(w, c.setEnabled(visible))
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
      let foundGroup:ISubGroup|undefined = undefined
      this.groups.forEach((group:Group) => {
        try {
          foundGroup = group.getNestedGroupByName(name)
          return
        }
        catch (e) { }
      })
      if (foundGroup) {
        return foundGroup
      }
      else {
        throw new Error('Group \'' + name + '\' not found')
      }
    }
  }

  getContainerByName(name:string):IContainer {
    let foundContainer:IContainer|undefined = undefined
    this.groups.forEach((group:Group) => {
      if (group.name === name) {
        foundContainer = group as IContainer
        return
      }
      else {
        try {
          foundContainer = group.getNestedContainerByName(name)
          return
        }
        catch (e) { }
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