import Action from '../BaseAction'
import State from '../State'
import Step from '../Step'

abstract class NonStepAction extends Action {
  addSteps(steps: Step[], state: State): Step[] {
    return steps  // just return original steps
  }
}

export default NonStepAction