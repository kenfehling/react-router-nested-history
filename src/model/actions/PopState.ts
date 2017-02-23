import IState from '../IState'
import {Serializable} from '../../util/serializer'
import Step from '../interfaces/Step'
import {diffHistoryToSteps} from '../../util/reconciler'
import Page from '../Page'
import Action from '../Action'

@Serializable
export default class PopState extends Action {
  static readonly type: string = 'PopState'
  readonly type: string = PopState.type
  readonly n: number

  constructor({time, n}:{time?: number, n:number}) {
    super({time})
    this.n = n
  }

  reduce(state:IState):IState {
    return state.go(this.n, this.time)
  }

  addSteps(steps:Step[], state:IState):Step[] {
    const newState:IState = this.reduce(state)
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