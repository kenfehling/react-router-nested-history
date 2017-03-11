import Page from '../model/Page'
import Step from '../model/Step'
import BackStep from '../model/steps/BackStep'
import * as R from 'ramda'
import PushStep from '../model/steps/PushStep'
import ReplaceStep from '../model/steps/ReplaceStep'
import GoStep from '../model/steps/GoStep'
import Pages from '../model/Pages'
import UninitializedState from '../model/UninitializedState'
import {deriveState} from '../store/store'
import State from '../model/State'
import Action from '../model/BaseAction'

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

export class HistoryDiff {
  readonly same: Page[]
  readonly removed: Page[]
  readonly added: Page[]
  readonly oldCurrentIndex: number
  readonly newCurrentIndex: number

  constructor({same=[], removed=[], added=[], oldCurrentIndex, newCurrentIndex}:
    {same?:Page[], removed?:Page[], added?:Page[],
      oldCurrentIndex:number, newCurrentIndex:number}) {
    this.same = same
    this.removed = removed
    this.added = added
    this.oldCurrentIndex = oldCurrentIndex
    this.newCurrentIndex = newCurrentIndex
  }

  get oldIndexFromEnd():number {
    return this.same.length + this.removed.length - 1 - this.oldCurrentIndex
  }

  get newIndexFromEnd():number {
    return this.same.length + this.added.length - 1 - this.newCurrentIndex
  }

  get indexDelta():number {
    return this.newCurrentIndex - this.oldCurrentIndex
  }
}

const getFirstDifferenceIndex = (ps1:Pages, ps2:Pages):number => {
  const n:number = Math.min(ps1.length, ps2.length)
  for (let i = 0; i < n; i++) {
    if (!ps1.pages[i].equals(ps2.pages[i])) {
      return i
    }
  }
  return n
}

export const diffHistory = (ps1:Pages, ps2:Pages):HistoryDiff => {
  const i:number = getFirstDifferenceIndex(ps1, ps2)
  return new HistoryDiff({
    same: ps1.pages.slice(0, i).map(p => new Page(p)),  // map from VisitedPage
    removed: ps1.pages.slice(i).map(p => new Page(p)),  // to plain Page
    added: ps2.pages.slice(i).map(p => new Page(p)),
    oldCurrentIndex: ps1.activeIndex,
    newCurrentIndex: ps2.activeIndex
  })
}

const addStep = (p:Page):Step => new (p.isZeroPage ? ReplaceStep : PushStep)(p)

export const diffToSteps = (diff:HistoryDiff):Step[] => {
  const addSteps:Step[] = diff.added.map(addStep)
  if (diff.removed.length > 0) {
    const newIndexFromEnd:number = diff.newIndexFromEnd
    if (addSteps.length === 0) {  // It needs to remove forward history
      if (diff.same.length === 0) {
        throw new Error('diff.same is empty')
      }
      const extraAddStep:Step = addStep(R.last(diff.same))
      if(newIndexFromEnd > 0) {
        return [extraAddStep, new BackStep(newIndexFromEnd)]
      }
      else {
        return [new BackStep(), extraAddStep]
      }
    }
    else {
      const backAmount:number = diff.removed.length - diff.oldIndexFromEnd
      let steps:Step[] = backAmount > 0 ? [new BackStep(backAmount)] : []
      steps = [...steps, ...addSteps]
      if (newIndexFromEnd > 0) {
        steps = [...steps, new BackStep(newIndexFromEnd)]
      }
      return steps
    }
  }
  else {
    if (addSteps.length === 0 && diff.indexDelta !== 0) {
      return [new GoStep(diff.indexDelta)]
    }
    else {
      return addSteps
    }
  }
}

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {State} The original historyStore state
 * @param newState {State} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffPagesToSteps:(ps1:Pages, ps2:Pages) => Step[] =
    R.compose(diffToSteps, diffHistory)