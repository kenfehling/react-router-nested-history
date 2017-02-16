import Action from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Go extends Action {
  static readonly type: string = 'Go'
  readonly type: string = Go.type
  readonly n: number

  constructor({time, n}:{time?:number, n:number}) {
    super({time})
    this.n = n
  }

  reduce(state:IState):IState {
    return state.go(this.n, this.time)
  }
}