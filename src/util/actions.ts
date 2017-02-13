import Action from '../model/Action'
import State from '../model/State'
import Step from '../model/interfaces/Step'
import store from '../store'

type StepState = {steps:Step[], state:State}

function actionSteps({steps, state}:StepState, action:Action):StepState {
  return {
    steps: action.addSteps(steps, state),
    state: action.reduce(state)
  }
}

export function createStepsSince(actions:Action[], time:number):Step[] {
  const oldActions:Action[] = actions.filter(a => a.time <= time)
  const newActions:Action[] = actions.filter(a => a.time > time)
  const oldState:State = store.deriveState(oldActions)
  const initial:StepState = {steps: [], state: oldState}
  return newActions.reduce(actionSteps, initial).steps
}