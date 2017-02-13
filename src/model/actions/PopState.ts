import State from '../State'
import {Serializable} from '../../util/serializer'
import Step from '../interfaces/Step'
import PageAction from './PageAction'
import {diffHistoryToSteps} from '../../util/reconciler'

@Serializable
export default class PopState extends PageAction {

  reduce(state:State):State {
    return state.shiftTo(this.page, this.time)
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