import IContainer from '../model/IContainer'
import * as R from 'ramda'
import VisitedPage from '../model/VistedPage'

interface SortFnParams {
  visited: IContainer[]
  defaultUnvisited: IContainer[]
  nonDefaultUnvisited: IContainer[]
}
type SortFn = (params:SortFnParams) => IContainer[]

export function compareByFirstVisited(p1:VisitedPage, p2:VisitedPage):number {
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

export function compareByLastVisited(p1:VisitedPage, p2:VisitedPage):number {
  return p2.lastVisit.time - p1.lastVisit.time
}

const simpleSortByLastVisit = (cs:IContainer[]):IContainer[] =>
    R.sort((c1, c2) => c2.lastVisit.time - c1.lastVisit.time, cs)

const simpleSortByFirstManualVisit = (cs:IContainer[]):IContainer[] =>
    R.sort((c1, c2) => {
      const v1 = c1.firstManualVisit
      const v2 = c2.firstManualVisit
      if (v1) {
        if (v2) {
          return v1.time - v2.time
        }
        else {
          return -1
        }
      }
      else {
        if (v1) {
          return 1
        }
        else {
          return -1  // 0
        }
      }
    }, cs)

const _sort = (cs:IContainer[], fn:SortFn):IContainer[] => {
  const visited:IContainer[] = cs.filter(c => c.wasManuallyVisited)
  const unvisited:IContainer[] = cs.filter(c => !c.wasManuallyVisited)
  const defaultUnvisited:IContainer[] = unvisited.filter(c => c.isDefault)
  const nonDefaultUnvisited = unvisited.filter(c => !c.isDefault)
  return fn({visited, defaultUnvisited, nonDefaultUnvisited})
}

const sort = (cs:IContainer[], fn:SortFn):IContainer[] => {
  const enabled:IContainer[] = cs.filter(c => c.enabled)
  const disabled:IContainer[] = cs.filter(c => !c.enabled)
  return [
    ..._sort(enabled, fn),  // return all enabled
    ..._sort(disabled, fn)  // followed by all disabled
  ]
}

export const sortContainersByLastVisited = (cs:IContainer[]):IContainer[] =>
  sort(cs, ({visited, defaultUnvisited, nonDefaultUnvisited}) => [
    ...simpleSortByLastVisit(visited),
    ...defaultUnvisited,
    ...nonDefaultUnvisited
  ])

export const sortContainersByFirstVisited = (cs:IContainer[]):IContainer[] =>
  sort(cs, ({visited, defaultUnvisited, nonDefaultUnvisited}) => [
    ...simpleSortByFirstManualVisit(visited),
    ...defaultUnvisited
  ])