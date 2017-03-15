import IContainer from '../model/IContainer'
import * as R from 'ramda'

interface SortFnParams {
  visited:IContainer[]
  defaultUnvisited:IContainer[]
  nonDefaultUnvisited:IContainer[]
}
type SortFn = (params:SortFnParams) => IContainer[]

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

const sort = (cs:IContainer[], fn:SortFn):IContainer[] => {
  const visited:IContainer[] = cs.filter(c => c.wasManuallyVisited)
  const unvisited:IContainer[] = cs.filter(c => !c.wasManuallyVisited)
  const defaultUnvisited:IContainer[] = unvisited.filter(c => c.isDefault)
  const nonDefaultUnvisited = unvisited.filter(c => !c.isDefault)
  return fn({visited, defaultUnvisited, nonDefaultUnvisited})
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