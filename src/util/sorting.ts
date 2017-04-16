import VisitedPage from '../model/VisitedPage'
import {List} from 'immutable'

export interface SortFnParams<T> {
  visited: List<T>
  defaultUnvisited: List<T>
  nonDefaultUnvisited: List<T>
}

export type PageSortFnParams = SortFnParams<VisitedPage> & {
  zeroPage: VisitedPage
}

export type SortFn<T> = (params:SortFnParams<T>) => List<T>
export type PageSortFn = (params: PageSortFnParams) => List<VisitedPage>

export function sort<T>(items:List<T>, fn:SortFn<T>, wasVisitedFn:(t:T)=>boolean,
                        isDefaultFn:(t:T)=>boolean):List<T> {
  const unvisited = items.filterNot(wasVisitedFn).toList()
  return fn({
    visited: items.filter(wasVisitedFn).toList(),
    defaultUnvisited: unvisited.filter(isDefaultFn).toList(),
    nonDefaultUnvisited: unvisited.filterNot(isDefaultFn).toList()
  })
}

export function comparePagesByFirstVisited(p1:VisitedPage, p2:VisitedPage):number {
  if (p1.isZeroPage) {
    return -1
  }
  if (p2.isZeroPage) {
    return 1
  }
  if (p1.wasManuallyVisited) {
    if (p2.wasManuallyVisited) {
      return p1.firstManualVisit.time - p2.firstManualVisit.time
    }
    else {
      return -1 //1
    }
  }
  else {
    if (p2.wasManuallyVisited) {
      return 1 //-1
    }
    else {
      return 0
    }
  }
}

export function comparePagesByLastVisited(p1:VisitedPage, p2:VisitedPage):number {
  if (p1.wasManuallyVisited) {
    if (p2.wasManuallyVisited) {
      return p2.lastVisit.time - p1.lastVisit.time
    }
    else {
      return -1
    }
  }
  else {
    if (p2.wasManuallyVisited) {
      return 1
    }
    else {
      return 0
    }
  }
}