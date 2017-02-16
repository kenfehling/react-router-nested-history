import IState from './IState'
import IContainer from './interfaces/IContainer'
import Page from './Page'
import Group from './Group'
import Container from './Container'
import HistoryStack from './HistoryStack'

export default class UninitializedState extends IState {

  assign(obj:Object):IState {
    return new UninitializedState({...Object(this), ...obj})
  }

  switchToGroup({groupName, time}:{groupName:string, time:number}):IState {
    throw new Error('State is uninitialized')
  }

  switchToContainer({groupName, containerName, time}:
    {groupName:string, containerName:string, time:number}):IState {
    throw new Error('State is uninitialized')
  }

  get backPage():Page {
    throw new Error('State is uninitialized')
  }

  get forwardPage():Page {
    throw new Error('State is uninitialized')
  }

  go(n:number, time:number):IState {
    throw new Error('State is uninitialized')
  }

  goBack(n:number=1, time:number):IState {
    throw new Error('State is uninitialized')
  }

  goForward(n:number=1, time:number):IState {
    throw new Error('State is uninitialized')
  }

  canGoBack(n:number=1):boolean {
    throw new Error('State is uninitialized')
  }

  canGoForward(n:number=1):boolean {
    throw new Error('State is uninitialized')
  }

  top({groupName, time, reset=false}:
    {groupName?:string, time:number, reset?:boolean}):IState {
    throw new Error('State is uninitialized')
  }

  getShiftAmount(page:Page):number {
    throw new Error('State is uninitialized')
  }

  shiftTo(page:Page, time:number):IState {
    throw new Error('State is uninitialized')
  }

  containsPage(page:Page):boolean {
    throw new Error('State is uninitialized')
  }

  getRootGroupOfGroupByName(name:string):Group {
    throw new Error('State is uninitialized')
  }

  getRootGroupOfGroup(group:Group):Group {
    throw new Error('State is uninitialized')
  }

  push(page:Page):IState {
    throw new Error('State is uninitialized')
  }

  getContainerLinkUrl(groupName:string, containerName:string):string {
    return ''
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    throw new Error('State is uninitialized')
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

  getActiveContainerNameInGroup(groupName: string) {
    throw new Error('State is uninitialized')
  }

  getActiveContainerIndexInGroup(groupName:string):number {
    return 0
  }

  getActivePageInGroup(groupName:string):Page {
    throw new Error('State is uninitialized')
  }

  get activePage():Page {
    throw new Error('State is uninitialized')
  }

  isContainerActive(groupName:string, containerName:string):boolean {
    return false
  }

  get activeUrl():string {
    throw new Error('State is uninitialized')
  }

  getActivePageInContainer(groupName:string, containerName:string):Page {
    throw new Error('State is uninitialized')
  }

  getActiveUrlInContainer(groupName:string, containerName:string):string {
    return ''
  }

  get activeGroup():Group {
    throw new Error('State is uninitialized')
  }

  get activeGroupName():string {
    throw new Error('State is uninitialized')
  }

  get activeContainer():IContainer {
    throw new Error('State is uninitialized')
  }

  getContainer(groupName:string, containerName:string):Container {
    throw new Error('State is uninitialized')
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