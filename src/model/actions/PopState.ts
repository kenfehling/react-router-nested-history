import State from '../State'
import Step from '../Step'
import {diffPagesToSteps} from '../../util/reconciler'
import Action from '../Action'
import Serializable from '../../store/decorators/Serializable'
import VisitedPage from '../VisitedPage'
import {List} from 'immutable'

/**
 * The user used the browser's back or forward button to pop to another page
 * This action can be examined later to determine slide animation direction
 * (n < 0 = left, n > 0 = right)
 */
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
    return state.go({n: this.n, time: this.time})
  }

  addSteps(steps:Step[], state:State):Step[] {
    const newState:State = this.reduce(state)
    const h1 = newState.historyWithFwdMaintained
    if (h1.current.isZeroPage) {
      return steps
    }
    else {
      const h2 = newState.history
      const ps1 = List<VisitedPage>(h1.flatten())
      const ps2 = List<VisitedPage>(h2.flatten())
      return [...steps, ...diffPagesToSteps(ps1, ps2)]
    }
  }

}