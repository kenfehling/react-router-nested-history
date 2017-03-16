import State from '../State'
import Step from '../Step'
import {diffPagesToSteps} from '../../util/reconciler'
import Action from '../BaseAction'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class PopState extends Action {
  static readonly type: string = 'PopState'
  readonly type: string = PopState.type
  readonly n: number

  constructor({time, n}:{time?: number, n:number}) {
    super({time})
    this.n = n
  }

  reduce(state:State):State {
    return state.go(this.n, this.time)
  }

  addSteps(steps:Step[], state:State):Step[] {
    const newState:State = this.reduce(state)
    const h1 = newState.historyWithFwdMaintained
    if (h1.current.isZeroPage) {
      return steps
    }
    else {
      const h2 = newState.history
      return [...steps, ...diffPagesToSteps(h1.toPages(), h2.toPages())]
    }
  }

}