import State from './State'
import IContainer from './IContainer'
import Page from './Page'
import Group from './Group'
import Pages, {HistoryStack} from './Pages'

const UNINITIALIZED_MESSAGE:string = 'State is uninitialized'

export default class UninitializedState extends State {

  get pages():Pages {
    return new Pages()
  }

  assign(obj:Object):State {
    return new UninitializedState({...Object(this), ...obj})
  }

  get lastActionType():string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  switchToGroup({groupName, time}:{groupName:string, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  switchToContainer({groupName, name, time}:
    {groupName:string, name:string, time:number}):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  go(n:number, time:number):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  back(n:number=1, time:number):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  forward(n:number=1, time:number):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  canGoBack(n:number=1):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  canGoForward(n:number=1):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  isContainerAtTopPage(groupName:string, containerName:string):boolean {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  top({groupName, time, reset=false}:
      {groupName:string, containerName:string, time:number,
        reset?:boolean}):State {
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

  push(page:Page, time:number):State {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  protected getHistory(maintainFwd:boolean=false):HistoryStack {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get groupStackOrder():Group[] {
    return []
  }

  getBackPageInGroup(groupName:string):Page|undefined {
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

  getActiveUrlInGroup(groupName:string):string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  urlMatchesGroup(url:string, groupName:string):boolean {
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

  get activeGroupName():string {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  get activeContainer():IContainer {
    throw new Error(UNINITIALIZED_MESSAGE)
  }

  getContainer(groupName:string, containerName:string):IContainer {
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
}