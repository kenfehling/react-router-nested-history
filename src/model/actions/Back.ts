import Action from '../Action'
import State from '../State'
import {Serializable} from '../../util/serializer'

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
    return state.goBack(this.n, this.time)
  }
}