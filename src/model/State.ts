import Page from './Page'
import Group from './Group'
import PathTitle from './PathTitle'
import PageVisit, {VisitType} from './PageVisit'
import IContainer from './IContainer'
import IState from '../store/IState'
import {fromJS, Map, List, OrderedMap} from 'immutable'
import {
  ComputedContainer, ComputedGroup, ComputedWindow, PartialComputedState
} from './ComputedState'
import * as defaultBehavior from '../behaviors/defaultBehavior'
import * as nonDefaultBehavior from '../behaviors/nonDefaultBehavior'
import * as interContainerHistory from '../behaviors/interContainerHistory'
import * as keepFwdTabBehavior from '../behaviors/keepFwdTabBehavior'
import * as removeFwdTabBehavior from '../behaviors/removeFwdTabBehavior'
import VisitedPage from './VisitedPage'
import * as pageUtils from '../util/pages'
import Container from './Container'
import HistoryWindow from './HistoryWindow'
import HistoryStack from './HistoryStack'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import IGroupContainer from './IGroupContainer'
import {PageSortFn, sort, SortFn, SortFnParams} from '../util/sorting';

// Param types for _goInGroup method
type GoFn = (state:State, name:string, n:number, time:number) => State
type LengthFn = (state:State, name:string) => number
type NextPageFn = (state:State, name:string, n?:number) => VisitedPage|undefined

class State implements IState {
  readonly containers: OrderedMap<string, IContainer>
  readonly windows: Map<string, HistoryWindow>
  readonly titles: List<PathTitle>
  readonly isInitialized: boolean
  readonly zeroPageUrl: string
  private readonly pages: List<VisitedPage>

  constructor({windows=fromJS({}), containers=OrderedMap<string, IContainer>(),
               pages=List<VisitedPage>(), titles=List<PathTitle>(),
               isInitialized=false, zeroPageUrl='/'}:
              {windows?:Map<string, HistoryWindow>,
                containers?: OrderedMap<string, IContainer>,
                pages?: List<VisitedPage>, titles?:List<PathTitle>,
                isInitialized?:boolean, zeroPageUrl?:string}={}) {
    this.containers = containers
    this.windows = windows
    this.pages = pages
    this.titles = titles
    this.isInitialized = isInitialized
    this.zeroPageUrl = zeroPageUrl
  }

  get computedGroups():Map<string, ComputedGroup> {
    return this.groups.reduce(
      (map:Map<string, ComputedGroup>, g:Group) =>
        map.set(g.name, {
          name: g.name,
          isTopLevel: this.isTopLevel(g.name),
          activeContainerIndex: this.getGroupActiveContainerIndex(g.name),
          activeContainerName: this.getGroupActiveContainerName(g.name),
          gotoTopOnSelectActive: g.gotoTopOnSelectActive
        }),
      fromJS({}))
  }

  get computedContainers():Map<string, ComputedContainer> {
    const currentUrl = this.activeUrl
    return this.containers.reduce(
      (map:Map<string, ComputedContainer>, c:IContainer) =>
        map.set(c.name, {
          name: c.name,
          initialUrl: this.getInitialUrl(c),
          resetOnLeave: c.resetOnLeave,
          activeUrl: this.getContainerActiveUrl(c.name),
          backPage: this.getContainerBackPage(c.name),
          isActiveInGroup: c.group ?
              this.getGroupActiveContainerName(c.group) === c.name : false,
          matchesCurrentUrl: currentUrl === this.getContainerActiveUrl(c.name)
        }),
      fromJS({}))
  }

  get computedWindows():OrderedMap<string, ComputedWindow> {
    let stackOrders:Map<string, List<IContainer>> = fromJS({})
    return this.windows.map((w:HistoryWindow):ComputedWindow => {
      const container:IGroupContainer = this.getWindowContainer(w)
      const group:string = container.group
      if (!stackOrders.has(group)) {
        const stackOrder = this.getContainerStackOrderForGroup(group)
        stackOrders = stackOrders.set(group, stackOrder)
      }
      const stackOrder:List<IContainer> = stackOrders.get(group)
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
      groups: this.computedGroups,
      containers: this.computedContainers,
      windows: this.computedWindows,
      activeTitle: this.activeTitle
    }
  }

  assign(obj:Object):State {
    return new State({...Object(this), ...obj})
  }

  getContainerHistory(container:string):HistoryStack {
    return pageUtils.toHistoryStack(this.getContainerPages(container))
  }

  getGroupHistory(group:string, keepFwd:boolean=false):HistoryStack {
    const cs = this.getVisitedContainerStackOrder(group)
    switch(cs.size) {
      case 0: {
        const container:string = this.getGroupCurrentContainerName(group)
        return this.getSingleHistory(container, keepFwd)
      }
      case 1: {
        return this.getSingleHistory(cs.first().name, keepFwd)
      }
      default: {
        const from: IContainer = cs.get(1)
        const to: IContainer = cs.first()
        return this.computeGroupHistory(group, from, to, keepFwd)
      }
    }
  }

  getIContainerHistory(name:string, keepFwd:boolean):HistoryStack {
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
    const fromHistory = this.getIContainerHistory(from.name, keepFwd)
    const toHistory = this.getIContainerHistory(to.name, keepFwd)
    if (defaulT) {
      if (from.isDefault) {
        return defaultBehavior.A_to_B(h, fromHistory, toHistory)
      }
      else {
        if (to.isDefault) {
          return defaultBehavior.B_to_A(h, fromHistory, toHistory)
        }
        else {
          const defaultHistory = this.getIContainerHistory(defaulT.name, keepFwd)
          return defaultBehavior.B_to_C(h, defaultHistory, fromHistory, toHistory)
        }
      }
    }
    else {
      return nonDefaultBehavior.B_to_C(h, null, fromHistory, toHistory)
    }
  }

  private computeInterContainer(group:string, from:IContainer, to:IContainer,
                                keepFwd:boolean):HistoryStack {
    const toHistory = this.getIContainerHistory(to.name, keepFwd)
    const g:Group = this.containers.get(group) as Group
    if (!from.isDefault && !to.isDefault && g.allowInterContainerHistory) {
      const fromHistory = this.getIContainerHistory(from.name, keepFwd)
      const sorted = this.sortContainersByFirstVisited(fromJS([from, to]))
      if (sorted.first() === from) {
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
    const fromHistory = this.getIContainerHistory(from.name, keepFwd)
    const toHistory = this.getIContainerHistory(to.name, keepFwd)
    if (keepFwd && this.wasManuallyVisited(from)) {
      const sorted = this.sortContainersByFirstVisited(fromJS([from, to]))
      if (sorted.first() === from) {
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

  computeGroupHistory(group:string, from:IContainer, to:IContainer,
                      keepFwd:boolean):HistoryStack {
    const defaulT:IContainer|undefined = this.getGroupDefaultContainer(group)
    const h1:HistoryStack = this.computeInterContainer(group, from, to, keepFwd)
    const h2:HistoryStack = this.computeDefault(h1, defaulT, from, to, keepFwd)
    return this.computeFwd(h2, keepFwd, from, to)
  }

  private getSingleHistory(name:string, keepFwd:boolean):HistoryStack {
    return this.isGroup(name) ?
      this.getGroupHistory(name, keepFwd) : this.getContainerHistory(name)
  }

  getContainerStackOrder(group:string):List<IGroupContainer> {
    const cs:List<IGroupContainer> = this.getGroupContainers(group)
    return this.sortContainersByLastVisited(cs) as List<IGroupContainer>
  }

  getVisitedContainerStackOrder(group:string):List<IGroupContainer> {
    return this.getContainerStackOrder(group).filter((c:IGroupContainer) =>
        this.wasManuallyVisited(c)) as List<IGroupContainer>
  }

  get topLevelGroups():List<Group> {
    return this.groups.filter((g:Group) => this.isTopLevel(g.name)).toList()
  }

  get topLevelGroupStackOrder():List<Group> {
    return this.sortByLastVisit(this.topLevelGroups) as List<Group>
  }

  get visitedTopLevelGroupStackOrder():List<Group> {
    return this.topLevelGroupStackOrder.filter((g:Group) =>
           this.wasManuallyVisited(g)) as List<Group>
  }

  get mostRecentTopLevelGroup():Group|undefined {
    return this.visitedTopLevelGroupStackOrder.first()
  }

  getInitialUrl(c:IContainer):string {
    if (c.isGroup) {
      return this.getInitialUrl(this.getGroupCurrentContainer(c.name))
    }
    else {
      return (c as Container).initialUrl
    }
  }

  switchToGroup({name, time}:{name:string, time:number}):State {
    const container:string = this.getGroupCurrentContainerName(name)
    return this.activateContainer(container, time)
  }

  switchToContainer({name, time}:{name: string, time: number}):State {
    return this.activateContainer(name, time)
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
    const group:string|undefined = container.group
    if (!group) {
      throw new Error('Window must be inside a WindowGroup')
    }
    const state:State = this.setWindowVisibility({forName, visible: false})
    if (state.hasEnabledContainers(group)) {
      return state
    }
    else {
      return state.back({n: 1, time})
    }
  }

  getWindowContainer(w:HistoryWindow):IGroupContainer {
    return this.containers.get(w.forName) as IGroupContainer
  }
  
  getGroupContainerNames(group:string):List<string> {
    const filter = (c:IContainer) => c.group === group
    return this.containers.filter(filter).keySeq().toList()
  }

  getGroupContainers(group:string):List<IGroupContainer> {
    const filter = (c:IContainer) => c.group === group
    return this.containers.filter(filter).toList() as List<IGroupContainer>
  }

  hasEnabledContainers(group:string):boolean {
    return this.getGroupContainerNames(group)
               .some(this.isContainerEnabled.bind(this))
  }

  activateContainer(container:string,
                    time:number, type:VisitType=VisitType.MANUAL):State {
    if (this.isContainerActive(container)) {
      return this
    }
    else {
      const from:IContainer|undefined = this.activeContainer
      const to:IContainer = this.containers.get(container)
      const s1 = this.isContainerEnabled(container) ? this :
                 this.setWindowVisibility({forName: container, visible: true})
      const s2 = from && from.resetOnLeave && from.group === to.group ?
                 s1.top({time: time - 1, reset: true}) : s1
      const newActivePage = this.getContainerActivePage(container)
      return s2.replacePage(newActivePage.touch({time, type}))
    }
  }

  go({n, time, container}:{n:number, time:number, container?:string}):State {
    if (n === 0) {
      return this
    }
    if (container) {
      return this.activateContainer(container, time).go({n, time})
    }
    if (this.isOnZeroPage) {
      if (n > 0) {
        return this.replacePages(pageUtils.forward(this.pages, {time}))
                   .go({n: n - 1, time})
      }
      else {
        throw new Error('Cannot go back from zero page')
      }
    }
    const activeGroup:string|undefined = this.activeGroupName
    if (!activeGroup) {
      throw new Error('No active group')
    }
    const f = (x):State => this.goInContainer(activeGroup, {n: x, time})
    if (n < 0 && this.activeIndex === 1) {  // if going back to zero page
      const backPage = pageUtils.getBackPage(this.getPages())
      if (backPage) {
        return this.replacePage(backPage.touch({time, type: VisitType.MANUAL}))
      }
      else {
        throw new Error('No back page')
      }
    }
    return f(n)
  }

  back({n=1, time, container}:{n?:number, time:number, container?:string}):State {
    return this.go({n: 0 - n, time, container})
  }

  forward({n=1, time, container}:
          {n?:number, time:number, container?:string}):State {
    return this.go({n, time, container})
  }

  private canGoBack(n:number=1):boolean {
    return this.activeIndex >= n
  }

  isContainerAtTopPage(container:string):boolean {
    return pageUtils.getActiveIndex(this.getContainerPages(container)) === 0
  }

  top({container=this.activeContainerName, time, reset=false}:
      {container?:string|undefined, time:number, reset?:boolean}):State {
    if (!container) {
      throw new Error('No active container')
    }
    const ps = pageUtils.top(this.getContainerPages(container), {time, reset})
    return this.replaceContainerPages(container, ps)
  }

  getShiftAmount(page:Page):number {
    return pageUtils.getShiftAmount(this.getPages(), page)
  }

  cloneWithPagesSorted():State {
    return this.replacePages(this.sortPagesByFirstVisited(this.pages), false)
  }

  private pushOrReplace({page, time, type=VisitType.MANUAL, fn}:
                {page: Page, time:number, type?:VisitType, fn:Function}):State {
    const activeContainer:string|undefined = this.activeContainerName
    if (!activeContainer) {
      throw new Error('No active container')
    }
    return fn.bind(this)(activeContainer, {page, time, type})
  }

  private pushOrReplaceInContainer(container:string,
                                   {page, time, type=VisitType.MANUAL, fn}:
                {page: Page, time:number, type?:VisitType, fn:Function}):State {
    const containerPages = this.getContainerPages(container)
    const newPages = fn(containerPages, {page, time, type})
    const state:State = this.replaceContainerPages(container, newPages)
    return type === VisitType.MANUAL ?
      state.setWindowVisibility({forName: container, visible: true}) : state
  }

  push({page, time, type=VisitType.MANUAL}:
       {page: Page, time:number, type?:VisitType}):State {
    return this.pushOrReplace({page, time, type, fn: this.pushInContainer})
  }

  replace({page, time, type=VisitType.MANUAL}:
         {page: Page, time:number, type?:VisitType}):State {
    return this.pushOrReplace({page, time, type, fn: this.replaceInContainer})
  }

  pushInContainer(container:string, {page, time, type=VisitType.MANUAL}:
                    {page: Page, time:number, type?:VisitType}):State {
    return this.pushOrReplaceInContainer(
      container, {page, time, type, fn: pageUtils.push})
  }

  replaceInContainer(container:string, {page, time, type=VisitType.MANUAL}:
    {page: Page, time:number, type?:VisitType}):State {
    return this.pushOrReplaceInContainer(
      container, {page, time, type, fn: pageUtils.replace})
  }

  getRootGroupOfGroup(group:string):Group {
    const g:Group = this.containers.get(group) as Group
    if (g.group) {
      return this.getRootGroupOfGroup(g.group)
    }
    else {
      return g
    }
  }

  get activeGroup():Group|undefined {
    const p:VisitedPage = this.activePage
    if (p.isZeroPage) {
      //const fp = pageUtils.getForwardPage(this.getPages)
      //return fp && this.getRootGroupOfGroup(fp.group)
      return undefined
    }
    else {
      return this.getRootGroupOfGroup(p.group)
    }
  }

  get activeGroupName():string|undefined {
    const g:Group|undefined = this.activeGroup
    return g && g.name
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    const lastGroup:Group|undefined = this.mostRecentTopLevelGroup
    if (lastGroup && this.hasEnabledContainers(lastGroup.name)) {
      const groupHistory = this.getGroupHistory(lastGroup.name, maintainFwd)
      if(this.isOnZeroPage) {
        return new HistoryStack({
          back: [],
          current: this.zeroPage,
          forward: groupHistory.flatten().toArray()
        })
      }
      else {
        return new HistoryStack({
          ...groupHistory,
          back: [this.zeroPage, ...groupHistory.back]
        })
      }
    }
    return new HistoryStack({
      back: [],
      current: this.zeroPage,
      forward: []
    })
  }
  
  get activeContainer():Container|undefined {
    const group:string|undefined = this.activeGroupName
    return group ? this.getGroupActiveLeafContainer(group) : undefined

  }
  
  get activeContainerName():string|undefined {
    const c:Container|undefined = this.activeContainer
    return c && c.name
  }

  /**
   * Tries to get active, then default, then chooses the first
   */
  getGroupCurrentContainer(group:string):IGroupContainer {
    return this.getGroupActiveContainer(group) ||
           this.getGroupDefaultContainer(group) ||
           this.getGroupContainers(group).first()
  }

  getGroupCurrentContainerName(group:string):string {
    return this.getGroupCurrentContainer(group).name
  }

  getGroupDefaultContainer(group:string):IGroupContainer|undefined {
    return this.getGroupContainers(group).find((c:IGroupContainer) => c.isDefault)
  }

  getGroupActiveContainer(group:string):IGroupContainer|undefined {
    return this.getContainerStackOrder(group).first()  // TODO: Optimize?
  }

  getGroupActiveContainerName(group:string):string|undefined {
    const c:IGroupContainer|undefined = this.getGroupActiveContainer(group)
    return c && c.name
  }

  getGroupActiveContainerIndex(group:string):number|undefined {
    const c:IGroupContainer|undefined = this.getGroupActiveContainer(group)
    return c && this.getContainerIndex(c)
  }

  getGroupActiveLeafContainer(group:string):Container|undefined {
    const name:string|undefined = this.getGroupActiveLeafContainerName(group)
    return name ? this.containers.get(name) as Container : undefined
  }

  getGroupActiveLeafContainerName(group:string):string|undefined {
    return this.getContainerActivePage(group).container
  }

  getGroupActiveLeafContainerIndex(group:string):number|undefined {
    const c:Container|undefined = this.getGroupActiveLeafContainer(group)
    return c && this.getContainerIndex(c)
  }

  get activePage():VisitedPage {
    return pageUtils.getActivePage(this.pages)
  }

  get activeIndex():number {
    return pageUtils.getActiveIndex(this.getPages()) || 0
  }

  hasWindow(forName:string):boolean {
    return this.windows.has(forName)
  }

  isWindowVisible(forName:string):boolean {
    return this.windows.get(forName).visible
  }

  isContainerEnabled(name:string):boolean {
    const visible:boolean = !this.hasWindow(name) || this.isWindowVisible(name)
    return visible && this.isParentEnabled(name)
  }
  
  isParentEnabled(name:string):boolean {
    const parent:string|undefined = this.getParent(name)
    return !parent || this.isContainerEnabled(parent)
  }

  isContainerActive(name:string):boolean {
    if (this.isGroup(name)) {
      const c:string|undefined = this.getGroupActiveContainerName(name)
      return c ? this.isContainerActive(c) : false
    }
    else {
      return this.activeContainerName === name
    }
  }

  isContainerActiveAndEnabled(name:string):boolean {
    return this.isContainerActive(name) && this.isContainerEnabled(name)
  }

  get activeUrl():string {
    return this.activePage.url
  }

  wasManuallyVisited(c:IContainer):boolean {
    return c.isDefault ||this.getContainerActivePage(c.name).wasManuallyVisited
  }

  getGroupPages(group:string):List<VisitedPage> {
    return this.getGroupHistory(group).flatten()
  }

  getContainerPages(name:string):List<VisitedPage> {
    if (this.isGroup(name)) {
      return this.getGroupPages(name)
    }
    else {
      return this.pages.filter((p:VisitedPage) => name === p.container).toList()
    }
  }

  getContainerActivePage(container:string):VisitedPage {
    return pageUtils.getActivePage(this.getContainerPages(container))
  }

  getContainerActiveUrl(container:string):string|undefined {
    return this.getContainerActivePage(container).url
  }

  isContainerInGroup(container:string, group:string):boolean {
    const c:IContainer = this.containers.get(container)
    if (c.group) {
      if (c.group === group) {
        return true
      }
      else {
        return this.isContainerInGroup(c.group, group)
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

  getContainerNameByIndex(group:string, index:number): string {
    return this.getGroupContainerNames(group).get(index)
  }

  getContainerStackOrderForGroup(group:string):List<IGroupContainer> {
    const containers:List<IContainer> = this.getGroupContainers(group)
    return List<IGroupContainer>(this.sortContainersByLastVisited(containers))
  }

  _goInGroup(group:string, goFn:GoFn, lengthFn:LengthFn,
             nextPageFn: NextPageFn, n:number, time:number):State {
    if (n === 0) {
      return this.activateContainer(group, time)
    }
    const container:string|undefined = this.getGroupActiveContainerName(group)
    if (!container) {
      throw new Error(`Group ${group} has no active containers`)
    }
    else {
      const containerLength:number = lengthFn(this, container)
      const amount:number = Math.min(n, containerLength)
      const state:State = goFn(this, container, amount, time)
      const remainder = n - amount
      if (remainder > 0) {
        if (lengthFn(state, group) >= remainder) {
          const nextPage:Page|undefined = nextPageFn(state, group)
          if (!nextPage) {
            throw new Error('Couldn\'t get next page')
          }
          else {
            const nextContainer:string = nextPage.container
            const newState:State = this.activateContainer(nextContainer, time)
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
        return state
      }
    }
  }

  backInGroup(group:string, {n=1, time}:{n:number, time}):State {
    return this._goInGroup(
      group,
      (state:State, name:string, n:number, t:number) =>
        state.backInContainer(name, {n, time: t}),
      (state:State, name:string) => state.getContainerBackLength(name),
      (state:State, name:string) => state.getContainerBackPage(name),
      n, time)
  }

  forwardInGroup(group:string, {n=1, time}:{n:number, time}):State {
    return this._goInGroup(
      group,
      (state:State, name:string, n:number, t:number) =>
        state.forwardInContainer(name, {n, time: t}),
      (state:State, name:string) => state.getContainerForwardLength(name),
      (state:State, name:string) => state.getContainerForwardPage(name),
      n, time)
  }

  goInGroup(group:string, {n, time}:{n:number, time}):State {
    return n > 0 ? this.forwardInGroup(group, {n, time}) :
      this.backInGroup(group, {n: 0 - n, time})
  }

  private _goInContainer(nextPageFn: () => VisitedPage|undefined,
                         time:number):State {
    const page:VisitedPage|undefined = nextPageFn()
    if (page) {
      const visit:PageVisit = {time, type: VisitType.MANUAL}
      return this.replacePage(page.touch(visit))
    }
    else {
      return this
    }
  }

  backInContainer(container:string, {n=1, time}:{n:number, time}):State {
    return this._goInContainer(
        () => this.getContainerBackPage(container, n), time)
  }

  forwardInContainer(container:string, {n=1, time}:{n:number, time}):State {
    return this._goInContainer(
        () => this.getContainerForwardPage(container, n), time)
  }

  goInContainer(container:string, {n=1, time}:{n:number, time}):State {
    return n > 0 ? this.forwardInContainer(container, {n, time}) :
      this.backInContainer(container, {n: 0 - n, time})
  }

  getContainerIndex(container:IGroupContainer):number {
    return this.getGroupContainerNames(container.group).indexOf(container.name)
  }

  getContainerBackLength(container:string):number {
    return pageUtils.getBackLength(this.getContainerPages(container))
  }

  getContainerForwardLength(container:string):number {
    return pageUtils.getForwardLength(this.getContainerPages(container))
  }

  getContainerBackPage(container:string, n:number=1):VisitedPage|undefined {
    return pageUtils.getBackPage(this.getContainerPages(container), n)
  }

  getContainerForwardPage(container:string, n:number=1):VisitedPage|undefined {
    return pageUtils.getForwardPage(this.getContainerPages(container), n)
  }
  
  get groups():Map<string, Group> {
    return this.containers.filter((c:IContainer) =>
        this.isGroup(c.name)).toMap() as Map<string, Group>
  }

  get leafContainers():Map<string, Container> {
    return this.containers.filter((c:IContainer) =>
        !this.isGroup(c.name)).toMap() as Map<string, Container>
  }

  isGroup(name:string):boolean {
    return this.containers.get(name).isGroup
  }
  
  isTopLevel(name:string):boolean {
    return !this.containers.get(name).group
  }
  
  getParent(name:string):string|undefined {
    return this.containers.get(name).group
  }

  replaceContainer(container:IContainer):State {
    return this.assign({
      containers: this.containers.set(container.name, container)
    })
  }

  replacePage(page:VisitedPage):State {
    return this.assign({
      pages: this.pages.set(this.pages.indexOf(page), page)
    }).cloneWithPagesSorted()
  }

  replacePages(pages:List<VisitedPage>, sort:boolean=true):State {
    const state:State = this.assign({pages})
    return sort ? state.cloneWithPagesSorted() : state
  }

  replaceContainerPages(container:string, pages:List<VisitedPage>):State {
    const isOutside = (p:VisitedPage):boolean => p.container !== container
    const outsidePages:List<VisitedPage> = this.pages.filter(isOutside).toList()
    const ps:List<VisitedPage> = outsidePages.concat(pages).toList()
    return this.replacePages(ps)
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
      parentGroup: undefined,
      isDefault: false
    })
    return this.replaceContainer(group)
  }

  addSubGroup({name, parentGroup, isDefault=false,
    allowInterContainerHistory=false, resetOnLeave=false,
    gotoTopOnSelectActive=false}:
    {name:string, parentGroup:string, isDefault:boolean,
      allowInterContainerHistory?:boolean,
      resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):State {
    this.disallowDuplicateContainer(name)
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      allowInterContainerHistory,
      parentGroup,
      isDefault
    })
    return this.replaceContainer(group)
  }

  addContainer({time, name, group, initialUrl, isDefault=false,
                resetOnLeave=false, patterns}:
      {time:number, name:string, group:string, initialUrl:string,
        patterns:string[], isDefault:boolean, resetOnLeave:boolean}):State {
    this.disallowDuplicateContainer(name)
    const container:Container = new Container({
      initialUrl,
      patterns,
      resetOnLeave,
      group,
      name,
      isDefault
    })
    const page = new VisitedPage({
      url: initialUrl,
      params: parseParamsFromPatterns(patterns, initialUrl),
      container: name,
      group
    })
    return this.replaceContainer(container)
               .pushInContainer(name, {page, time, type: VisitType.AUTO})
  }

  replaceWindow(w:HistoryWindow):State {
    return this.assign({windows: this.windows.set(w.forName, w)})
               .cloneWithPagesSorted()
  }

  setWindowVisibility({forName, visible}:
                      {forName:string, visible:boolean}):State {
    const s:State = this.hasWindow(forName) ?
        this.replaceWindow(this.windows.get(forName).setVisible(visible)) : this
    return s.setParentWindowVisibility({forName, visible})
  }

  setParentWindowVisibility({forName, visible}:
                            {forName:string, visible:boolean}):State {
    const parent:string|undefined = this.getParent(forName)
    return parent ? this.setWindowVisibility({forName: parent, visible}) : this
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
      this.assign({titles: this.titles.push({pathname, title})})
  }

  getTitleForPath(pathname:string):string|undefined {
    const found = this.titles.find((t:PathTitle) => t.pathname === pathname)
    return found && found.title
  }

  hasTitleForPath(pathname:string):boolean {
    return !!this.getTitleForPath(pathname)
  }

  get activeTitle() {
    return this.getTitleForPath(this.activeUrl)
  }

  touchPage(page:VisitedPage, {time, type=VisitType.MANUAL}:
              {time:number, type?:VisitType}):State {
    return this.replacePage(page.touch({time, type}))
  }

  load({url, time}:{url: string, time: number}):State {
    const state:State = this.setZeroPage(this.zeroPageUrl)
    return state.leafContainers.reduce(
      (s:State, c:Container) => s.loadInContainer(c, {url, time}),
      state
    ).assign({isInitialized: true})
  }

  loadInContainer(c:Container, {url, time}:{url:string, time:number}):State {
    if (patternsMatch(c.patterns, url)) {
      const pages:List<VisitedPage> = this.getContainerPages(c.name)
      const activePage:VisitedPage = pageUtils.getActivePage(pages)
      const newState =
        activePage && pageUtils.isAtTopPage(pages) && c.initialUrl !== url ?
          this.touchPage(activePage, {time: time - 1}) : this
      const page:Page = new Page({
        url,
        params: parseParamsFromPatterns(c.patterns, url),
        container: c.name,
        group: c.group
      })
      return newState.pushInContainer(c.name, {page, time})
    }
    else {
      return this
    }
  }

  isDefaultPage(page:Page):boolean {
    if (page.isZeroPage) {
      return false
    }
    const c:Container = this.leafContainers.get(page.container)
    return c.isDefault && c.initialUrl === page.url
  }

  getLastContainerVisit(container:string):PageVisit {
    return this.getContainerActivePage(container).lastVisit
  }

  getFirstContainerVisitTime(c:IContainer):number {
    return this.getContainerPages(c.name).first().visits[0].time
  }

  getFirstManualContainerVisit(container:string):PageVisit|undefined {
    const ps:List<VisitedPage> = this.getContainerPages(container)
    const page = ps.find((p:VisitedPage) => p.wasManuallyVisited)
    return page && page.firstManualVisit
  }

  private sortByLastVisit(cs:List<IContainer>):List<IContainer> {
    return cs.sortBy((c:IContainer) => {
      const v:PageVisit|undefined = this.getLastContainerVisit(c.name)
      return v ? 0 - v.time : 0
    }).toList()
  }

  private sortByFirstManualVisit(cs:List<IContainer>):List<IContainer> {
    return cs.sort((c1:IContainer, c2:IContainer) => {
      const v1 = this.getFirstManualContainerVisit(c1.name)
      const v2 = this.getFirstManualContainerVisit(c2.name)
      if (v1) {
        if (v2) {
          return v1.time - v2.time
        }
        else {
          return -1
        }
      }
      else {
        if (v1) {
          return 1
        }
        else {
          return -1  // 0
        }
      }
    }).toList()
  }

  private

  private _sortContainers(cs:List<IContainer>,
                          fn:SortFn<IContainer>):List<IContainer> {
    return sort<IContainer>(
      cs, fn,
      this.wasManuallyVisited.bind(this),
      (c:IContainer) => c.isDefault
    )
  }

  sortContainers(cs:List<IContainer>, fn:SortFn<IContainer>):List<IContainer> {
    const enabled = cs.filter((c:IContainer) =>
        this.isContainerEnabled(c.name)).toList()
    const disabled = cs.filterNot((c:IContainer) =>
        this.isContainerEnabled(c.name)).toList()
    return this._sortContainers(enabled, fn).concat(
           this._sortContainers(disabled, fn)).toList()
  }

  sortPages(ps:List<VisitedPage>, fn:PageSortFn):List<VisitedPage> {
    const zeroPage:VisitedPage = ps.find((p:VisitedPage) => p.isZeroPage)
    const withoutZero = ps.filterNot((p:VisitedPage) => p.isZeroPage).toList()
    const fn2 = (params:SortFnParams<VisitedPage>) => fn({...params, zeroPage})
    return sort<VisitedPage>(
      withoutZero, fn2,
      (p:VisitedPage) => p.wasManuallyVisited,
      this.isDefaultPage.bind(this)
    )
  }

  sortContainersByLastVisited(cs:List<IContainer>):List<IContainer> {
    return this.sortContainers(cs,
      ({visited, defaultUnvisited, nonDefaultUnvisited}) =>
        this.sortByLastVisit(visited).concat(
          defaultUnvisited).concat(
            nonDefaultUnvisited).toList())
  }

  sortContainersByFirstVisited(cs:List<IContainer>):List<IContainer> {
    return cs.sortBy(this.getFirstContainerVisitTime.bind(this)).toList()
  }

  sortContainersByFirstManuallyVisited(cs:List<IContainer>):List<IContainer> {
    return this.sortContainers(cs,
      ({visited, defaultUnvisited, nonDefaultUnvisited}) =>
        defaultUnvisited.concat(this.sortByFirstManualVisit(visited)).toList())
  }

  sortPagesByFirstVisited(ps:List<VisitedPage>):List<VisitedPage> {
    return this.sortPages(ps,
      ({zeroPage, visited, defaultUnvisited, nonDefaultUnvisited}) => {
        const pages = pageUtils.sort(visited).concat(
                        defaultUnvisited).concat(
                          nonDefaultUnvisited).toList()
        return zeroPage ? pages.insert(0, zeroPage) : pages
    })
  }

  static createZeroPage(url:string) {
    return new VisitedPage({
      url,
      params: {},
      group: '',
      container: '',
      isZeroPage: true,
      visits: [{time: -1, type: VisitType.AUTO}]
    })
  }

  get hasZeroPage():boolean {
    return !this.pages.isEmpty() && this.pages.first().isZeroPage
  }

  setZeroPage(url:string):State {
    const zeroPage:VisitedPage = State.createZeroPage(url)
    return this.assign({
      zeroPage,
      pages: List<VisitedPage>([
        zeroPage,
        ...(this.hasZeroPage ? this.pages.slice(1) : this.pages).toArray()
      ])
    })
  }

  get zeroPage():VisitedPage {
    return this.pages.first()
  }

  get isOnZeroPage():boolean {
    return pageUtils.isOnZeroPage(this.pages)
  }

  getPages():List<VisitedPage> {
    return this.isInitialized ? this.getHistory().flatten() : List<VisitedPage>()
  }
}

export default State