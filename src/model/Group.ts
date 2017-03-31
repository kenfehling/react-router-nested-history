import Page from './Page'
import IHistory from './IHistory'
import Container from './Container'
import {VisitType} from './PageVisit'


export default class Group {
  readonly name: string
  readonly enabled: boolean
  readonly allowInterContainerHistory: boolean
  readonly resetOnLeave: boolean
  readonly gotoTopOnSelectActive: boolean
  readonly parentGroupName: string
  readonly isDefault: boolean  // Only applies if this has a parent group

  constructor({name, enabled=true, allowInterContainerHistory=false,resetOnLeave=false,
    gotoTopOnSelectActive=false, parentGroupName='', isDefault=false}:
      {name:string, enabled?:boolean, allowInterContainerHistory?:boolean,
        resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean,
        parentGroupName?:string, isDefault?:boolean}) {
    this.name = name
    this.enabled = enabled
    this.allowInterContainerHistory = allowInterContainerHistory
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
    this.parentGroupName = parentGroupName
    this.isDefault = isDefault
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

  push({page, time, type=VisitType.MANUAL}:
       {page: Page, time:number, type?:VisitType}):Group {
    const container:IContainer = this.getNestedContainerByName(page.container)
    const groupName:string = container.groupName
    if (groupName === this.name) {
      const newContainer = container.push({page, time, type}) as IContainer
      return this.replaceContainer(newContainer)
    }
    else {
      const group:ISubGroup|undefined = this.getNestedGroupByName(groupName)
      if (!group) {
        throw new Error('Group \'' + groupName + '\' not found in ' + this.name)
      }
      const newContainer = group.push({page, time, type}) as IContainer
      return this.setEnabled(true).replaceContainer(newContainer)
    }
  }

  shiftTo({page, time}:{page:Page, time}):Group {
    return this.go({n: this.getShiftAmount(page), time})
  }

  get wasManuallyVisited():boolean {
    const c = this.activeContainer
    return c ? c.wasManuallyVisited : false
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
}