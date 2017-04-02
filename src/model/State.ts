import Page from './Page'
import Group from './Group'
import PathTitle from './PathTitle'
import PageVisit, {VisitType} from './PageVisit'
import IContainer from './IContainer'
import IState from '../store/IState'
import {fromJS, Map, List, OrderedMap} from 'immutable'
import {
  ComputedContainer, ComputedGroup, ComputedGroupOrContainer, ComputedWindow,
  PartialComputedState
} from './ComputedState'
import * as defaultBehavior from '../behaviors/defaultBehavior'
import * as nonDefaultBehavior from '../behaviors/nonDefaultBehavior'
import * as interContainerHistory from '../behaviors/interContainerHistory'
import * as keepFwdTabBehavior from '../behaviors/keepFwdTabBehavior'
import * as removeFwdTabBehavior from '../behaviors/removeFwdTabBehavior'
import VisitedPage from './VistedPage'
import * as pageUtils from '../util/pages'
import Container from './Container'
import HistoryWindow from './HistoryWindow'
import HistoryStack from './HistoryStack'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import IGroupContainer from './IGroupContainer'

interface SortFnParams {
  visited: List<IContainer>
  defaultUnvisited: List<IContainer>
  nonDefaultUnvisited: List<IContainer>
}

type SortFn = (params:SortFnParams) => List<IContainer>

// Param types for _goInGroup method
type GoFn = (state:State, name:string, n:number, time:number) => State
type LengthFn = (state:State, name:string) => number
type NextPageFn = (state:State, name:string, n?:number) => VisitedPage|undefined

class State implements IState {
  readonly containers: Map<string, IContainer>
  readonly windows: Map<string, HistoryWindow>
  readonly titles: List<PathTitle>
  readonly zeroPage?: string
  readonly isOnZeroPage: boolean
  readonly isInitialized: boolean
  private readonly pages: List<VisitedPage>

  constructor({windows=fromJS({}), containers=fromJS({}), pages=fromJS({}),
          zeroPage, isOnZeroPage=false, titles=fromJS([]), isInitialized=false}:
    {windows?:Map<string, HistoryWindow>, containers?: Map<string, IContainer>,
      pages?: Map<string, VisitedPage>, zeroPage?:string, isOnZeroPage?:boolean,
      titles?:List<PathTitle>, isInitialized?:boolean}={}) {
    this.containers = containers
    this.windows = windows
    this.pages = pages
    this.zeroPage = zeroPage
    this.isOnZeroPage = isOnZeroPage
    this.titles = titles
    this.isInitialized = isInitialized
  }

  get computedGroupsAndContainers():Map<string, ComputedGroupOrContainer> {
    return this.containers.reduce(
      (map:Map<string, ComputedGroupOrContainer>, c:IContainer) =>
        map.merge({
          [c.name]: {
            name: c.name,
            activeUrl: this.getContainerActiveUrl(c.name),
            backPage: this.getContainerBackPage(c.name),
            history: this.getContainerHistory(c.name)
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
            isTopLevel: !g.group,
            activeContainerIndex: this.getGroupActiveContainerIndex(g.name),
            activeContainerName: this.getGroupActiveContainerName(g.name)
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
            isActiveInGroup: this.getGroupActiveContainerName(c.group) === c.name,
            matchesCurrentUrl: currentUrl === this.getContainerActiveUrl(c.name)
          }
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
      groupsAndContainers: this.computedGroupsAndContainers,
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
    const cs = this.getContainerStackOrder(group).filter(
                  (c:IGroupContainer) => this.wasManuallyVisited(c))
    switch(cs.size) {
      case 0: {
        const activeContainer:string = this.getGroupActiveContainerName(group)
        return this.getSingleHistory(activeContainer, keepFwd)
      }
      case 1: {
        return this.getSingleHistory(cs.get(0).name, keepFwd)
      }
      default: {
        const from: IContainer = cs.get(1)
        const to: IContainer = cs.get(0)
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

  switchToGroup({name, time}:{name:string, time:number}):State {
    const c:IContainer = this.getGroupActiveContainer(name)
    return this.activateContainer(c.name, {time, type: VisitType.MANUAL})
  }

  switchToContainer({name, time}:{name: string, time: number}):State {
    return this.activateContainer(name, {time, type: VisitType.MANUAL})
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
    const groupName:string|undefined = container.group
    if (!groupName) {
      throw new Error('Window must be inside a WindowGroup')
    }
    const state:State = this.setWindowVisibility({forName, visible: false})
    const group:Group = this.groups.get(groupName)
    if (this.hasEnabledContainers(group)) {
      return state.switchToGroup({name: groupName, time})
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

  hasEnabledContainers(group:Group):boolean {
    return this.getGroupContainerNames(group.name)
      .some(this.isContainerEnabled.bind(this))
  }

  activateContainer(container:string, visit:PageVisit):State {
    return this.replacePage(this.getContainerActivePage(container).touch(visit))
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
    if (n < 0 && this.activeIndex === 1) {  // if going back to zero page
      return this.assign({isOnZeroPage: true})
    }
    return f(n)
  }

  back({n=1, time, container}:{n:number, time:number, container?:string}):State {
    return this.go({n: 0 - n, time, container})
  }

  forward({n=1, time, container}:
          {n:number, time:number, container?:string}):State {
    return this.go({n, time, container})
  }

  private canGoBack(n:number=1):boolean {
    return this.activeIndex >= n
  }

  isContainerAtTopPage(container:string):boolean {
    return pageUtils.getActiveIndex(this.getContainerPages(container)) === 0
  }

  top({container, time, reset=false}:
      {container:string, time:number, reset?:boolean}):State {
    const ps = pageUtils.top(this.getContainerPages(container), {time, reset})
    return this.replaceContainerPages(container, ps)
  }

  getShiftAmount(page:Page):number {
    return pageUtils.getShiftAmount(this.getPages(), page)
  }

  /*
  getRootGroupOfGroup(group:string):Group {-
    const g:Group = this.containers.get(group)
    if (g.parentGroup) {
      return this.getRootGroupOfGroup(g.parentGroup)
    }
    else {
      return g
    }
  }
  */

  sortPages():State {
    return this.replacePages(pageUtils.sort(this.pages))
  }

  push({page, time, type=VisitType.MANUAL}:
       {page: Page, time:number, type?:VisitType}):State {
    return this.pushInContainer(this.activeContainerName, {page, time, type})
  }

  pushInContainer(container:string, {page, time, type=VisitType.MANUAL}:
                    {page: Page, time:number, type?:VisitType}):State {
    const containerPages = this.getContainerPages(container)
    const newPages = pageUtils.push(containerPages, {page, time, type})
    return this.replaceContainerPages(container, newPages)
  }

  get activeGroupName():string {
    return this.activePage.group
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    const groupHistory = this.getGroupHistory(this.activeGroupName, maintainFwd)
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
  
  get activeContainer():Container {
    return this.getGroupActiveLeafContainer(this.activeGroupName)
  }
  
  get activeContainerName():string {
    return this.activeContainer.name
  }

  get groupStackOrder():List<Group> {
    return this.groups.sortBy((g:Group) => {
      const activeContainer:string = this.getGroupActiveContainerName(g.name)
      return 0 - this.getLastContainerVisit(activeContainer).time
    }).toList()
  }

  getGroupActiveContainer(group:string):IGroupContainer {
    return this.getContainerStackOrder(group).first()  // TODO: Optimize?
  }

  getGroupActiveContainerName(group:string):string {
    return this.getGroupActiveContainer(group).name
  }

  getGroupActiveContainerIndex(group:string):number {
    return this.getContainerIndex(this.getGroupActiveContainer(group))
  }

  getGroupActiveLeafContainer(group:string):Container {
    const name:string = this.getGroupActiveLeafContainerName(group)
    return this.containers.get(name) as Container
  }

  getGroupActiveLeafContainerName(group:string):string {
    return this.getContainerActivePage(group).container
  }

  getGroupActiveLeafContainerIndex(group:string):number {
    return this.getContainerIndex(this.getGroupActiveLeafContainer(group))
  }

  get activePage():VisitedPage {
    return pageUtils.getActivePage(this.pages)
  }

  get activeIndex():number {
    return pageUtils.getActiveIndex(this.getPages())
  }

  hasWindow(forName:string):boolean {
    return this.windows.has(forName)
  }

  isWindowVisible(forName:string):boolean {
    return this.windows.get(forName).visible
  }

  isContainerEnabled(container:string):boolean {
    return !this.hasWindow(container) || this.isWindowVisible(container)
  }

  isContainerActiveAndEnabled(container:string):boolean {
    return this.isContainerEnabled(container) &&
           this.activeContainerName === container
  }

  get activeUrl():string {
    return this.activePage.url
  }

  wasManuallyVisited(c:IContainer):boolean {
    return c.isDefault || this.getContainerActivePage(c.name).wasManuallyVisited
  }

  getGroupPages(group:string):List<VisitedPage> {
    const pages:List<VisitedPage> = this.getGroupContainerNames(group).reduce(
      (ps:List<VisitedPage>, container:string):List<VisitedPage> =>
          ps.concat(this.getContainerPages(container)).toList(),
      List<VisitedPage>())
    return pageUtils.sort(pages)
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

  getContainerActiveUrl(container:string):string {
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

  getGroupDefaultContainer(group:string):IContainer|undefined {
    return this.getGroupContainers(group).find((c:IGroupContainer) => c.isDefault)
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
      return this.activateContainer(group, {time, type: VisitType.MANUAL})
    }
    const container:string = this.getGroupActiveContainerName(group)
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
          const visit:PageVisit = {time, type: VisitType.MANUAL}
          const newState:State = this.activateContainer(nextContainer, visit)
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

  replacePages(pages:List<VisitedPage>):State {
    return this.assign({pages})
  }

  replaceContainerPages(container:string, pages:List<VisitedPage>):State {
    const isOutside = (p:VisitedPage):boolean => p.container !== container
    const outsidePages:List<VisitedPage> = this.pages.filter(isOutside).toList()
    const ps:List<VisitedPage> = outsidePages.concat(pages).toList()
    return this.replacePages(ps).sortPages()
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
    const type = isDefault ? VisitType.MANUAL : VisitType.AUTO
    return this.replaceContainer(container)
               .pushInContainer(name, {page, time, type})
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
      this.assign({titles: this.titles.push({pathname, title})})
  }

  getTitleForPath(pathname:string):string|undefined {
    const found = this.titles.find((t:PathTitle) => t.pathname === pathname)
    return found ? found.title : undefined
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
    return this.leafContainers.reduce((s:State, c:Container) =>
      s.loadInContainer(c, {url, time})
    , this).assign({
      isInitialized: true
    })
  }

  loadInContainer(c:Container, {url, time}:{url:string, time:number}):State {
    if (patternsMatch(c.patterns, url)) {
      const pages:List<VisitedPage> = this.getContainerPages(c.name)
      const activePage = pageUtils.getActivePage(pages)
      const newState = pageUtils.isAtTopPage(pages) ?
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

  getLastContainerVisit(container:string):PageVisit {
    return this.getContainerActivePage(container).lastVisit
  }

  getFirstManualContainerVisit(container:string):PageVisit|undefined {
    const ps:List<VisitedPage> = this.getContainerPages(container)
    const page = ps.find((p:VisitedPage) => p.wasManuallyVisited)
    return page ? page.firstManualVisit : undefined
  }

  private sortByLastVisit(cs:List<IContainer>):List<IContainer> {
    return cs.sortBy((c:IContainer) =>
              0 - this.getLastContainerVisit(c.name).time).toList()
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


  private _sort(cs:List<IContainer>, fn:SortFn):List<IContainer> {
    const unvst = cs.filterNot(this.wasManuallyVisited.bind(this)).toList()
    return fn({
      visited: cs.filter(this.wasManuallyVisited.bind(this)).toList(),
      defaultUnvisited: unvst.filter((c:IContainer) => c.isDefault).toList(),
      nonDefaultUnvisited: unvst.filter((c:IContainer) => !c.isDefault).toList()
    })
  }

  sort(cs:List<IContainer>, fn:SortFn):List<IContainer> {
    const enabled = cs.filter((c:IContainer) =>
        this.isContainerEnabled(c.name)).toList()
    const disabled = cs.filterNot((c:IContainer) =>
        this.isContainerEnabled(c.name)).toList()
    return this._sort(enabled, fn).concat(this._sort(disabled, fn)).toList()
  }

  sortContainersByLastVisited(cs:List<IContainer>):List<IContainer> {
    return this.sort(cs, ({visited, defaultUnvisited, nonDefaultUnvisited}) =>
      this.sortByLastVisit(visited).concat(
        this.sortByLastVisit(defaultUnvisited)).concat(
          this.sortByLastVisit(nonDefaultUnvisited)).toList())
  }

  sortContainersByFirstVisited(cs:List<IContainer>):List<IContainer> {
    return this.sort(cs, ({visited, defaultUnvisited, nonDefaultUnvisited}) =>
      this.sortByFirstManualVisit(visited).concat(
        this.sortByFirstManualVisit(defaultUnvisited)).toList())
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

  /**
   * Gets the zero page, or if it's not set defaults to using
   * the initialUrl of the active container
   */
  getZeroPage():VisitedPage {
    return State.createZeroPage(this.zeroPage || this.activeContainer.initialUrl)
  }

  getPages():List<VisitedPage> {
    const ps = this.isInitialized ? this.getHistory().flatten() : []
    return List<VisitedPage>(ps)
  }
}

export default State