import Action, {Origin} from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class SwitchToGroup extends Action {
  static readonly type: string = 'SwitchToGroup'
  readonly type: string = SwitchToGroup.type
  readonly groupName: string

  constructor({time, origin, groupName}:
              {time?:number, origin?:Origin, groupName:string}) {
    super({time, origin})
    this.groupName = groupName
  }

  reduce(state:IState):IState {
    return state.switchToGroup({
      groupName: this.groupName,
      time: this.time
    })
  }

  filter(state:IState):Action[] {
    return state.isGroupActive(this.groupName) ? [] : [this]
  }
}