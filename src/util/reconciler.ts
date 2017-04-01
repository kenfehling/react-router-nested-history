import Page from '../model/Page'
import Step from '../model/Step'
import BackStep from '../model/steps/BackStep'
import PushStep from '../model/steps/PushStep'
import ReplaceStep from '../model/steps/ReplaceStep'
import State from '../model/State'
import Action from '../model/BaseAction'
import VisitedPage from '../model/VistedPage'
import GoStep from '../model/steps/GoStep'
import {List, OrderedSet} from 'immutable'
import * as pageUtils from './pages'

type StepState = {steps:Step[], state:State}

function actionSteps({steps, state}:StepState, action:Action):StepState {
  return {
    steps: action.addSteps(steps, state),
    state: action.reduce(state)
  }
}

export function createSteps(oldState:State, newActions:Action[]):Step[] {
  const initial:StepState = {steps: [], state: oldState}
  return newActions.reduce(actionSteps, initial).steps
}

enum DiffType {
  SAME = 0,
  ADDED=1,
  REMOVED=-1
}

interface DiffedPage {
  page: Page
  type: DiffType
}

interface PagesDiff {
  diffedPages: DiffedPage[]
  same: VisitedPage[]
  added: VisitedPage[]
  removed: VisitedPage[]
  start: number  // first difference
}

const getFirstDifferenceIndex = (ps1:List<VisitedPage>, ps2:List<VisitedPage>):number => {
  const n:number = Math.min(ps1.size, ps2.size)
  for (let i = 0; i < n; i++) {
    if (!ps1[i].equals(ps2[i])) {
      return i
    }
  }
  return n
}

const diffPages = (p1:List<VisitedPage>, p2:List<VisitedPage>):PagesDiff => {
  const ps1:OrderedSet<VisitedPage> = p1.toOrderedSet()
  const ps2:OrderedSet<VisitedPage> = p2.toOrderedSet()
  const same = ps1.intersect(ps2)
  const removed = ps1.subtract(ps2)
  const added = ps2.subtract(ps1)
  const merged = ps1.concat(ps2)
  const diffedPages = merged.map((page:VisitedPage) => {
    if (same.contains(page)) {
      return {page, type: DiffType.SAME}
    }
    else if (removed.contains(page)) {
      return {page, type: DiffType.REMOVED}
    }
    else if (added.contains(page)) {
      return {page, type: DiffType.ADDED}
    }
    else {
      throw new Error('Page not found in any set')
    }
  })
  return {
    same: same.toArray(),
    removed: removed.toArray(),
    added: added.toArray(),
    diffedPages: diffedPages.toArray(),
    start: getFirstDifferenceIndex(p1, p2)
  }
}

const pushStep = (p:VisitedPage):PushStep =>
    new (p.isZeroPage ? ReplaceStep : PushStep)(p.toPage())

const backSteps = (amount:number):BackStep[] =>
    amount > 0 ? [new BackStep(amount)] : []


/**
 * Get the difference between old pages and new pages and return a list of
 * browser steps to transform the browser history
 * @param ps1 {List<VisitedPage>} The original pages
 * @param ps2 {List<VisitedPage>} The new pages
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffPagesToSteps = (ps1:List<VisitedPage>, ps2:List<VisitedPage>):Step[] => {
  const diff:PagesDiff = diffPages(ps1, ps2)
  const oldActiveIndex:number = pageUtils.getActiveIndex(ps1)
  const newActiveIndex:number = pageUtils.getActiveIndex(ps2)
  const simple = ():Step[] => {
    if (diff.added.length > 0) {
      const pushes:Step[] = diff.added.map(pushStep)
      const backs:Step[] = backSteps(ps2.size - 1 - newActiveIndex)
      return [...pushes, ...backs]
    }
    else {
      const indexDelta = newActiveIndex - oldActiveIndex
      return indexDelta !== 0 ? [new GoStep(indexDelta)] : []
    }
  }
  const complex = ():Step[] => {
    const cleanWipe = ():Step[] => {
      const backs1:Step[] = backSteps(oldActiveIndex - diff.start + 1)
      const pushes:Step[] = ps2.toArray().slice(diff.start).map(pushStep)
      const backs2:Step[] = backSteps(ps2.size - 1 - newActiveIndex)
      return [...backs1, ...pushes, ...backs2]
    }

    const removeFwdHistory = ():Step[] => {
      return [...backSteps(1), pushStep(pageUtils.getActivePage(ps2))]
    }
    return diff.start === ps2.size ? removeFwdHistory() : cleanWipe()
  }
  return diff.start === ps1.size ? simple() : complex()
}