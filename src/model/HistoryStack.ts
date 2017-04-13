import VisitedPage from './VisitedPage'
import PageVisit from './PageVisit'
import {List} from 'immutable'

/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
export default class HistoryStack {
  readonly back: VisitedPage[]
  readonly current: VisitedPage
  readonly forward: VisitedPage[]

  constructor({back, current, forward}:
                {back:VisitedPage[], current:VisitedPage, forward:VisitedPage[]}) {
    this.back = back
    this.current = current
    this.forward = forward
  }

  get lastVisit():PageVisit {
    return this.current.lastVisit
  }

  flatten():List<VisitedPage> {
    return List<VisitedPage>([...this.back, this.current, ...this.forward])
  }
}