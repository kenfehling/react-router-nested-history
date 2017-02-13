import Action from '../Action'
import State from '../State'
import Step from '../interfaces/Step'
import GoStep from '../steps/GoStep'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Go extends Action {
  readonly n: number

  constructor({time, n}:{time?:number, n:number}) {
    super({time})
    this.n = n
  }

  reduce(state:State):State {
    return state.go(this.n, this.time)
  }
}