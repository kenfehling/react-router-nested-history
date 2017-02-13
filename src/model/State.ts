import Page from './Page'
import HistoryStack from './HistoryStack'
import Container from './Container'
import * as R from 'ramda'
import IContainer from './interfaces/IContainer'
import GroupNotFound from './errors/GroupNotFound'
import {catchType} from '../util/misc'
import ISubGroup from './interfaces/ISubGroup'
import Group from './Group'

export default class State {
  readonly groups: Group[]
  readonly zeroPage?: Page
  readonly lastUpdate: number
  readonly loadedFromRefresh: boolean
  readonly isOnZeroPage: boolean

  constructor({groups=[], zeroPage, lastUpdate=0,
    loadedFromRefresh=false, isOnZeroPage=false}:
      {groups?:Group[], zeroPage?:Page, lastUpdate?:number,
        loadedFromRefresh?:boolean, isOnZeroPage?:boolean}={}) {
    this.groups = groups
    this.zeroPage = zeroPage
    this.lastUpdate = lastUpdate
    this.loadedFromRefresh = loadedFromRefresh
    this.isOnZeroPage = isOnZeroPage
  }

  replaceGroup(group:Group):State {
    if (group.parentGroupName) {
      const parentGroup:Group = this.getGroupByName(group.parentGroupName)
      return this.replaceGroup(parentGroup.replaceContainer(group as ISubGroup))
    }
    else {
      const i:number = R.findIndex(g => g.name === group.name, this.groups)
      if (i === -1) {  // If group didn't already exist
        return new State({
          ...Object(this),
          groups: [...this.groups, group]
        })
      }
      else {
        return new State({
          ...Object(this),
          groups: [
            ...this.groups.slice(0, i),
            group,
            ...this.groups.slice(i + 1)
          ]
        })
      }
    }
  }

  addTopLevelGroup({name, resetOnLeave=false, gotoTopOnSelectActive=false}:
    {name:string, resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):State {
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      parentGroupName: null,
      isDefault: null
    })
    return this.replaceGroup(group)
  }

  addSubGroup({name, parentGroupName, parentUsesDefault=true,
    resetOnLeave=false, gotoTopOnSelectActive=false}:
      {name:string, parentGroupName:string, parentUsesDefault:boolean,
        resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):State {
    const parentGroup:Group = this.getGroupByName(parentGroupName)
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      parentGroupName,
      isDefault: parentUsesDefault ? parentGroup.containers.length === 0 : null
    })
    return this.replaceGroup(group)
  }

  addContainer({name, groupName, initialUrl, useDefault=true,
      resetOnLeave=false, patterns}:
      {name:string, groupName:string, initialUrl:string, patterns:string[],
        useDefault:boolean, resetOnLeave:boolean}):State {
    const group:Group = this.getGroupByName(groupName)
    const container:Container = new Container({
      initialUrl,
      patterns,
      resetOnLeave,
      groupName,
      name,
      isDefault: group.containers.length === 0 && useDefault
    })
    return this.replaceGroup(group.replaceContainer(container))
  }

  switchToGroup({groupName, time}:{groupName:string, time:number}):State {
    const group:Group = this.getGroupByName(groupName)
    return this.replaceGroup(group.activate(time))
  }

  switchToContainer({groupName, containerName, time}:
      {groupName:string, containerName:string, time:number}):State {
    const group:Group = this.getGroupByName(groupName)
    if (group.gotoTopOnSelectActive &&
        group.activeContainerName === containerName) {
      return this.top({groupName, time})
    }
    else {
      return this.replaceGroup(group.activateContainer(containerName, time))
    }
  }

  push(page:Page):State {
    const group:Group = this.getRootGroupOfGroupByName(page.groupName)
    return this.replaceGroup(group.push(page))
  }

  private getHistory(maintainFwd:boolean=false) {
    const groupHistory:HistoryStack = maintainFwd ?
        this.activeGroup.historyWithFwdMaintained : this.activeGroup.history
    if(this.isOnZeroPage) {
      return new HistoryStack({
        back: [],
        current: this.getZeroPage(),
        forward: groupHistory.flatten()
      })
    }
    else {
      return new HistoryStack({
        ...groupHistory,
        back: [this.getZeroPage(), ...groupHistory.back]
      })
    }
  }

  get browserHistory():HistoryStack {
    return this.getHistory()
  }

  get browserHistoryWithFwdMaintained():HistoryStack {
    return this.getHistory(true)
  }

  get isInitialized():boolean {
    try {
      this.browserHistory
      return true
    }
    catch (Error) {
      return false
    }
  }

  get groupStackOrder():Group[] {
    return R.sort((g1, g2) => g1.compareTo(g2), this.groups)
  }

  /**
   * Gets the stack order values as an array of numbers,
   * in original group index order instead of stack order
   */
  get indexedGroupStackOrder():number[] {
    const order:Group[] = this.groupStackOrder
    return this.groups.map((orig:Group) =>
      R.findIndex((g:Group) => orig.name === g.name, order))
  }

  getActiveContainerIndexInGroup(groupName:string):number {
    if (this.isInitialized) {
      const group:Group = this.getGroupByName(groupName)
      return group.activeContainerIndex
    }
    else {
      return 0
    }
  }

  getActivePageInGroup(groupName:string):Page {
    return this.getGroupByName(groupName).activePage
  }

  get activePage():Page {
    return this.activeGroup.activePage
  }

  isContainerActive(groupName:string, containerName:string):boolean {
    return this.getGroupByName(groupName).isContainerActive(containerName)
  }

  get activeUrl():string {
    return this.activePage.url
  }

  getActivePageInContainer(groupName:string, containerName:string):Page {
    return this.getGroupByName(groupName).getActivePageInContainer(containerName)
  }

  get activeGroup():Group {
    return this.groupStackOrder[0]
  }

  get activeGroupName():string {
    return this.activeGroup.name
  }

  get activeContainer():IContainer {
    return this.activeGroup.activeContainer
  }

  getContainer(groupName:string, containerName:string):Container {
    return this.getGroupByName(groupName).containers[containerName]
  }

  isActiveContainer(groupName:string, containerName:string):Boolean {
    const c:IContainer = this.activeContainer
    return c.groupName === groupName && c.name === containerName
  }

  loadFromUrl(url:string, time:number):State {
    return this.groups.reduce((state:State, group:Group):State =>
        state.replaceGroup(group.loadFromUrl(url, time)), this)
  }

  get backPage():Page {
    return this.activeGroup.backPage
  }

  get forwardPage():Page {
    return this.activeGroup.forwardPage
  }

  go(n:number, time:number):State {
    if (this.isOnZeroPage && n > 0) {
      const state:State = new State({
        ...Object(this),
        isOnZeroPage: false
      })
      return state.go(n - 1, time)
    }
    const f = (x:number):State => this.replaceGroup(this.activeGroup.go(x, time))
    if (n < 0 && !this.canGoBack(0 - n)) {    // if going back to zero page
      return new State({
        ...Object(n < -1 ? f(n + 1) : this),  // go back through group if needed
        isOnZeroPage: true
      })
    }
    else {
      return f(n)
    }
  }

  goBack(n:number=1, time:number):State {
    return this.replaceGroup(this.activeGroup.goBack(n, time))
  }

  goForward(n:number=1, time:number):State {
    return this.replaceGroup(this.activeGroup.goForward(n, time))
  }

  canGoBack(n:number=1):boolean {
    return this.activeGroup.canGoBack(n)
  }

  canGoForward(n:number=1):boolean {
    return this.activeGroup.canGoForward(n)
  }

  top({groupName, time, reset=false}:
      {groupName?:string, time:number, reset?:boolean}):State {
    const group:Group = groupName != null ?
        this.getGroupByName(groupName) : this.activeGroup
    return this.replaceGroup(group.top(time, reset))
  }

  getShiftAmount(page:Page):number {
    return this.browserHistory.getShiftAmount(page)
  }

  shiftTo(page:Page, time:number):State {
    return this.go(this.getShiftAmount(page), time)
  }

  containsPage(page:Page):boolean {
    return this.browserHistory.containsPage(page)
  }

  getContainerStackOrderForGroup(groupName:string):IContainer[] {
    return this.getGroupByName(groupName).containerStackOrder
  }

  getIndexedContainerStackOrderForGroup(groupName:string):number[] {
    return this.getGroupByName(groupName).indexedContainerStackOrder
  }

  getGroupByName(name:string):Group {
    const g:Group = R.find(g => g.name === name, this.groups)
    if (g) {
      return g
    }
    else {
      let foundGroup:ISubGroup|null = null
      this.groups.forEach((group:Group) => {
        try {
          foundGroup = group.getNestedGroupByName(name)
          return
        }
        catch(e) {
          catchType(e, GroupNotFound, null)
        }
      })
      if (foundGroup) {
        return foundGroup
      }
      else {
        throw new GroupNotFound(name)
      }
    }
  }

  hasGroup(name:string):boolean {
    try {
      this.getGroupByName(name)
      return true
    }
    catch(e) {
      return catchType(e, GroupNotFound, () => false)
    }
  }

  getRootGroupOfGroupByName(name:string):Group {
    const group:Group = this.getGroupByName(name)
    if (group.parentGroupName) {
      return this.getRootGroupOfGroupByName(group.parentGroupName)
    }
    else {
      return group
    }
  }

  getRootGroupOfGroup(group:Group):Group {
    return this.getRootGroupOfGroupByName(group.name)
  }

  getContainerLinkUrl(groupName:string, containerName:string):string {
    const group:Group = this.getGroupByName(groupName)
    return group.getContainerLinkUrl(containerName)
  }

  /**
   * Gets the zero page, or if it's not set defaults to using
   * the initialUrl of the first container in the first group
   */
  getZeroPage():Page {
    return this.zeroPage || Page.createZeroPage(
        this.groups[0].containers[0].initialUrl)
  }
}