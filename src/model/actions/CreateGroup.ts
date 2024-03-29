import State from '../State'
import NonStepAction from './NonStepAction'
import {SYSTEM} from '../Action'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class CreateGroup extends NonStepAction {
  static readonly type: string = 'CreateGroup'
  readonly type: string = CreateGroup.type
  readonly name: string
  readonly parentGroup: string|undefined
  readonly isDefault: boolean|undefined
  readonly resetOnLeave: boolean
  readonly allowInterContainerHistory: boolean
  readonly gotoTopOnSelectActive: boolean

  constructor({time, name, allowInterContainerHistory=false,
    parentGroup=undefined, isDefault=parentGroup?false:undefined,
    resetOnLeave=false, gotoTopOnSelectActive=false}:
    {time?:number, name:string, parentGroup?:undefined, isDefault?:undefined,
      resetOnLeave?:boolean, allowInterContainerHistory?:boolean,
      gotoTopOnSelectActive?:boolean}|
    {time?:number, name:string, parentGroup:string, isDefault:boolean,
      resetOnLeave?:boolean, allowInterContainerHistory?:boolean,
      gotoTopOnSelectActive?:boolean}) {
    super({time, origin: SYSTEM})
    this.name = name
    this.parentGroup = parentGroup
    this.isDefault = isDefault
    this.allowInterContainerHistory = allowInterContainerHistory
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
  }

  /* @ts-ignore */
  reduce(state:State):State {
    if (this.parentGroup && this.isDefault != null) {
      return state.addSubGroup({
        name: this.name,
        parentGroup: this.parentGroup,
        isDefault: this.isDefault,
        resetOnLeave: this.resetOnLeave,
        allowInterContainerHistory: this.allowInterContainerHistory,
        gotoTopOnSelectActive: this.gotoTopOnSelectActive
      })
    }
    else {
      return state.addTopLevelGroup({
        name: this.name,
        resetOnLeave: this.resetOnLeave,
        allowInterContainerHistory: this.allowInterContainerHistory,
        gotoTopOnSelectActive: this.gotoTopOnSelectActive
      })
    }
  }

  /*
  filter(state:State):Action[] {
    return state.loadedFromRefresh ? [] : [this]
  }
  */
}
