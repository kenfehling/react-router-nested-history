import Action from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class SwitchToGroup extends Action {
  static readonly type: string = 'SwitchToGroup'
  readonly type: string = SwitchToGroup.type
  readonly groupName: string

  constructor({time, groupName}:{time?:number, groupName:string}) {
    super({time})
    this.groupName = groupName
  }

  reduce(state:IState):IState {
    return state.switchToGroup({
      groupName: this.groupName,
      time: this.time
    })
  }
}