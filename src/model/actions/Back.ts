import Action from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Back extends Action {
  static readonly type: string = 'Back'
  readonly type: string = Back.type
  readonly n: number

  constructor({time, n=1}:{time?:number, n?:number}={}) {
    super({time})
    this.n = n
  }

  reduce(state:State):State {
    return state.back(this.n, this.time)
  }
}