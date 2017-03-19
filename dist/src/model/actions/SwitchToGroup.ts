import Action, {Origin} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

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

  reduce(state:State):State {
    return state.switchToGroup({
      groupName: this.groupName,
      time: this.time
    })
  }

  filter(state:State):Action[] {
    return state.isGroupActive(this.groupName) ? [] : [this]
  }
}