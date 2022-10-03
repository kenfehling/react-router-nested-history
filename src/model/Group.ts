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
}
