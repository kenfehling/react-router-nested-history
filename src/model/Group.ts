import * as R from 'ramda'
import * as defaultBehavior from '../behaviors/defaultBehavior'
import * as nonDefaultBehavior from '../behaviors/nonDefaultBehavior'
import * as interContainerHistory from '../behaviors/interContainerHistory'
import * as keepFwdTabBehavior from '../behaviors/keepFwdTabBehavior'
import * as removeFwdTabBehavior from '../behaviors/removeFwdTabBehavior'
import Page from './Page'
import IHistory from './IHistory'
import Container from './Container'
import IGroupContainer from './IGroupContainer'
import IContainer from './IContainer'
import ISubGroup from './ISubGroup'
import Pages, {HistoryStack} from './Pages'
import PageVisit, {VisitType} from './PageVisit'
import VisitedPage from './VistedPage'

// Param types for _go method
type GoFn = <H extends IHistory> (h:H, n:number, time:number) => H
type LengthFn = <H extends IHistory> (h:H) => number
type NextPageFn = <H extends IHistory> (h:H) => Page

export default class Group implements IContainer {
  readonly name: string
  readonly containers: IGroupContainer[]
  readonly allowInterContainerHistory: boolean
  readonly resetOnLeave: boolean
  readonly gotoTopOnSelectActive: boolean
  readonly parentGroupName: string|null
  readonly isDefault: boolean|null  // Only applies if this has a parent group

  constructor({name, containers=[], allowInterContainerHistory=false,
    resetOnLeave=false, gotoTopOnSelectActive=false,
    parentGroupName=null, isDefault=false}:
      {name:string, containers?:IGroupContainer[],
        allowInterContainerHistory?:boolean, resetOnLeave?:boolean,
        gotoTopOnSelectActive?:boolean,
        parentGroupName?:string|null, isDefault?:boolean|null}) {
    this.name = name
    this.containers = containers
    this.allowInterContainerHistory = allowInterContainerHistory
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
    this.parentGroupName = parentGroupName
    this.isDefault = isDefault
  }

  replaceContainer(container:IGroupContainer):Group {
    const groupName:string = container.groupName
    if (groupName === this.name) {
      const i:number = R.findIndex(c => c.name === container.name, this.containers)
      if (i === -1) {  // If container didn't already exist
        return new Group({
          ...Object(this),
          containers: [...this.containers, container]
        })
      }
      else {
        return new Group({
          ...Object(this),
          containers: [
            ...this.containers.slice(0, i),
            container,
            ...this.containers.slice(i + 1)
          ]
        })
      }
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

  updatePages(pages:Pages):Group {
    return new Group({
      ...Object(this),
      containers: this.containers.map(c => c.updatePages(pages))
    })
  }

  private computeInterContainer(from:HistoryStack, to:HistoryStack,
                                fromDefault:boolean|null,
                                toDefault:boolean|null):HistoryStack {
    if (!fromDefault && !toDefault && this.allowInterContainerHistory) {
      const comparison = Pages.compareByFirstVisited(from.current, to.current)
      if (comparison < 0 || (comparison === 0 && fromDefault)) {
        return interContainerHistory.D_to_E(to, from, to)
      }
      else {
        return interContainerHistory.E_to_D(to, from, to)
      }
    }
    else {
      return to
    }
  }
  
  private static computeDefault(h:HistoryStack, defaulT:HistoryStack|null,
                         from:HistoryStack, to:HistoryStack,
                         fromDefault:boolean|null,
                         toDefault:boolean|null):HistoryStack {
    if (defaulT) {
      if (fromDefault) {
        return defaultBehavior.A_to_B(h, from, to)
      }
      else {
        if (toDefault) {
          return defaultBehavior.B_to_A(h, from, to)
        }
        else {
          return defaultBehavior.B_to_C(h, defaulT, from, to)
        }
      }
    }
    else {
      return nonDefaultBehavior.B_to_C(h, null, from, to)
    }
  }

  private static computeFwd(h:HistoryStack, keepFwd:boolean,
                            from:HistoryStack, to:HistoryStack,
                            fromDefault:boolean|null,
                            toDefault:boolean|null):HistoryStack {
    if (keepFwd && from.current.wasManuallyVisited) {
      const comparison = Pages.compareByFirstVisited(from.current, to.current)
      if (comparison > 0 || (comparison === 0 && toDefault)) {
        return keepFwdTabBehavior.E_to_D(h, from, to)
      }
      else {
        return keepFwdTabBehavior.D_to_E(h, from, to)
      }
    }
    else {
      return removeFwdTabBehavior.E_to_D(h, from, to)
    }
  }
  
  computeHistory(from:IContainer, to:IContainer,
                 keepFwd:boolean):HistoryStack {
    const defaulT:IGroupContainer|undefined = this.defaultContainer
    const fromHistory:HistoryStack =
        from instanceof Group ? from.getHistory(keepFwd) : from.history
    const toHistory:HistoryStack =
        to instanceof Group ? to.getHistory(keepFwd) : to.history
    const defaultHistory:HistoryStack|null =
        defaulT ? (defaulT instanceof Group ? defaulT.getHistory(keepFwd) :
            defaulT.history) : null
    const h1:HistoryStack = this.computeInterContainer(
        fromHistory, toHistory, from.isDefault, to.isDefault)
    const h2:HistoryStack = Group.computeDefault(
        h1, defaultHistory, fromHistory, toHistory, from.isDefault, to.isDefault)
    const h3 = Group.computeFwd(
        h2, keepFwd, fromHistory, toHistory, from.isDefault, to.isDefault)
    return h3
  }

  private static getSingleHistory(container:IGroupContainer,
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
      case 0: throw new Error(`'${this.name}' has no visited containers`)
      case 1: return Group.getSingleHistory(containers[0], keepFwd)
      default: {
        const from: IGroupContainer = containers[1]
        const to: IGroupContainer = containers[0]
        return this.computeHistory(from, to, keepFwd)
      }
    }
  }

  activateContainer(containerName:string, time:number):Group {
    const visit:PageVisit = {time, type: VisitType.MANUAL}
    const from:IGroupContainer = this.activeContainer
    const to:IGroupContainer = this.getContainerByName(containerName)
    const group:Group = from.resetOnLeave && from.name !== to.name ?
        this.replaceContainer(from.top(time, true) as IGroupContainer) :
        this.replaceContainer(from.activate(visit) as IGroupContainer)  // TODO: Still needed?
    return group.replaceContainer(
        to.activate({...visit, time: visit.time + 1}) as IGroupContainer)
  }

  private static sortContainers(containers:IGroupContainer[]):IGroupContainer[] {
    return R.sort((c1, c2) => c2.lastVisit.time - c1.lastVisit.time, containers)
  }

  get containerStackOrder():IGroupContainer[] {
    const visited = this.containers.filter(c => c.activePage.wasManuallyVisited)
    const unvisited = R.difference(this.containers, visited)
    const defaultUnvisited = R.find(c => c.isDefault, unvisited)
    const nonDefaultUnvisited = R.difference(unvisited, [defaultUnvisited])
    return [
      ...Group.sortContainers(visited),
      ...(defaultUnvisited ? [defaultUnvisited] : []),
      ...Group.sortContainers(nonDefaultUnvisited)
    ]
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
      containers: this.containers.map(c => c.loadFromUrl(url, time))
    })
  }

  patternsMatch(url:string):boolean {
    return R.any((c:IGroupContainer):boolean => c.patternsMatch(url), this.containers)
  }

  activate(visit:PageVisit):Group {
    return this.replaceContainer(this.activeContainer.activate(visit) as IGroupContainer)
  }

  getContainerIndex(container:IGroupContainer):number {
    return R.findIndex(c => c.name === container.name, this.containers)
  }

  get activeContainer():IGroupContainer {
    return this.containerStackOrder[0]
  }

  get activeContainerIndex():number {
    if (this.containers.length === 0) {
      return 0
    }
    else {
      return this.getContainerIndex(this.containerStackOrder[0])
    }
  }

  isContainerActive(containerName:string):boolean {
    if (this.containers.length === 0) {
      return false
    }
    else {
      return this.activeContainer.name === containerName
    }
  }

  get activeNestedContainer():Container {
    const activeContainer:IGroupContainer = this.activeContainer
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

  get defaultContainer():IGroupContainer|undefined {
    return R.find((c:IGroupContainer) => c.isDefault, this.containers)
  }

  getActivePageInContainer(containerName:string):Page {
    return this.getContainerByName(containerName).activePage
  }

  get activePage():VisitedPage {
    return this.activeContainer.activePage
  }

  getActiveUrlInContainer(containerName:string):string {
    return this.getActivePageInContainer(containerName).url
  }

  top(time:number, reset:boolean=false):Group {
    return this.replaceContainer(this.activeContainer.top(time, reset) as IGroupContainer)
  }

  push(page:Page, time:number, type:VisitType=VisitType.MANUAL):Group {
    const {groupName, containerName} = page
    if (groupName === this.name) {
      const container:IGroupContainer = this.getContainerByName(containerName)
      return this.replaceContainer(container.push(page, time, type) as IGroupContainer)
    }
    else {
      const group:ISubGroup|null = this.getNestedGroupByName(groupName)
      if (!group) {
        throw new Error('Group \'' + groupName + '\' not found in ' + this.name)
      }
      return this.replaceContainer(group.push(page, time, type) as IGroupContainer)
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
    const container:IGroupContainer = this.activeContainer
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
    const container:IGroupContainer = this.activeContainer
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
      c => c.getForwardPage(),
      n, time)
  }

  back(n:number=1, time):Group {
    return this._go(
      (c, n, t) => c.back(n, t),
      c => c.backLength,
      c => c.getBackPage(),
      n, time)
  }

  /*
  forward(n:number=1, time):Group {
    if (this.canGoForward(n)) {
      return this.updatePages(this.pages.forward(n, time))
    }
    else {
      throw new Error('Cannot go forward ' + n)
    }
  }

  back(n:number=1, time):Group {
    if (this.canGoBack(n)) {
      return this.updatePages(this.pages.back(n, time))
    }
    else {
      throw new Error('Cannot go back ' + n)
    }
  }
  */

  go(n:number, time):Group {
    return n > 0 ? this.forward(n, time) : this.back(0 - n, time)
  }

  getBackPage(n:number=1):Page|undefined {
    return this.pages.getBackPage(n)
  }

  getForwardPage(n:number=1):Page|undefined {
    return this.pages.getForwardPage(n)
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

  get subGroups():Group[] {
    return this.containers.filter((c:IGroupContainer) => c instanceof Group) as Group[]
  }

  get wasManuallyVisited():boolean {
    return this.activeContainer.wasManuallyVisited
  }

  getNestedContainerByName(name:string):IGroupContainer|null {
    let foundContainer:IGroupContainer|null = null
    this.containers.forEach((container:IGroupContainer) => {
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
    const container:IGroupContainer|null = this.getNestedContainerByName(name)
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

  getContainerByName(name:string):IGroupContainer {
    return R.find(c => c.name === name, this.containers)
  }

  hasContainerWithName(name:string):boolean {
    return R.any(c => c.name === name, this.containers)
  }

  hasNestedContainerWithName(name:string):boolean {
    return !!this.getNestedContainerByName(name)
  }

  hasNestedContainer(container:IGroupContainer):boolean {
    return this.hasNestedContainerWithName(container.name)
  }

  hasContainer(container:IGroupContainer):boolean {
    return this.hasContainerWithName(container.name)
  }

  getSubGroupHavingContainer(container:IGroupContainer):Group {
    return R.find(g => g.hasNestedContainer(container), this.subGroups)
  }

  getSubGroupHavingContainerWithName(name:string):Group {
    return R.find(g => g.hasNestedContainerWithName(name), this.subGroups)
  }

  get isInitialized():boolean {
    return this.containers.length > 0 &&
      R.all(g => g.isInitialized, this.subGroups)
  }

  get initialUrl():string {
    return this.containers[0].initialUrl
  }

  get groupName():string|null {
    return this.parentGroupName
  }

  getContainerLinkUrl(containerName:string):string {
    const activeContainer:IGroupContainer = this.activeContainer
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
    return R.flatten(this.containers.map(c => c.patterns))
  }

  get pages():Pages {
    return new Pages(this.history.flatten())
  }

  get lastVisit():PageVisit {
    return this.activeContainer.lastVisit
  }

  get backPages():Page[] {
    return this.history.back
  }

  get forwardPages():Page[] {
    return this.history.forward
  }

  get backLength():number {
    return this.history.back.length
  }

  get forwardLength():number {
    return this.history.forward.length
  }

  get isGroup():boolean {
    return true
  }
}