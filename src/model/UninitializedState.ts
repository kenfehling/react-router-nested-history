import State from './State'
import IContainer from './IContainer'
import Page from './Page'
import Group from './Group'
import Pages, {HistoryStack} from './Pages'
import InitializedState from './InitializedState'
import VisitedPage from './VistedPage'
import {List} from 'immutable'
import {PartialComputedState} from './ComputedState'

const UNINITIALIZED_MESSAGE:string = 'State is uninitialized'

export default class UninitializedState extends State {

  computeState():PartialComputedState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  load({url, time}:{url: string, time: number}):InitializedState {
    return new InitializedState({
      ...Object(this),
      containers: this.containers.map(c => c.load({url, time}))
    })
  }

  assign(obj:Object):State {
    return new UninitializedState({...Object(this), ...obj})
  }

  get isInitialized():boolean {
    return false
  }

  switchToGroup({name, time}:{name:string, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  switchToContainer({name, time}: { name: string, time: number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  openWindowAtIndex({groupName, index, time}:{groupName:string, index:number, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  openWindowForName({name, time}:{name:string, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  closeWindow({forName, time}:{forName:string, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  go({n, time, container}:{n:number, time:number, container?:string}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  back({n=1, time, container}:{n:number, time:number, container?:string}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  forward({n=1, time, container}:{n:number, time:number, container?:string}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isContainerAtTopPage(containerName:string):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  top({time, reset=false}:
      {containerName:string, time:number, reset?:boolean}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getShiftAmount(page:Page):number {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  containsPage(page:Page):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getRootGroupOfGroupByName(name:string):Group {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getRootGroupOfGroup(group:Group):Group {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  push({page, time}:{page:Page, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get groupStackOrder():Group[] {
    return []
  }

  getGroupBackPage(groupName:string):Page|undefined {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getActiveContainerNameInGroup(groupName: string) {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getActiveContainerIndexInGroup(groupName:string):number {
    return 0
  }

  getActiveUrlInGroup(groupName:string):string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isGroupActive(groupName:string):boolean {
    return false
  }

  get activePage():VisitedPage {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isContainerActiveAndEnabled(container:string):boolean {
    return false
  }

  get activeUrl():string {
    return ''
  }

  getContainerActivePage(container:string):VisitedPage {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getContainerActiveUrl(container:string):string {
    return ''
  }

  getContainerNameByIndex(groupName:string, index:number):string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getContainerStackOrderForGroup(groupName:string):List<IContainer> {
    return []
  }
}