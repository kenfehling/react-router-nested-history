import Action from '../model/Action'
import IState from '../model/IState'
import Step from '../model/interfaces/Step'
import {deriveState} from '../store'

type StepState = {steps:Step[], state:IState}

function actionSteps({steps, state}:StepState, action:Action):StepState {
  return {
    steps: action.addSteps(steps, state),
    state: action.reduce(state)
  }
}

export function createStepsSince(actions:Action[], time:number):Step[] {
  const oldActions:Action[] = actions.filter(a => a.time <= time)
  const newActions:Action[] = actions.filter(a => a.time > time)
  const oldState:IState = deriveState(oldActions)
  const initial:StepState = {steps: [], state: oldState}
  return newActions.reduce(actionSteps, initial).steps
}