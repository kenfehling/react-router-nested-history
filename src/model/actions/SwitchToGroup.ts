import Action from '../Action'
import State from '../State'
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

  reduce(state:State):State {
    return state.switchToGroup({
      groupName: this.groupName,
      time: this.time
    })
  }
}