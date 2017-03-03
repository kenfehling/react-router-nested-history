import Page from './Page'
import HistoryStack from './HistoryStack'
import Container from './Container'
import * as R from 'ramda'
import IContainer from './interfaces/IContainer'
import ISubGroup from './interfaces/ISubGroup'
import Group from './Group'
import PathTitle from './interfaces/PathTitle'

abstract class IState {
  readonly groups: Group[]
  readonly titles: PathTitle[]
  readonly zeroPage?: Page
  readonly lastUpdate: number
  readonly loadedFromRefresh: boolean
  readonly isOnZeroPage: boolean

  constructor({groups=[], zeroPage, lastUpdate=0,
    loadedFromRefresh=false, isOnZeroPage=false, titles=[]}:
    {groups?:Group[], zeroPage?:Page, lastUpdate?:number,
      loadedFromRefresh?:boolean, isOnZeroPage?:boolean, titles?:PathTitle[]}={}) {
    this.groups = groups
    this.zeroPage = zeroPage
    this.lastUpdate = lastUpdate
    this.loadedFromRefresh = loadedFromRefresh
    this.isOnZeroPage = isOnZeroPage
    this.titles = titles
  }

  abstract assign(obj:Object):IState
  abstract getContainerStackOrderForGroup(groupName:string):IContainer[]
  abstract switchToGroup({groupName, time}:{groupName:string, time:number}):IState

  abstract switchToContainer({groupName, name, time}:
      {groupName:string, name:string, time:number}):IState

  abstract getContainerLinkUrl(groupName:string, containerName:string):string
  abstract getRootGroupOfGroupByName(name:string):Group
  abstract getRootGroupOfGroup(group:Group):Group
  abstract push(page:Page):IState
  abstract get backPage():Page
  abstract get forwardPage():Page
  abstract go(n:number, time:number):IState
  abstract goBack(n:number, time:number):IState
  abstract goForward(n:number, time:number):IState
  abstract canGoBack(n:number):boolean
  abstract canGoForward(n:number):boolean
  abstract isContainerAtTopPage(groupName:string, containerName:string):boolean
  abstract top({groupName, containerName, time, reset}:
      {groupName:string, containerName:string,
        time:number, reset?:boolean}):IState

  abstract getShiftAmount(page:Page):number

  abstract containsPage(page:Page):boolean
  protected abstract getHistory(maintainFwd:boolean):HistoryStack
  abstract get groupStackOrder():Group[]
  abstract getBackPageInGroup(groupName:string)
  abstract getActiveContainerNameInGroup(groupName:string)
  abstract getActiveContainerIndexInGroup(groupName:string)
  abstract getActivePageInGroup(groupName:string):Page
  abstract getActiveUrlInGroup(groupName:string):string
  abstract urlMatchesGroup(url:string, groupName:string):boolean
  abstract get activePage():Page
  abstract isContainerActive(groupName:string, containerName:string):boolean
  abstract get activeUrl():string
  abstract getActivePageInContainer(groupName:string, containerName:string):Page
  abstract getActiveUrlInContainer(groupName:string, containerName:string):string
  abstract get activeGroup():Group
  abstract isGroupActive(groupName:string):boolean
  abstract get activeContainer():IContainer
  abstract getContainer(groupName:string, containerName:string):IContainer
  abstract isActiveContainer(groupName:string, containerName:string):boolean
  abstract getContainerNameByIndex(groupName:string, index:number):string

  replaceGroup(group:Group):IState {
    if (group.parentGroupName) {
      const parentGroup:Group = this.getGroupByName(group.parentGroupName)
      return this.replaceGroup(parentGroup.replaceContainer(group as ISubGroup))
    }
    else {
      const i:number = R.findIndex(g => g.name === group.name, this.groups)
      if (i === -1) {  // If group didn't already exist
        return this.assign({
          groups: [...this.groups, group]
        })
      }
      else {
        return this.assign({
          groups: [
            ...this.groups.slice(0, i),
            group,
            ...this.groups.slice(i + 1)
          ]
        })
      }
    }
  }

  addTopLevelGroup({name, resetOnLeave=false, gotoTopOnSelectActive=false}:
    {name:string, resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):IState {
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      parentGroupName: null,
      isDefault: null
    })
    return this.replaceGroup(group)
  }

  addSubGroup({name, parentGroupName, isDefault=false,
    resetOnLeave=false, gotoTopOnSelectActive=false}:
    {name:string, parentGroupName:string, isDefault:boolean,
      resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}):IState {
    const group:Group = new Group({
      name,
      resetOnLeave,
      gotoTopOnSelectActive,
      parentGroupName,
      isDefault
    })
    return this.replaceGroup(group)
  }

  addContainer({name, groupName, initialUrl, isDefault=false,
    resetOnLeave=false, patterns}:
    {name:string, groupName:string, initialUrl:string, patterns:string[],
      isDefault:boolean, resetOnLeave:boolean}):IState {
    const group:Group = this.getGroupByName(groupName)
    const container:Container = new Container({
      initialUrl,
      patterns,
      resetOnLeave,
      groupName,
      name,
      isDefault
    })
    return this.replaceGroup(group.replaceContainer(container))
  }

  getGroupByName(name:string):Group {
    const g:Group = R.find(g => g.name === name, this.groups)
    if (g) {
      return g
    }
    else {
      let foundGroup:ISubGroup|null = null
      this.groups.forEach((group:Group) => {
        const g = group.getNestedGroupByName(name)
        if (g) {
          foundGroup = g
          return
        }
      })
      if (foundGroup) {
        return foundGroup
      }
      else {
        throw new Error('Group \'' + name + '\' not found')
      }
    }
  }

  get browserHistory():HistoryStack {
    return this.getHistory(false)
  }

  get browserHistoryWithFwdMaintained():HistoryStack {
    return this.getHistory(true)
  }

  hasGroupWithName(name:string):boolean {
    try {
      this.getGroupByName(name)
      return true
    }
    catch (e) {
      return false
    }
  }

  getTitleForPath(pathname:string):string|null {
    const found = R.find(t => t.pathname === pathname, this.titles)
    return found ? found.title : null
  }

  hasTitleForPath(pathname:string):boolean {
    return !!this.getTitleForPath(pathname)
  }

  get activeTitle() {
    return this.getTitleForPath(this.activeUrl)
  }

  addTitle({pathname, title}:{pathname:string, title:string}):IState {
    const existingTitle = this.getTitleForPath(pathname)
    return existingTitle ? this :
      this.assign({titles: [...this.titles, {pathname, title}]})
  }


  /**
   * Gets the zero page, or if it's not set defaults to using
   * the initialUrl of the first container in the first group
   */
  getZeroPage():Page {
    return this.zeroPage || Page.createZeroPage(
        this.groups[0].containers[0].initialUrl)
  }
}

export default IState