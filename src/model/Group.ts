import Comparable from './interfaces/Comparable'
import HistoryStack from './HistoryStack'
import * as R from 'ramda'
import * as defaultBehavior from '../behaviors/defaultBehavior'
import * as nonDefaultBehavior from '../behaviors/nonDefaultBehavior'
import * as interContainerHistory from '../behaviors/interContainerHistory'
import * as keepFwdTabBehavior from '../behaviors/keepFwdTabBehavior'
import Page from './Page'
import IHistory from './interfaces/IHistory'
import Container from './Container'
import IGroupContainer from './interfaces/IGroupContainer'
import IContainer from './interfaces/IContainer'
import ISubGroup from './interfaces/ISubGroup'

// Param types for _go method
type GoFn = <H extends IHistory> (h:H) => H
type CanGoFn = <H extends IHistory> (h:H) => boolean

export default class Group implements Comparable, IContainer {
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

  private computeInterContainer(from:HistoryStack, to:HistoryStack,
                                fromDefault:boolean|null,
                                toDefault:boolean|null):HistoryStack {
    return !fromDefault && !toDefault && this.allowInterContainerHistory ?
      interContainerHistory.D_to_E(to, from, to) : to
  }
  
  private static computeDefault(h:HistoryStack, defaulT:HistoryStack|null,
                         from:HistoryStack, to:HistoryStack,
                         fromDefault:boolean|null, toDefault:boolean|null) {
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

  private static computeKeepFwd(h:HistoryStack, from:HistoryStack, to:HistoryStack) {
    if (from.lastVisited > 0) {
      return keepFwdTabBehavior.E_to_D(h, from, to)
    }
    else {
      return h
    }
  }
  
  computeHistory(from:IContainer, to:IContainer,
                 maintainFwd:boolean):HistoryStack {
    const defaulT:IGroupContainer|undefined = this.defaultContainer
    const fromHistory:HistoryStack = from.history
    const toHistory:HistoryStack = to.history
    const defaultHistory:HistoryStack|null = defaulT ? defaulT.history : null
    const h1:HistoryStack = this.computeInterContainer(
        fromHistory, toHistory, from.isDefault, to.isDefault)
    const h2:HistoryStack = Group.computeDefault(
        h1, defaultHistory, fromHistory, toHistory, from.isDefault, to.isDefault)
    return maintainFwd ? Group.computeKeepFwd(h2, fromHistory, toHistory) : h2
  }

  private static getSingleHistory(container:IGroupContainer, keepFwd:boolean) {
    if (container instanceof Group) {
      return container.getHistory(keepFwd)
    }
    else {
      return container.history
    }
  }

  getHistory(keepFwd:boolean=false) {
    const containers:IGroupContainer[] = this.containerStackOrder
    const defaultContainer:IGroupContainer|undefined = this.defaultContainer
    switch(containers.length) {
      case 0: throw new Error(`'${this.name}' has no containers`)
      case 1: {
        return defaultContainer ?
            Group.getSingleHistory(defaultContainer, keepFwd) :
            Group.getSingleHistory(containers[0], keepFwd)
      }
      default: {
        const visitedContainers = containers.filter(c => c.lastVisited > 0)
        switch (visitedContainers.length) {
          case 0: {
            return Group.getSingleHistory(containers[0], keepFwd)
          }
          case 1: {
            return Group.getSingleHistory(visitedContainers[0], keepFwd)
          }
          default: {
            const from: IGroupContainer = visitedContainers[1]
            const to: IGroupContainer = visitedContainers[0]
            return this.computeHistory(from, to, keepFwd)
          }
        }
      }
    }
  }

  activateContainer(containerName:string, time:number):Group {
    const from:IGroupContainer = this.activeContainer
    const to:IGroupContainer = this.getContainerByName(containerName)
    const group:Group = from.resetOnLeave && from.name !== to.name ?
        this.replaceContainer(from.top(time, true)) : this
    return group.replaceContainer(to.activate(time + 1))
  }

  get containerStackOrder():IGroupContainer[] {
    return R.sort((c1, c2) => c1.compareTo(c2), this.containers)
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

  activate(time:number):Group {
    return this.replaceContainer(this.activeContainer.activate(time))
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

  get activePage():Page {
    return this.activeContainer.activePage
  }

  getActiveUrlInContainer(containerName:string):string {
    return this.getActivePageInContainer(containerName).url
  }

  top(time:number, reset:boolean=false):Group {
    return this.replaceContainer(this.activeContainer.top(time, reset))
  }

  push(page:Page):Group {
    const {groupName, containerName} = page
    if (groupName === this.name) {
      const container:IGroupContainer = this.getContainerByName(containerName)
      return this.replaceContainer(container.push(page))
    }
    else {
      const group:ISubGroup|null = this.getNestedGroupByName(groupName)
      if (!group) {
        throw new Error('Group \'' + groupName + '\' not found in ' + this.name)
      }
      return this.replaceContainer(group.push(page))
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

  private _go(goFn:GoFn, canGoFn:CanGoFn, n:number, time:number):Group {
    if (n === 0) {
      return this.activate(time)
    }
    const next = (g:Group):Group => g._go(goFn, canGoFn, n - 1, time + 1)
    const container:IGroupContainer = this.activeContainer
    if (canGoFn(container)) {
      return next(this.replaceContainer(goFn(container).activate(time)))
    }
    else {
      if (canGoFn(this)) {
        const containerName:string = goFn(this.history).current.containerName
        if (this.hasContainerWithName(containerName)) {
          return next(this.activateContainer(containerName, time))
        }
        else {
          const g = this.getSubGroupHavingContainerWithName(containerName)
          return next(g.activateContainer(containerName, time))
        }
      }
      else {
        throw new Error('Cannot go ' + n + ' in that direction')
      }
    }
  }

  goForward(n:number=1, time):Group {
    return this._go(c => c.goForward(1, time), c => c.canGoForward(), n, time)
  }

  goBack(n:number=1, time):Group {
    return this._go(c => c.goBack(1, time), c => c.canGoBack(), n, time)
  }

  get backPage():Page {
    return this.history.backPage
  }

  get forwardPage():Page {
    return this.history.forwardPage
  }

  go(n:number=1, time):Group {
    return n > 0 ? this.goForward(n, time) : this.goBack(0 - n, time)
  }

  canGoBack(n:number=1):boolean {
    return this.history.canGoBack(n)
  }

  canGoForward(n:number=1):boolean {
    return this.history.canGoForward(n)
  }

  shiftTo(page:Page, time):Group {
    return this.go(this.getShiftAmount(page), time)
  }

  get subGroups():Group[] {
    return this.containers.filter((c:IGroupContainer) => c instanceof Group) as Group[]
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

  get firstVisited():number {
    return R.last(this.containerStackOrder).firstVisited
  }

  get lastVisited():number {
    return this.activeContainer.lastVisited
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

  compareTo(other:IContainer):number {
    if (other instanceof Group) {
      const otherContainer:IGroupContainer = other.activeContainer
      return otherContainer ? this.activeContainer.compareTo(otherContainer) : -1
    }
    else if (other instanceof Container) {
      return this.activeContainer.compareTo(other)
    }
    else {
      throw new Error('other should be a Group or Container, received: ' + other)
    }
  }

  get isGroup():boolean {
    return true
  }
}