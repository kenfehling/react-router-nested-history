import Action from '../Action'
import State from '../State'
import ForwardStep from '../steps/ForwardStep'
import Step from '../interfaces/Step'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Forward extends Action {
  readonly n: number

  constructor({time, n=1}:{time?:number, n?:number}={}) {
    super({time})
    this.n = n
  }

  reduce(state:State):State {
    return state.goForward(this.n, this.time)
  }
}