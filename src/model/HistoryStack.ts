import VisitedPage from './VistedPage'
import PageVisit from './PageVisit'
import {List} from 'immutable'

/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
export default class HistoryStack {
  readonly back: List<VisitedPage>
  readonly current: VisitedPage
  readonly forward: List<VisitedPage>

  constructor({back, current, forward}:
                {back:List<VisitedPage>, current:VisitedPage, forward:List<VisitedPage>}) {
    this.back = back
    this.current = current
    this.forward = forward
  }

  get lastVisit():PageVisit {
    return this.current.lastVisit
  }

  flatten():List<VisitedPage> {
    return this.back.concat([this.current], this.forward).toList()
  }
}