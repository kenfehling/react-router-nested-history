import IContainer from './IContainer'

export default class Group implements IContainer {
  readonly name: string
  readonly allowInterContainerHistory: boolean
  readonly resetOnLeave: boolean
  readonly gotoTopOnSelectActive: boolean
  readonly group: string|undefined  // Parent group (if any)
  readonly isDefault: boolean  // Only applies if this has a parent group

  constructor({name, allowInterContainerHistory=false,resetOnLeave=false,
    gotoTopOnSelectActive=false, parentGroup, isDefault=false}:
      {name:string, allowInterContainerHistory?:boolean,
        resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean,
        parentGroup?:string, isDefault?:boolean}) {
    this.name = name
    this.allowInterContainerHistory = allowInterContainerHistory
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
    this.group = parentGroup
    this.isDefault = isDefault
  }

  get isGroup():boolean {
    return true
  }

  /*
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
  */
}