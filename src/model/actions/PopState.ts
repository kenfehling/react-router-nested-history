import State from '../State'
import Step from '../Step'
import {diffHistoryToSteps} from '../../util/reconciler'
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
    const h1 = newState.browserHistoryWithFwdMaintained
    if (h1.current.isZeroPage) {
      return steps
    }
    else {
      const h2 = newState.browserHistory
      return [...steps, ...diffHistoryToSteps(h1, h2)]
    }
  }

}