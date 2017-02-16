import Page from './Page'
import * as R from 'ramda'
import IContainer from './interfaces/IContainer'
import Group from './Group'
import IState from './IState'
import HistoryStack from './HistoryStack'
import Container from './Container'

export default class InitializedState extends IState {

  assign(obj:Object):IState {
    return new InitializedState({...Object(this), ...obj})
  }

  switchToGroup({groupName, time}:{groupName:string, time:number}):IState {
    const group:Group = this.getGroupByName(groupName)
    return this.replaceGroup(group.activate(time))
  }

  switchToContainer({groupName, containerName, time}:
    {groupName:string, containerName:string, time:number}):IState {
    const group:Group = this.getGroupByName(groupName)
    if (group.gotoTopOnSelectActive &&
      group.activeContainerName === containerName) {
      return this.top({groupName, time})
    }
    else {
      return this.replaceGroup(group.activateContainer(containerName, time))
    }
  }

  get backPage():Page {
    return this.activeGroup.backPage
  }

  get forwardPage():Page {
    return this.activeGroup.forwardPage
  }

  go(n:number, time:number):IState {
    if (this.isOnZeroPage && n > 0) {
      const state:IState = this.assign({
        isOnZeroPage: false
      })
      return state.go(n - 1, time)
    }
    const f = (x:number):IState => this.replaceGroup(this.activeGroup.go(x, time))
    if (n < 0 && !this.canGoBack(0 - n)) {    // if going back to zero page
      return (n < -1 ? f(n + 1) : this).assign({
        isOnZeroPage: true                    // go back through group if needed
      })
    }
    else {
      return f(n)
    }
  }

  goBack(n:number=1, time:number):IState {
    return this.replaceGroup(this.activeGroup.goBack(n, time))
  }

  goForward(n:number=1, time:number):IState {
    return this.replaceGroup(this.activeGroup.goForward(n, time))
  }

  canGoBack(n:number=1):boolean {
    return this.activeGroup.canGoBack(n)
  }

  canGoForward(n:number=1):boolean {
    return this.activeGroup.canGoForward(n)
  }

  top({groupName, time, reset=false}:
    {groupName?:string, time:number, reset?:boolean}):IState {
    const group:Group = groupName != null ?
      this.getGroupByName(groupName) : this.activeGroup
    return this.replaceGroup(group.top(time, reset))
  }

  getShiftAmount(page:Page):number {
    return this.browserHistory.getShiftAmount(page)
  }

  shiftTo(page:Page, time:number):IState {
    return this.go(this.getShiftAmount(page), time)
  }

  containsPage(page:Page):boolean {
    return this.browserHistory.containsPage(page)
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

  push(page:Page):IState {
    const group:Group = this.getRootGroupOfGroupByName(page.groupName)
    return this.replaceGroup(group.push(page))
  }

  getContainerLinkUrl(groupName:string, containerName:string):string {
    const group:Group = this.getGroupByName(groupName)
    return group.getContainerLinkUrl(containerName)
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
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

  getActiveContainerNameInGroup(groupName:string):string {
    return this.getGroupByName(groupName).activeContainerName
  }

  getActiveContainerIndexInGroup(groupName:string):number {
    return this.getGroupByName(groupName).activeContainerIndex
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

  getActiveUrlInContainer(groupName: string, containerName: string): string {
    return this.getActivePageInContainer(groupName, containerName).url
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

  isActiveContainer(groupName:string, containerName:string):boolean {
    const c:IContainer = this.activeContainer
    return c.groupName === groupName && c.name === containerName
  }

  getContainerStackOrderForGroup(groupName:string):IContainer[] {
    return this.getGroupByName(groupName).containerStackOrder
  }

  getIndexedContainerStackOrderForGroup(groupName:string):number[] {
    return this.getGroupByName(groupName).indexedContainerStackOrder
  }
}