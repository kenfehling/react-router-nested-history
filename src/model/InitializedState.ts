import Page from './Page'
import Group from './Group'
import State from './State'
import IContainer from './IContainer'
import HistoryStack from './HistoryStack'
import {VisitType, default as PageVisit} from './PageVisit'
import {
  compareByLastVisited,
  sortContainersByFirstVisited,
  sortContainersByLastVisited
} from '../util/sorter'
import {fromJS, Map, List, OrderedMap, Seq} from 'immutable'
import {
  ComputedContainer,
  ComputedGroup, ComputedGroupOrContainer, ComputedWindow,
  PartialComputedState
} from './ComputedState'
import * as defaultBehavior from '../behaviors/defaultBehavior'
import * as nonDefaultBehavior from '../behaviors/nonDefaultBehavior'
import * as interContainerHistory from '../behaviors/interContainerHistory'
import * as keepFwdTabBehavior from '../behaviors/keepFwdTabBehavior'
import * as removeFwdTabBehavior from '../behaviors/removeFwdTabBehavior'
import VisitedPage from './VistedPage'
import {
  getActiveIndex, getActivePage, getBackLength, getBackPage, getForwardLength,
  getForwardPage,
  toHistoryStack
} from '../util/pages'
import Container from './Container'
import HistoryWindow from './HistoryWindow'
import IHistory from './IHistory'

// Param types for _goInGroup method
type GoFn = <H extends IHistory> (name:string, n:number, time:number) => H
type LengthFn = (name:string) => number
type NextPageFn = (name:string, n?:number) => VisitedPage|undefined

export default class InitializedState extends State {



  get computedGroupsAndContainers():Map<string, ComputedGroupOrContainer> {
    return this.containers.reduce(
      (map:Map<string, ComputedGroupOrContainer>, c:IContainer) =>
        map.merge({
          [c.name]: {
            name: c.name,
            enabled: c.enabled,
            activeUrl: c.activeUrl,
            backPage: c.backPage,
            history: this.getContainerHistory(c)
          }
        }),
    fromJS({}))
  }

  get computedGroups():Map<string, ComputedGroup> {
    return this.groups.reduce(
      (map:Map<string, ComputedGroup>, g:Group) =>
        map.merge({
          [g.name]: {
            name: g.name,
            isTopLevel: !g.groupName,
            activeContainerIndex: this.getActiveContainerIndexInGroup(g.name),
            activeContainerName: this.getActiveContainerNameInGroup(g.name)
          }
        }),
      fromJS({}))
  }

  get computedContainers():Map<string, ComputedContainer> {
    const currentUrl = this.activeUrl
    return this.leafContainers.reduce(
      (map:Map<string, ComputedContainer>, c:Container) =>
        map.merge({
          [c.name]: {
            name: c.name,
            isActiveInGroup: this.getActiveContainerNameInGroup(c.groupName) === c.name,
            matchesCurrentUrl: currentUrl === c.activeUrl
          }
        }),
      fromJS({}))
  }

  get computedWindows():OrderedMap<string, ComputedWindow> {
    let stackOrders:Map<string, List<IContainer>> = fromJS({})
    return this.windows.map((w:HistoryWindow):ComputedWindow => {
      const container:IContainer = this.containers.get(w.forName)
      const groupName:string = container.groupName
      if (!stackOrders.has(groupName)) {
        stackOrders = stackOrders.set(groupName,
          this.getContainerStackOrderForGroup(groupName))
      }
      const stackOrder:List<IContainer> = stackOrders.get(groupName)
      const index = stackOrder.findIndex((c:IContainer) => c.name === w.forName)
      return {
        ...w,
        zIndex: stackOrder.size + 1 - index,
        isOnTop: index === 0
      }
    }) as OrderedMap<string, ComputedWindow>
  }

  computeState():PartialComputedState {
    return {
      isInitialized: this.isInitialized,
      activeUrl: this.activeUrl,
      groupsAndContainers: this.computedGroupsAndContainers,
      groups: this.computedGroups,
      containers: this.computedContainers,
      windows: this.computedWindows,
      activeTitle: this.activeTitle
    }
  }

  assign(obj:Object):State {
    return new InitializedState({...Object(this), ...obj})
  }

  get isInitialized():boolean {
    return true
  }



  getContainerHistory(container:string):HistoryStack {
    return toHistoryStack(this.getContainerPages(container))
  }

  getGroupHistory(group:string, keepFwd:boolean):HistoryStack {
    const cs = this.getContainerStackOrder(group).filter(c => c.wasManuallyVisited)
    switch(cs.length) {
      case 0: {
        const activeContainer:string = this.getActiveContainerNameInGroup(group)
        return this.getSingleHistory(activeContainer, keepFwd)
      }
      case 1: {
        return this.getSingleHistory(cs[0], keepFwd)
      }
      default: {
        const from: IContainer = cs[1]
        const to: IContainer = cs[0]
        return this.computeHistory(from, to, keepFwd)
      }
    }
  }

  getGroupOrContainerHistory(name:string, keepFwd:boolean):HistoryStack {
    if (this.isGroup(name)) {
      return this.getGroupHistory(name, keepFwd)
    }
    else {
      return this.getContainerHistory(name)
    }
  }

  private computeDefault(h:HistoryStack, defaulT:IContainer|undefined,
                         from:IContainer, to:IContainer,
                         keepFwd:boolean):HistoryStack {
    const fromHistory = this.getGroupOrContainerHistory(from.name, keepFwd)
    const toHistory = this.getGroupOrContainerHistory(to.name, keepFwd)
    if (defaulT) {
      if (from.isDefault) {
        return defaultBehavior.A_to_B(h, fromHistory, toHistory)
      }
      else {
        if (to.isDefault) {
          return defaultBehavior.B_to_A(h, fromHistory, toHistory)
        }
        else {
          const defaultHistory = this.getGroupOrContainerHistory(defaulT.name, keepFwd)
          return defaultBehavior.B_to_C(h, defaultHistory, fromHistory, toHistory)
        }
      }
    }
    else {
      return nonDefaultBehavior.B_to_C(h, null, fromHistory, toHistory)
    }
  }

  private computeInterContainer(group:Group, from:IContainer, to:IContainer,
                                keepFwd:boolean):HistoryStack {
    const toHistory = this.getGroupOrContainerHistory(to.name, keepFwd)
    if (!from.isDefault && !to.isDefault && group.allowInterContainerHistory) {
      const fromHistory = this.getGroupOrContainerHistory(from.name, keepFwd)
      const sorted = sortContainersByFirstVisited([from, to])
      if (sorted[0] === from) {
        return interContainerHistory.D_to_E(toHistory, fromHistory, toHistory)
      }
      else {
        return interContainerHistory.E_to_D(toHistory, fromHistory, toHistory)
      }
    }
    else {
      return toHistory
    }
  }

  private computeFwd(h:HistoryStack, keepFwd:boolean,
                     from:IContainer, to:IContainer):HistoryStack {
    const fromHistory = this.getGroupOrContainerHistory(from.name, keepFwd)
    const toHistory = this.getGroupOrContainerHistory(to.name, keepFwd)
    if (keepFwd && from.wasManuallyVisited) {
      const sorted = sortContainersByFirstVisited([from, to])
      if (sorted[0] === from) {
        return keepFwdTabBehavior.D_to_E(h, fromHistory, toHistory)
      }
      else {
        return keepFwdTabBehavior.E_to_D(h, fromHistory, toHistory)
      }
    }
    else {
      return removeFwdTabBehavior.E_to_D(h, fromHistory, toHistory)
    }
  }

  computeGroupHistory(group:Group, from:IContainer, to:IContainer,
                      keepFwd:boolean):HistoryStack {
    const defaulT:IContainer|undefined = this.getDefaultContainerInGroup(group.name)
    const h1:HistoryStack = this.computeInterContainer(group, from, to, keepFwd)
    const h2:HistoryStack = this.computeDefault(h1, defaulT, from, to, keepFwd)
    return this.computeFwd(h2, keepFwd, from, to)
  }

  private getSingleHistory(name:string, keepFwd:boolean):HistoryStack {
    return this.isGroup(name) ?
        this.getGroupHistory(name, keepFwd) : this.getContainerHistory(name)
  }

  getContainerStackOrder(group:string):IContainer[] {
    const cs = this.containers.filter((c:IContainer) => c.group === group)
    return sortContainersByLastVisited(cs.toArray())
  }

  switchToGroup({name, time}:{name:string, time:number}):State {
    const c:IContainer = this.getActiveContainerInGroup(name)
    return this.replaceContainer(c.activate({time, type: VisitType.MANUAL}))
  }

  switchToContainer({name, time}:{name: string, time: number}):State {
    const c:IContainer = this.containers.get(name)
    return this.replaceContainer(c.activate({time, type: VisitType.MANUAL}))
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
    const container:IContainer = this.containers.get(forName)
    const groupName:string = container.groupName
    const state:State = this.setWindowVisibility({forName, visible: false})
    const group:Group = this.groups.get(groupName)
    if (this.hasEnabledContainers(group)) {
      return state.switchToGroup({name: groupName, time})
    }
    else {
      return state.back({n: 1, time})
    }
  }

  getGroupContainerNames(group:string):List<string> {
    return this.containers.filter((c:IContainer) => c.group === group).keySeq().toList()
  }

  getGroupContainers(group:string):List<string> {
    return this.containers.filter((c:IContainer) => c.group === group).toList()
  }

  hasEnabledContainers(group:Group):boolean {
    return this.getGroupContainerNames(group.name)
               .some(this.isContainerEnabled.bind(this))
  }

  activateContainer(container:string, visit:PageVisit):State {
    return this.replaceContainer(this.containers.get(container).activate(visit))
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
    const f = (x):State => this.goInContainer(this.activeGroupName, {n: x, time})
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

  private canGoBack(n:number=1):boolean {
    return this.activeIndex > 0
  }

  isContainerAtTopPage(container:string):boolean {
    return getActiveIndex(this.getContainerPages(container)) === 0
  }

  top({containerName, time, reset=false}:
      {containerName:string, time:number, reset?:boolean}):State {
    const container:IContainer = this.containers.get(containerName)
    return this.replaceContainer(container.top({time, reset}))
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
    const group:IContainer = this.containers.get(page.group)
    //return this.replaceContainer(group.push({page, time, type: VisitType.MANUAL}))
  }

  get activeGroupName():string {
    return this.activePage.group
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    const groupHistory = this.getGroupHistory(this.activeGroupName, maintainFwd)
    if(this.isOnZeroPage) {
      return new HistoryStack({
        back: List<VisitedPage>(),
        current: this.getZeroPage(),
        forward: groupHistory.flatten()
      })
    }
    else {
      return new HistoryStack({
        ...groupHistory,
        back: groupHistory.back.insert(0, this.getZeroPage())
      })
    }
  }

  getActiveContainerInGroup(group:string):IContainer {
    return this.getContainerStackOrder(group)[0]
  }

  get groupStackOrder():Group[] {
    return sortContainersByLastVisited(this.groups.toArray()) as Group[]
  }

  getActiveContainerNameInGroup(group:string):string {
    return this.getContainerActivePage(group).container
  }

  getActiveContainerIndexInGroup(group:string):number {
    return this.getContainerIndex(this.getActiveContainerNameInGroup(group))
  }

  get activePage():VisitedPage {
    return getActivePage(this.pages)
  }

  get activeIndex():number {
    return getActiveIndex(this.pages)
  }

  hasWindow(forName:string):boolean {
    return this.windows.has(forName)
  }

  isWindowVisible(forName:string):boolean {
    return this.windows.get(forName).visible
  }

  isContainerEnabled(containerName:string):boolean {
    return !this.hasWindow(containerName) || this.isWindowVisible(containerName)
  }

  isContainerActiveAndEnabled(container:string):boolean {
    const c:IContainer = this.containers.get(container)
    const g:Group = this.groups.get(c.groupname)
    return this.isContainerEnabled(c) && g.activeContainerName === c
  }

  get activeUrl():string {
    return this.activePage.url
  }

  getContainerPages(name:string):List<VisitedPage> {
    const filter = p => name === (this.isGroup(name) ? p.group : p.container)
    return this.pages.filter(filter).toList()
  }

  getContainerActivePage(container:string):VisitedPage {
    return getActivePage(this.getContainerPages(container))
  }

  getContainerActiveUrl(container:string):string {
    return this.getContainerActivePage(container).url
  }
  
  isContainerInGroup(container:string, group:string):boolean {
    const c:IContainer = this.containers.get(container)
    if (c.groupName) {
      if (c.groupName === group) {
        return true
      }
      else {
        return this.isContainerInGroup(c.groupName, group)
      }
    }
    else {
      return false
    }
  }

  isGroupActive(group:string):boolean {
    const activePage:VisitedPage = this.activePage
    return this.isContainerInGroup(activePage.container, group)
  }

  getDefaultContainerInGroup(groupName:string):IContainer|undefined {
    return this.getGroupContainers(groupName).find(c => c.isDefault)
  }

  getContainerNameByIndex(group: string, index: number): string {
    return this.getGroupContainerNames(group).get(index)
  }

  getContainerStackOrderForGroup(group:string):IContainer[] {
    return sortContainersByLastVisited(this.getGroupContainers(group).toArray())
  }

  _goInGroup(group:string, goFn:GoFn, lengthFn:LengthFn,
                     nextPageFn: NextPageFn, n:number, time:number):State {
    if (n === 0) {
      return this.activateContainer(group, {time, type: VisitType.MANUAL})
    }
    const container:IContainer = this.getActiveContainerInGroup(group)
    const containerLength:number = lengthFn(container)
    const amount:number = Math.min(n, containerLength)
    const g:Group = this.replaceContainer(goFn(container, amount, time))
    const remainder = n - amount
    if (remainder > 0) {
      if (lengthFn(g) >= remainder) {
        const nextPage:Page|undefined = nextPageFn(g)
        if (!nextPage) {
          throw new Error('Couldn\'t get next page')
        }
        else {
          const nextContainer:string = nextPage.container
          const visit:PageVisit = {time, type: VisitType.MANUAL}
          const newState:InitializedState =
              this.activateContainer(nextContainer, visit) as InitializedState
          if (remainder > 1) {
            return newState._goInGroup(
                group, goFn, lengthFn, nextPageFn, remainder - 1, time + 2)
          }
          else {
            return newState
          }
        }
      }
      else {
        throw new Error('Cannot go ' + n + ' in that direction')
      }
    }
    else {
      return this.replaceContainer(g)
    }
  }

  backInGroup(group:string, {n=1, time}:{n:number, time}):State {
    return this._goInGroup(
      group,
      (name:string, n:number, t:number) =>
          this.backInContainer(name, {n, time: t}),
      (name:string) => this.getContainerBackLength(name),
      (name:string) => this.getContainerBackPage(name),
      n, time)
  }

  forwardInGroup(group:string, {n=1, time}:{n:number, time}):State {
    return this._goInGroup(
      group,
      (name:string, n:number, t:number) =>
          this.forwardInContainer(name, {n, time: t}),
      (name:string) => this.getContainerForwardLength(name),
      (name:string) => this.getContainerForwardPage(name),
      n, time)
  }

  goInGroup(group:string, {n, time}:{n:number, time}):State {
    return n > 0 ? this.forwardInGroup(group, {n, time}) :
                   this.backInGroup(group, {n: 0 - n, time})
  }
  
  private _goInContainer(container:string, nextPageFn: NextPageFn,
                         n:number, time:number):State {
    const page:VisitedPage|undefined = nextPageFn(container, n)
    if (page) {
      const visit:PageVisit = {time, type: VisitType.MANUAL}
      return this.replacePage(page.touch(visit))
    }
    else {
      return this
    }
  }
  
  backInContainer(container:string, {n=1, time}:{n:number, time}):State {
    return this._goInContainer(container, this.getContainerBackPage, n, time)
  }
  
  forwardInContainer(container:string, {n=1, time}:{n:number, time}):State {
    return this._goInContainer(container, this.getContainerForwardPage, n, time)
  }
  
  goInContainer(container:string, {n=1, time}:{n:number, time}):State {
    return n > 0 ? this.forwardInContainer(container, {n, time}) :
                   this.backInContainer(container, {n: 0 - n, time})
  }

  getContainerIndex(container:IContainer):number {
    return this.getGroupContainerNames(container.groupName).indexOf(container.name)
  }

  getContainerBackLength(container:string):number {
    return getBackLength(this.getContainerPages(container))
  }

  getContainerForwardLength(container:string):number {
    return getForwardLength(this.getContainerPages(container))
  }

  getContainerBackPage(container:string, n:number=1):VisitedPage|undefined {
    return getBackPage(this.getContainerPages(container), n)
  }

  getContainerForwardPage(container:string, n:number=1):VisitedPage|undefined {
    return getForwardPage(this.getContainerPages(container), n)
  }
}