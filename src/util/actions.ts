import Action from '../model/BaseAction'
import State from '../model/State'
import Step from '../model/Step'
import {deriveState} from '../store'
import UninitializedState from '../model/UninitializedState'

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
  const oldState:State = deriveState(oldActions, new UninitializedState())
  const initial:StepState = {steps: [], state: oldState}
  return newActions.reduce(actionSteps, initial).steps
}