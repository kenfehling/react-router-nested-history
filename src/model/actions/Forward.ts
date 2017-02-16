import Action from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Forward extends Action {
  static readonly type: string = 'Forward'
  readonly type: string = Forward.type
  readonly n: number

  constructor({time, n=1}:{time?:number, n?:number}={}) {
    super({time})
    this.n = n
  }

  reduce(state:IState):IState {
    return state.goForward(this.n, this.time)
  }
}