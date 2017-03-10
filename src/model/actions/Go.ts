import Action from '../BaseAction'
import State from '../State'
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

  reduce(state:State):State {
    return state.go(this.n, this.time)
  }
}