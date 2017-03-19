import * as R from 'ramda'
import * as defaultBehavior from '../behaviors/defaultBehavior'
import * as nonDefaultBehavior from '../behaviors/nonDefaultBehavior'
import * as interContainerHistory from '../behaviors/interContainerHistory'
import * as keepFwdTabBehavior from '../behaviors/keepFwdTabBehavior'
import * as removeFwdTabBehavior from '../behaviors/removeFwdTabBehavior'
import Page from './Page'
import IHistory from './IHistory'
import Container from './Container'
import IContainer from './IContainer'
import ISubGroup from './ISubGroup'
import Pages, {HistoryStack} from './Pages'
import PageVisit, {VisitType} from './PageVisit'
import VisitedPage from './VistedPage'
import {
  sortContainersByLastVisited, sortContainersByFirstVisited
} from '../util/sorter'
import {Map, fromJS} from 'immutable'
import {ComputedGroup} from './ComputedState'

// Param types for _go method
type GoFn = <H extends IHistory> (h:H, n:number, time:number) => H
type LengthFn = <H extends IHistory> (h:H) => number
type NextPageFn = <H extends IHistory> (h:H) => Page

export default class Group implements IContainer {
  readonly name: string
  readonly enabled: boolean
  readonly containers: Map<string, IContainer>
  readonly allowInterContainerHistory: boolean
  readonly resetOnLeave: boolean
  readonly gotoTopOnSelectActive: boolean
  readonly parentGroupName: string
  readonly isDefault: boolean  // Only applies if this has a parent group

  constructor({name, enabled=true, containers=fromJS({}),
    allowInterContainerHistory=false, resetOnLeave=false,
    gotoTopOnSelectActive=false, parentGroupName='', isDefault=false}:
      {name:string, enabled?:boolean, containers?:Map<string, IContainer>,
        allowInterContainerHistory?:boolean, resetOnLeave?:boolean,
        gotoTopOnSelectActive?:boolean,
        parentGroupName?:string, isDefault?:boolean}) {
    this.name = name
    this.enabled = enabled
    this.containers = containers
    this.allowInterContainerHistory = allowInterContainerHistory
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
    this.parentGroupName = parentGroupName
    this.isDefault = isDefault
  }

  replaceContainer(container:IContainer):Group {
    const groupName:string = container.groupName
    if (groupName === this.name) {
      return new Group({
        ...Object(this),
        containers: this.containers.set(container.name, container)
      })
    }
    else {
      const group:ISubGroup|null = this.getNestedGroupByName(groupName)
      if (!group) {
        throw new Error('Group \'' + groupName + '\' not found in ' + this.name)
      }
      const newGroup:Group = group.replaceContainer(container)
      return this.replaceContainer(newGroup as ISubGroup)
    }
  }

  updatePages(pages:Pages):IContainer {
    return new Group({
      ...Object(this),
      containers: this.containers.map((c:IContainer) => c.updatePages(pages))
    })
  }

  private static getContainerHistory(c:IContainer, keepFwd:boolean):HistoryStack {
    return c instanceof Group ? c.getHistory(keepFwd) : c.history
  }
  
  private static computeDefault(h:HistoryStack, defaulT:IContainer|undefined,
                                from:IContainer, to:IContainer,
                                keepFwd:boolean):HistoryStack {
    const fromHistory:HistoryStack = Group.getContainerHistory(from, keepFwd)
    const toHistory:HistoryStack = Group.getContainerHistory(to, keepFwd)
    if (defaulT) {
      if (from.isDefault) {
        return defaultBehavior.A_to_B(h, fromHistory, toHistory)
      }
      else {
        if (to.isDefault) {
          return defaultBehavior.B_to_A(h, fromHistory, toHistory)
        }
        else {
          const defaultHistory = Group.getContainerHistory(defaulT, keepFwd)
          return defaultBehavior.B_to_C(h, defaultHistory, fromHistory, toHistory)
        }
      }
    }
    else {
      return nonDefaultBehavior.B_to_C(h, null, fromHistory, toHistory)
    }
  }

  private computeInterContainer(from:IContainer, to:IContainer,
                                keepFwd:boolean):HistoryStack {
    const toHistory:HistoryStack = Group.getContainerHistory(to, keepFwd)
    if (!from.isDefault && !to.isDefault && this.allowInterContainerHistory) {
      const fromHistory:HistoryStack = Group.getContainerHistory(from, keepFwd)
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

  private static computeFwd(h:HistoryStack, keepFwd:boolean,
                            from:IContainer, to:IContainer):HistoryStack {
    const fromHistory:HistoryStack = Group.getContainerHistory(from, keepFwd)
    const toHistory:HistoryStack = Group.getContainerHistory(to, keepFwd)
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
  
  computeHistory(from:IContainer, to:IContainer, keepFwd:boolean):HistoryStack {
    const defaulT:IContainer|undefined = this.defaultContainer
    const h1:HistoryStack = this.computeInterContainer(from, to, keepFwd)
    const h2:HistoryStack = Group.computeDefault(h1, defaulT, from, to, keepFwd)
    return Group.computeFwd(h2, keepFwd, from, to)
  }

  private static getSingleHistory(container:IContainer,
                                  keepFwd:boolean):HistoryStack {
    if (container instanceof Group) {
      return container.getHistory(keepFwd)
    }
    else {
      return container.history
    }
  }

  getHistory(keepFwd:boolean=false):HistoryStack {
    const containers = this.containerStackOrder.filter(c => c.wasManuallyVisited)
    switch(containers.length) {
      case 0: return Group.getSingleHistory(this.activeContainer, keepFwd)
      case 1: return Group.getSingleHistory(containers[0], keepFwd)
      default: {
        const from: IContainer = containers[1]
        const to: IContainer = containers[0]
        return this.computeHistory(from, to, keepFwd)
      }
    }
  }

  activateContainer(containerName:string, time:number):Group {
    const visit:PageVisit = {time, type: VisitType.MANUAL}
    const from:IContainer = this.activeContainer
    const to:IContainer = this.getContainerByName(containerName)
    if (from === to) {
      return this.replaceContainer(to.activate(visit) as IContainer)
    }
    else {
      const group:Group = from.resetOnLeave && from.name !== to.name ?
        this.replaceContainer(from.top(time, true) as IContainer) : this
      return group.replaceContainer(
        to.activate({...visit, time: visit.time + 1}) as IContainer)
    }
  }

  get containerStackOrder():IContainer[] {
    return sortContainersByLastVisited(this.containers.toArray()) as IContainer[]
  }

  get history():HistoryStack {
    return this.getHistory()
  }

  get historyWithFwdMaintained():HistoryStack {
    return this.getHistory(true)
  }

  loadFromUrl(url:string, time:number):Group {
    return new Group({
      ...Object(this),
      containers: this.containers.map((c:IContainer) => c.loadFromUrl(url, time))
    })
  }

  patternsMatch(url:string):boolean {
    return R.any(c => c.patternsMatch(url), this.containers.toArray())
  }

  activate(visit:PageVisit):Group {
    const container = this.activeContainer.activate(visit) as IContainer
    return this.replaceContainer(container)
  }

  getContainerIndex(container:IContainer):number {
    return R.findIndex(c => c === container, this.containers.toArray())
  }

  get activeContainer():IContainer {
    return this.containerStackOrder[0]
  }

  get activeContainerIndex():number {
    if (this.containers.size === 0) {
      return 0
    }
    else {
      return this.getContainerIndex(this.containerStackOrder[0])
    }
  }

  isContainerActiveAndEnabled(containerName:string):boolean {
    if (this.containers.size === 0) {
      return false
    }
    else {
      const c:IContainer = this.activeContainer
      return c.name === containerName && c.enabled
    }
  }

  isNestedGroupActive(groupName:string):boolean {
    const activeContainer:IContainer = this.activeContainer
    if (activeContainer instanceof Group) {
      if (activeContainer.name === groupName) {
        return true
      }
      else if (activeContainer.hasNestedGroupWithName(groupName)) {
        return activeContainer.isNestedGroupActive(groupName)
      }
    }
    return false
  }

  get activeNestedContainer():Container {
    const activeContainer:IContainer = this.activeContainer
    if (activeContainer instanceof Container) {
      return activeContainer
    }
    else if (activeContainer instanceof Group) {
      return activeContainer.activeNestedContainer
    }
    else {
      throw new Error('activeContainer should be a Container or Group')
    }
  }

  get defaultContainer():IContainer|undefined {
    return R.find(c => c.isDefault, this.containers.toArray())
  }

  getActivePageInContainer(containerName:string):Page {
    return this.getContainerByName(containerName).activePage
  }

  get activePage():VisitedPage {
    return this.activeContainer.activePage
  }

  get activeUrl():string {
    return this.activeContainer.activeUrl
  }

  getActiveUrlInContainer(containerName:string):string {
    return this.getActivePageInContainer(containerName).url
  }

  top(time:number, reset:boolean=false):Group {
    const container = this.activeContainer.top(time, reset) as IContainer
    return this.replaceContainer(container)
  }

  push(page:Page, time:number, type:VisitType=VisitType.MANUAL):Group {
    const {groupName, containerName} = page
    if (groupName === this.name) {
      const container:IContainer = this.getContainerByName(containerName)
      const newContainer = container.push(page, time, type) as IContainer
      return this.replaceContainer(newContainer)
    }
    else {
      const group:ISubGroup|null = this.getNestedGroupByName(groupName)
      if (!group) {
        throw new Error('Group \'' + groupName + '\' not found in ' + this.name)
      }
      const container = group.push(page, time, type) as IContainer
      return this.replaceContainer(container)
    }
  }

  get activeContainerName():string {
    return this.activeContainer.name
  }

  getShiftAmount(page:Page):number {
    return this.activeContainer.getShiftAmount(page)
  }

  containsPage(page:Page):boolean {
    return this.activeContainer.containsPage(page)
  }

  /*
  private _go(goFn:GoFn, canGoFn:CanGoFn, n:number, time:number):Group {
    if (n === 0) {
      return this.activate(time)
    }
    const next = (g:Group):Group => g._go(goFn, canGoFn, n - 1, time)
    const container:IContainer = this.activeContainer
    if (canGoFn(container)) {
      return next(this.replaceContainer(goFn(container).activate(time)))
    }
    else {
      if (canGoFn(this)) {
        return this.replacePages(goFn(this.pages))
      }
      else {
        throw new Error('Cannot go ' + n + ' in that direction')
      }
    }
  }
  */

  private _go(goFn:GoFn, lengthFn:LengthFn, nextPageFn: NextPageFn,
              n:number, time:number):Group {
    if (n === 0) {
      return this.activate({time, type: VisitType.MANUAL})
    }
    const container:IContainer = this.activeContainer
    const containerLength:number = lengthFn(container)
    const amount:number = Math.min(n, containerLength)
    const group:Group = this.replaceContainer(goFn(container, amount, time))
    const remainder = n - amount
    if (remainder > 0) {
      if (lengthFn(group) >= remainder) {
        const nextContainer:string = nextPageFn(group).containerName
        const newGroup:Group = group.activateContainer(nextContainer, time + 1)
        if (remainder > 1) {
          return this._go(goFn, lengthFn, nextPageFn, remainder - 1, time + 2)
        }
        else {
          return newGroup
        }
      }
      else {
        throw new Error('Cannot go ' + n + ' in that direction')
      }
    }
    else {
      return group
    }
  }

  forward(n:number=1, time):Group {
    return this._go(
      (c, n, t) => c.forward(n, t),
      c => c.forwardLength,
      c => c.forwardPage,
      n, time)
  }

  back(n:number=1, time):Group {
    return this._go(
      (c, n, t) => c.back(n, t),
      c => c.backLength,
      c => c.backPage,
      n, time)
  }

  go(n:number, time):Group {
    return n > 0 ? this.forward(n, time) : this.back(0 - n, time)
  }

  get backPage():Page|undefined {
    return R.last(this.backPages)
  }

  get forwardPage():Page|undefined {
    return this.forwardPages[0]
  }

  canGoBack(n:number=1):boolean {
    return this.pages.canGoBack(n)
  }

  canGoForward(n:number=1):boolean {
    return this.pages.canGoForward(n)
  }

  shiftTo(page:Page, time):Group {
    return this.go(this.getShiftAmount(page), time)
  }

  get subGroups():Map<string, Group> {
    return this.containers.filter(c => c instanceof Group) as Map<string, Group>
  }

  computeSubGroups():Map<string, ComputedGroup> {
    return fromJS(this.subGroups.map((g:Group) => g.computeState()))
  }

  get wasManuallyVisited():boolean {
    const c = this.activeContainer
    return c ? c.wasManuallyVisited : false
  }

  getNestedContainerByName(name:string):IContainer|null {
    let foundContainer:IContainer|null = null
    this.containers.forEach((container:IContainer) => {
      if (container.name === name) {
        foundContainer = container
        return
      }
      else if (container instanceof Group) {
        const c = container.getNestedGroupByName(name)
        if (c) {
          foundContainer = c
          return
        }
      }
    })
    return foundContainer
  }

  getNestedGroupByName(name:string):ISubGroup|null {
    const container:IContainer|null = this.getNestedContainerByName(name)
    if (container && !(container instanceof Group)) {
      throw new Error(`Found ${name} but it's not a Group`)
    }
    return container as ISubGroup
  }

  hasNestedGroupWithName(name:string):boolean {
    return !!this.getNestedGroupByName(name)
  }

  hasNestedGroup(group:Group):boolean {
    return this.hasNestedGroupWithName(group.name)
  }

  getContainerByName(name:string):IContainer {
    const c:IContainer = this.containers.get(name)
    if (!c) {
      throw new Error(`Container '${name}' not found in '${this.name}'`)
    }
    else {
      return c
    }
  }

  hasContainerWithName(name:string):boolean {
    return this.containers.has(name)
  }

  hasNestedContainerWithName(name:string):boolean {
    return !!this.getNestedContainerByName(name)
  }

  hasNestedContainer(container:IContainer):boolean {
    return this.hasNestedContainerWithName(container.name)
  }

  hasContainer(container:IContainer):boolean {
    return this.hasContainerWithName(container.name)
  }

  get hasEnabledContainers():boolean {
    return this.containers.some((c:IContainer) => c.enabled)
  }

  getSubGroupHavingContainer(container:IContainer):Group {
    return R.find(g => g.hasNestedContainer(container), this.subGroups.toArray())
  }

  getSubGroupHavingContainerWithName(name:string):Group {
    return R.find(g => g.hasNestedContainerWithName(name), this.subGroups.toArray())
  }

  get isInitialized():boolean {
    return this.containers.size > 0 &&
      R.all(g => g.isInitialized, this.subGroups.toArray())
  }

  get initialUrl():string {
    const defaultContainer = this.defaultContainer
    if (defaultContainer) {
      return defaultContainer.initialUrl
    }
    else {
      return this.containers.first().initialUrl
    }
  }

  get groupName():string {
    return this.parentGroupName
  }

  getContainerLinkUrl(containerName:string):string {
    const activeContainer:IContainer = this.activeContainer
    const isActive = activeContainer && activeContainer.name === containerName
    if (isActive && this.gotoTopOnSelectActive) {
      return activeContainer.initialUrl
    }
    else {
      return this.getActiveUrlInContainer(containerName)
    }
  }

  get isAtTopPage():boolean {
    return this.activeContainer.isAtTopPage
  }

  get patterns():string[] {
    return R.flatten(this.containers.toArray().map(c => c.patterns))
  }

  get pages():Pages {
    return new Pages(this.history.flatten(), false)
  }

  get firstManualVisit():PageVisit|null {
    return this.pages.firstManualVisit
  }

  get lastVisit():PageVisit {
    return this.pages.lastVisit
  }

  get backPages():Page[] {
    return this.containers.isEmpty() ? [] : this.history.back
  }

  get forwardPages():Page[] {
    return this.containers.isEmpty() ? [] : this.history.forward
  }

  get backLength():number {
    return this.containers.isEmpty() ? 0 : this.history.back.length
  }

  get forwardLength():number {
    return this.containers.isEmpty() ? 0 : this.history.forward.length
  }

  get isGroup():boolean {
    return true
  }

  setEnabled(enabled:boolean):Group {
    return new Group({...Object(this), enabled})
  }

  computeState():ComputedGroup {
    if (this.containers.isEmpty()) {
      throw new Error(`Group '${this.name}' has no containers`)
    }
    return {
      name: this.name,
      enabled: this.enabled,
      isTopLevel: !this.parentGroupName,
      containers: fromJS(this.containers.map((c:IContainer) => c.computeState())),
      stackOrder: this.containerStackOrder.map((c:IContainer) => c.computeState()),
      activeContainerIndex: this.activeContainerIndex,
      activeContainerName: this.activeContainerName,
      activeUrl: this.activeUrl,
      backPage: this.backPage,
      history: this.history
    }
  }
}