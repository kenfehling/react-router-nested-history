import Action, {Origin} from '../Action'
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

  /* @ts-ignore */
  reduce(state:State):State {
    return state.switchToGroup({
      name: this.name,
      time: this.time
    })
  }

  /* @ts-ignore */
  filter(state:State):Action[] {
    return state.isGroupActive(this.name) ? [] : [this] as Action[];
  }
}