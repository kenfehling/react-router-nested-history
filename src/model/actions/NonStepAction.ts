import Action from '../Action'
import IState from '../IState'
import Step from '../interfaces/Step'

abstract class NonStepAction extends Action {
  addSteps(steps: Step[], state: IState): Step[] {
    return steps  // just return original steps
  }
}

export default NonStepAction