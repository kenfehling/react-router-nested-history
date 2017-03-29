import Page from './Page'
import Group from './Group'
import State from './State'
import IContainer from './IContainer'
import Pages, {HistoryStack} from './Pages'
import {VisitType, default as PageVisit} from './PageVisit'
import {sortContainersByLastVisited} from '../util/sorter'

export default class InitializedState extends State {

  get pages():Pages {
    return this.history.toPages()
  }

  assign(obj:Object):State {
    return new InitializedState({...Object(this), ...obj})
  }

  get isInitialized():boolean {
    return true
  }

  switchToGroup({name, time}:{name:string, time:number}):State {
    const group:Group = this.getGroupByName(name)
    return this
      .replaceGroup(group.activate({time, type: VisitType.MANUAL}))
  }

  switchToContainer({name, time}:{name: string, time: number}):State {
    const container:IContainer = this.getContainerByName(name)
    const group:Group = this.getGroupByName(container.groupName)
    return this.replaceGroup(group.activateContainer({name, time}))
  }

  openWindowForName({name, time}:{name:string, time:number}):State {
    return this.switchToContainer({name, time})
               .setWindowVisibility({forName: name, visible: true})
  }

  openWindowAtIndex({groupName, index, time}:
                    {groupName:string, index:number, time:number}):State {
    return this.openWindowForName({
      name: this.getContainerNameByIndex(groupName, index),
      time
    })
  }

  closeWindow({forName, time}:{forName:string, time:number}):State {
    const container:IContainer = this.getContainerByName(forName)
    const groupName:string = container.groupName
    const state:State = this.setWindowVisibility({forName, visible: false})
    const group:Group = state.getGroupByName(groupName)
    if (group.hasEnabledContainers) {
      return state.switchToGroup({name: groupName, time})
    }
    else {
      return state.back({n: 1, time})
    }
  }

  activateContainer(containerName:string, visit:PageVisit):State {
    const container:IContainer = this.getContainerByName(containerName)
    return this.replaceContainer(container.activate(visit) as IContainer)
  }

  go({n, time, container}:{n:number, time:number, container?:string}):State {
    if (container) {
      const visit:PageVisit = {time, type:VisitType.MANUAL}
      return this.activateContainer(container, visit).go({n, time})
    }
    if (this.isOnZeroPage && n > 0) {
      const state:State = this.assign({isOnZeroPage: false})
      return state.go({n: n - 1, time})
    }
    const f = (x):State => this.replaceGroup(this.activeGroup.go({n: x, time}))
    if (n < 0 && !this.canGoBack(0 - n)) {  // if going back to zero page
      return (n < -1 ? f(n + 1) : this).assign({isOnZeroPage: true})
    }
    else {
      return f(n)
    }
  }

  back({n=1, time, container}:{n:number, time:number, container?:string}):State {
    return this.go({n: 0 - n, time, container})
  }

  forward({n=1, time, container}:{n:number, time:number, container?:string}):State {
    return this.go({n, time, container})
  }

  canGoBack(n:number=1):boolean {
    return this.activeGroup.canGoBack(n)
  }

  canGoForward(n:number=1):boolean {
    return this.activeGroup.canGoForward(n)
  }

  isContainerAtTopPage(containerName:string):boolean {
    const container:IContainer = this.getContainerByName(containerName)
    return container.isAtTopPage
  }

  top({containerName, time, reset=false}:
      {containerName:string, time:number, reset?:boolean}):State {
    const container:IContainer = this.getContainerByName(containerName)
    const group:Group = this.getGroupByName(container.groupName)
    return this.replaceGroup(group.replaceContainer(
        container.top({time, reset}) as IContainer))
  }

  getShiftAmount(page:Page):number {
    return this.pages.getShiftAmount(page)
  }

  containsPage(page:Page):boolean {
    return this.pages.containsPage(page)
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

  push({page, time}:{page:Page, time:number}):State {
    const container:IContainer = this.getContainerByName(page.containerName)
    const group:Group = this.getGroupByName(container.groupName)
    return this.replaceGroup(group.push({page, time, type: VisitType.MANUAL}))
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    const g:Group = this.activeGroup
    const groupHistory = maintainFwd ? g.historyWithFwdMaintained : g.history
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
    return sortContainersByLastVisited(this.groups.toArray()) as Group[]
  }

  getBackPageInGroup(groupName:string):Page|undefined {
    return this.getGroupByName(groupName).backPage
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

  isContainerActiveAndEnabled(containerName:string):boolean {
    const container:IContainer = this.getContainerByName(containerName)
    const group:Group = this.getGroupByName(container.groupName)
    return this.activeGroupName === group.name && group.enabled &&
           group.isContainerActiveAndEnabled(containerName)
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
      if (this.activeGroup.hasNestedGroupWithName(groupName)) {
        return this.activeGroup.isNestedGroupActive(groupName)
      }
    }
    return false
  }

  get activeGroup():Group {
    return this.groupStackOrder[0]
  }

  get activeContainer():IContainer {
    return this.activeGroup.activeContainer
  }

  getContainerNameByIndex(groupName: string, index: number): string {
    const group:Group = this.getGroupByName(groupName)
    const container:IContainer = group.containers.toArray()[index]
    if (container) {
      return container.name
    }
    else {
      throw new Error(`No container found at index ${index} in '${groupName}' ` +
        `(size: ${group.containers.size})`)
    }
  }

  isActiveContainer(groupName:string, containerName:string):boolean {
    const c:IContainer = this.activeContainer
    return c.groupName === groupName && c.name === containerName
  }

  getContainerStackOrderForGroup(groupName:string):IContainer[] {
    return this.getGroupByName(groupName).containerStackOrder
  }

  get activeGroupName():string {
    return this.activeGroup.name
  }
}