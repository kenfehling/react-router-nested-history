import IState from '../IState'
import {Serializable} from '../../util/serializer'
import NonStepAction from './NonStepAction'

@Serializable
export default class CreateGroup extends NonStepAction {
  static readonly type: string = 'CreateGroup'
  readonly type: string = CreateGroup.type
  readonly name: string
  readonly parentGroupName: string|null
  readonly parentUsesDefault: boolean|null
  readonly resetOnLeave: boolean
  readonly gotoTopOnSelectActive: boolean

  constructor({time, name, parentGroupName=null,
    parentUsesDefault=parentGroupName?true:null,
    resetOnLeave=false, gotoTopOnSelectActive=false}:
    {time?:number, name:string, parentGroupName?:null, parentUsesDefault?:null,
      resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}|
    {time?:number, name:string, parentGroupName:string, parentUsesDefault:boolean,
      resetOnLeave?:boolean, gotoTopOnSelectActive?:boolean}) {
    super({time})
    this.name = name
    this.parentGroupName = parentGroupName
    this.parentUsesDefault = parentUsesDefault
    this.resetOnLeave = resetOnLeave
    this.gotoTopOnSelectActive = gotoTopOnSelectActive
  }

  reduce(state:IState):IState {
    if (this.parentGroupName && this.parentUsesDefault != null) {
      return state.addSubGroup({
        name: this.name,
        parentGroupName: this.parentGroupName,
        parentUsesDefault: this.parentUsesDefault,
        resetOnLeave: this.resetOnLeave,
        gotoTopOnSelectActive: this.gotoTopOnSelectActive
      })
    }
    else {
      return state.addTopLevelGroup({
        name: this.name,
        resetOnLeave: this.resetOnLeave,
        gotoTopOnSelectActive: this.gotoTopOnSelectActive
      })
    }
  }
}
