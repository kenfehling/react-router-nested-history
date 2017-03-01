import IState from './IState'
import IContainer from './interfaces/IContainer'
import Page from './Page'
import Group from './Group'
import Container from './Container'
import HistoryStack from './HistoryStack'

const UNINITIALIZED_MESSAGE:string = 'State is uninitialized'

export default class UninitializedState extends IState {

  assign(obj:Object):IState {
    return new UninitializedState({...Object(this), ...obj})
  }

  switchToGroup({groupName, time}:{groupName:string, time:number}):IState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  switchToContainer({groupName, containerName, time}:
    {groupName:string, containerName:string, time:number}):IState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get backPage():Page {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get forwardPage():Page {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  go(n:number, time:number):IState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  goBack(n:number=1, time:number):IState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  goForward(n:number=1, time:number):IState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  canGoBack(n:number=1):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  canGoForward(n:number=1):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  top({groupName, time, reset=false}:
    {groupName?:string, time:number, reset?:boolean}):IState {
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

  push(page:Page):IState {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getContainerLinkUrl(groupName:string, containerName:string):string {
    return ''
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get groupStackOrder():Group[] {
    return []
  }

  /**
   * Gets the stack order values as an array of numbers,
   * in original group index order instead of stack order
   */
  get indexedGroupStackOrder():number[] {
    return []
  }

  getBackPageInGroup(groupName:string):Page {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getActiveContainerNameInGroup(groupName: string) {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getActiveContainerIndexInGroup(groupName:string):number {
    return 0
  }

  getActivePageInGroup(groupName:string):Page {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isGroupActive(groupName:string):boolean {
    return false
  }

  get activePage():Page {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isContainerActive(groupName:string, containerName:string):boolean {
    return false
  }

  get activeUrl():string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getActivePageInContainer(groupName:string, containerName:string):Page {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getActiveUrlInContainer(groupName:string, containerName:string):string {
    return ''
  }

  get activeGroup():Group {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get activeContainer():IContainer {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getContainer(groupName:string, containerName:string):Container {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getContainerNameByIndex(groupName:string, index:number):string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isActiveContainer(groupName:string, containerName:string):boolean {
    return false
  }

  getContainerStackOrderForGroup(groupName:string):IContainer[] {
    return []
  }

  getIndexedContainerStackOrderForGroup(groupName:string):number[] {
    return []
  }
}