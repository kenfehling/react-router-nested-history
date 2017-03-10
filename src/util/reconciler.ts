import Page from '../model/Page'
import Step from '../model/Step'
import BackStep from '../model/steps/BackStep'
import * as R from 'ramda'
import PushStep from '../model/steps/PushStep'
import ReplaceStep from '../model/steps/ReplaceStep'
import GoStep from '../model/steps/GoStep'
import Pages, {HistoryStack} from '../model/Pages'

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
    same: ps1.pages.slice(0, i),
    removed: ps1.pages.slice(i),
    added: ps2.pages.slice(i),
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

export const diffHistoryToSteps = (h1:HistoryStack, h2:HistoryStack):Step[] => {
  const oldPages:Pages = new Pages(h1.flatten())
  const newPages:Pages = new Pages(h2.flatten())
  return R.compose(diffToSteps, diffHistory)(oldPages, newPages)
}
