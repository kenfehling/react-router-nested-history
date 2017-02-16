import Page from '../model/Page'
import HistoryStack from '../model/HistoryStack'
import Step from '../model/interfaces/Step'
import BackStep from '../model/steps/BackStep'
import * as R from 'ramda'
import PushStep from '../model/steps/PushStep'
import IState from '../model/IState'
import HistoryDiff from '../model/HistoryDiff'
import ReplaceStep from '../model/steps/ReplaceStep'
import GoStep from '../model/steps/GoStep'
import UninitializedState from '../model/UninitializedState'

const getFirstDifferenceIndex = (ps1:Page[], ps2:Page[]):number => {
  const n:number = Math.min(ps1.length, ps2.length)
  for (let i = 0; i < n; i++) {
    if (!ps1[i].equals(ps2[i])) {
      return i
    }
  }
  return n
}

export const diffHistory = (h1:HistoryStack|null, h2:HistoryStack):HistoryDiff => {
  const ps1:Page[] = h1 ? h1.flatten() : []
  const ps2:Page[] = h2.flatten()
  const i:number = getFirstDifferenceIndex(ps1, ps2)
  return new HistoryDiff({
    same: ps1.slice(0, i),
    removed: ps1.slice(i),
    added: ps2.slice(i),
    oldCurrentIndex: h1 ? h1.index : 0,
    newCurrentIndex: h2 ? h2.index : 0
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

export const diffHistoryToSteps:(h1:HistoryStack|null, h2:HistoryStack) => Step[] =
    R.compose(diffToSteps, diffHistory)

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {IState} The original historyStore state
 * @param newState {IState} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffStateToSteps = (oldState:IState, newState:IState):Step[] => {
  if (newState instanceof UninitializedState) {
    return []
  }
  const h2:HistoryStack = newState.browserHistory
  if (oldState instanceof UninitializedState) {
    return diffHistoryToSteps(null, h2)
  }
  const h1:HistoryStack = oldState.browserHistory
  return diffHistoryToSteps(h1, h2)
}