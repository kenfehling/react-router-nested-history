import IState from '../IState'
import {Serializable} from '../../util/serializer'
import NonStepAction from './NonStepAction'
import Action, {SYSTEM} from '../Action'

@Serializable
export default class CreateGroup extends NonStepAction {
  static readonly type: string = 'CreateGroup'
  readonly type: string = CreateGroup.type
  readonly name: string
  readonly parentGroupName: string|undefined
  readonly isDefault: boolean|undefined
  readonly resetOnLeave: boolean
  readonly allowInterContainerHistory: boolean
  readonly gotoTopOnSelectActive: boolean

  constructor({time, name, allowInterContainerHistory=false,
    parentGroupName=undefined, isDefault=parentGroupName?true:undefined,
    resetOnLeave=false, gotoTopOnSelectActive=false}:
    {time?:number, name:string, parentGroupName?:undefined, isDefault?:undefined,
      resetOnLeave?:boolean, allowInterContainerHistory?:boolean,
      gotoTopOnSelectActive?:boolean}|
    {time?:number, name:string, parentGroupName:string, isDefault:boolean,
      resetOnLeave?:boolean, allowInterContainerHistory?:boolean,
      gotoTopOnSelectActive?:boolean}) {
    super({time, origin: SYSTEM})
    this.name = name
    this.parentGroupName = parentGroupName
    this.isDefault = isDefault
    this.allowInterContainerHistory = allowInterContainerHistory
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
  }

  reduce(state:IState):IState {
    if (this.parentGroupName && this.isDefault != null) {
      return state.addSubGroup({
        name: this.name,
        parentGroupName: this.parentGroupName,
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

  filter(state:IState):Action[] {
    return state.hasGroupWithName(this.name) ? [] : [this]
  }
}
