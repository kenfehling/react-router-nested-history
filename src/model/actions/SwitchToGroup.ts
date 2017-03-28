import Action, {Origin} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class SwitchToGroup extends Action {
  static readonly type: string = 'SwitchToGroup'
  readonly type: string = SwitchToGroup.type
  readonly name: string

  constructor({time, origin, name}:
              {time?:number, origin?:Origin, name:string}) {
    super({time, origin})
    this.name = name
  }

  reduce(state:State):State {
    return state.switchToGroup({
      name: this.name,
      time: this.time
    })
  }

  filter(state:State):Action[] {
    return state.isGroupActive(this.name) ? [] : [this]
  }
}