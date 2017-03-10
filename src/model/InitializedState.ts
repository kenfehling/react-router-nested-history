import Page from './Page'
import * as R from 'ramda'
import IContainer from './IContainer'
import Group from './Group'
import State from './State'
import Container from './Container'
import IGroupContainer from './IGroupContainer'
import Pages, {HistoryStack} from './Pages'
import SwitchToGroup from './actions/SwitchToGroup'
import VisitedPage from './VistedPage'
import SetZeroPage from './actions/SetZeroPage'

export default class InitializedState extends State {

  assign(obj:Object):State {
    return new InitializedState({...Object(this), ...obj})
  }

  switchToGroup({groupName, time}:{groupName:string, time:number}):State {
    const group:Group = this.getGroupByName(groupName)
    return this.replaceGroup(group.activate({time, action: SwitchToGroup}))
  }

  switchToContainer({groupName, name, time}:
      {groupName:string, name:string, time:number}):State {
    const group:Group = this.getGroupByName(groupName)
    const c = group.activateContainer(name, time)
    return this.replaceGroup(c)
  }

  go(n:number, time:number):State {
    if (this.isOnZeroPage && n > 0) {
      const state:State = this.assign({
        isOnZeroPage: false
      })
      return state.go(n - 1, time)
    }
    const f = (x:number):State => this.replaceGroup(this.activeGroup.go(x, time))
    if (n < 0 && !this.canGoBack(0 - n)) {    // if going back to zero page
      return (n < -1 ? f(n + 1) : this).assign({
        isOnZeroPage: true                    // go back through group if needed
      })
    }
    else {
      return f(n)
    }
  }

  back(n:number=1, time:number):State {
    return this.replaceGroup(this.activeGroup.back(n, time))
  }

  forward(n:number=1, time:number):State {
    return this.replaceGroup(this.activeGroup.forward(n, time))
  }

  canGoBack(n:number=1):boolean {
    return this.activeGroup.canGoBack(n)
  }

  canGoForward(n:number=1):boolean {
    return this.activeGroup.canGoForward(n)
  }

  isContainerAtTopPage(groupName:string, containerName:string):boolean {
    const container:IContainer = this.getContainer(groupName, containerName)
    return container.isAtTopPage
  }

  top({groupName, containerName, time, reset=false}:
      {groupName:string, containerName:string,
        time:number, reset?:boolean}):State {
    const group:Group = this.getGroupByName(groupName)
    const container:IGroupContainer = group.getContainerByName(containerName)
    return this.replaceGroup(group.replaceContainer(
        container.top(time, reset) as IGroupContainer))
  }

  getShiftAmount(page:Page):number {
    return this.browserHistory.toPages().getShiftAmount(page)
  }

  containsPage(page:Page):boolean {
    return this.browserHistory.toPages().containsPage(page)
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

  push(page:Page, time:number):State {
    const group:Group = this.getRootGroupOfGroupByName(page.groupName)
    return this.replaceGroup(group.push(page, time))
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
    return R.sort((g1, g2) => g2.lastVisit.time - g1.lastVisit.time, this.groups)
  }

  getBackPageInGroup(groupName:string):Page|undefined {
    return this.getGroupByName(groupName).getBackPage()
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

  getActiveUrlInGroup(groupName:string):string {
    return this.getActivePageInGroup(groupName).url
  }

  urlMatchesGroup(url:string, groupName:string):boolean {
    return this.getGroupByName(groupName).patternsMatch(url)
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

  isGroupActive(groupName:string):boolean {
    const activeGroup:Group = this.activeGroup
    if (activeGroup.name === groupName) {
      return true
    }
    else {
      const activeContainer:Container = activeGroup.activeNestedContainer
      const group:Group = this.getGroupByName(groupName)
      return group.hasNestedContainer(activeContainer)
    }
  }

  get activeGroup():Group {
    return this.groupStackOrder[0]
  }

  get activeContainer():IContainer {
    return this.activeGroup.activeContainer
  }

  getContainer(groupName:string, containerName:string):IContainer {
    return this.getGroupByName(groupName).getContainerByName(containerName)
  }

  getContainerNameByIndex(groupName: string, index: number): string {
    const group:Group = this.getGroupByName(groupName)
    const container:IContainer = group.containers[index]
    if (container) {
      return container.name
    }
    else {
      throw new Error(`No container found at index ${index} in '${groupName}' ` +
        `(size: ${group.containers.length})`)
    }
  }

  isActiveContainer(groupName:string, containerName:string):boolean {
    const c:IContainer = this.activeContainer
    return c.groupName === groupName && c.name === containerName
  }

  getContainerStackOrderForGroup(groupName:string):IContainer[] {
    return this.getGroupByName(groupName).containerStackOrder
  }

  static createZeroPage(url:string) {
    return new VisitedPage({
      url,
      params: {},
      groupName: '',
      containerName: '',
      isZeroPage: true,
      visits: [{time: -1, action: SetZeroPage}]
    })
  }

  /**
   * Gets the zero page, or if it's not set defaults to using
   * the initialUrl of the first container in the first group
   */
  getZeroPage():VisitedPage {
    return InitializedState.createZeroPage(
        this.zeroPage || this.groups[0].containers[0].initialUrl)
  }
}