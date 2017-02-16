import IState from '../IState'
import {Serializable} from '../../util/serializer'
import Step from '../interfaces/Step'
import PageAction from './PageAction'
import {diffHistoryToSteps} from '../../util/reconciler'

@Serializable
export default class PopState extends PageAction {
  static readonly type: string = 'PopState'
  readonly type: string = PopState.type

  reduce(state:IState):IState {
    return state.shiftTo(this.page, this.time)
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