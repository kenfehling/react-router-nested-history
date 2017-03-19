import Action from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Forward extends Action {
  static readonly type: string = 'Forward'
  readonly type: string = Forward.type
  readonly n: number

  constructor({time, n=1}:{time?:number, n?:number}={}) {
    super({time})
    this.n = n
  }

  reduce(state:State):State {
    return state.forward(this.n, this.time)
  }
}