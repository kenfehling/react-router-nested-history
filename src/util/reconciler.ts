import Page from '../model/Page'
import Step from '../model/Step'
import BackStep from '../model/steps/BackStep'
import * as R from 'ramda'
import PushStep from '../model/steps/PushStep'
import ReplaceStep from '../model/steps/ReplaceStep'
import Pages from '../model/Pages'
import State from '../model/State'
import Action from '../model/BaseAction'
import VisitedPage from '../model/VistedPage'
import GoStep from '../model/steps/GoStep'

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

const getFirstDifferenceIndex = (ps1:Pages, ps2:Pages):number => {
  const n:number = Math.min(ps1.length, ps2.length)
  for (let i = 0; i < n; i++) {
    if (!ps1.pages[i].equals(ps2.pages[i])) {
      return i
    }
  }
  return n
}

const contains = (pages:Page[], page:Page) => R.any(p => p.equals(page), pages)

const merge = (ps1:VisitedPage[], ps2:VisitedPage[]):Page[] => {
  const merged = R.union(ps1, ps2)
  return R.uniqWith((p1, p2) => p1.equals(p2), merged)
}

const diffPages = (ps1:Pages, ps2:Pages):PagesDiff => {
  const same = R.intersection(ps1.pages, ps2.pages)
  const removed = R.difference(ps1.pages, ps2.pages)
  const added = R.difference(ps2.pages, ps1.pages)
  const merged = merge(ps1.pages, ps2.pages)
  const diffedPages = merged.map(page => {
    if (contains(same, page)) {
      return {page, type: DiffType.SAME}
    }
    else if (contains(removed, page)) {
      return {page, type: DiffType.REMOVED}
    }
    else if (contains(added, page)) {
      return {page, type: DiffType.ADDED}
    }
    else {
      throw new Error('Page not found in any set')
    }
  })
  return {
    same,
    removed,
    added,
    diffedPages,
    start: getFirstDifferenceIndex(ps1, ps2)
  }
}

const pushStep = (p:VisitedPage):PushStep =>
    new (p.isZeroPage ? ReplaceStep : PushStep)(p.toPage())

const backSteps = (amount:number):BackStep[] =>
    amount > 0 ? [new BackStep(amount)] : []


/**
 * Get the difference between old pages and new pages and return a list of
 * browser steps to transform the browser history
 * @param ps1 {Pages} The original pages
 * @param ps2 {Pages} The new pages
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffPagesToSteps = (ps1:Pages, ps2:Pages):Step[] => {
  const diff:PagesDiff = diffPages(ps1, ps2)
  const simple = ():Step[] => {
    if (diff.added.length > 0) {
      const pushes = diff.added.map(pushStep)
      const backs = backSteps(ps2.length - 1 - ps2.activeIndex)
      return [...pushes, ...backs]
    }
    else {
      const indexDelta = ps2.activeIndex - ps1.activeIndex
      return indexDelta !== 0 ? [new GoStep(indexDelta)] : []
    }
  }
  const complex = ():Step[] => {
    const cleanWipe = ():Step[] => {
      const backs1 = backSteps(ps1.activeIndex - diff.start + 1)
      const pushes = ps2.pages.slice(diff.start).map(pushStep)
      const backs2 = backSteps(ps2.length - 1 - ps2.activeIndex)
      return [...backs1, ...pushes, ...backs2]
    }

    const removeFwdHistory = ():Step[] => {
      return [...backSteps(1), pushStep(ps2.activePage)]
    }
    return diff.start === ps2.length ? removeFwdHistory() : cleanWipe()
  }
  return diff.start === ps1.length ? simple() : complex()
}