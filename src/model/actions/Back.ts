import Action from '../Action'
import State from '../State'
import Step from '../interfaces/Step'
import BackStep from '../steps/BackStep'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Back extends Action {
  readonly n: number

  constructor({time, n=1}:{time?:number, n?:number}={}) {
    super({time})
    this.n = n
  }

  reduce(state:State):State {
    return state.goBack(this.n, this.time)
  }
}