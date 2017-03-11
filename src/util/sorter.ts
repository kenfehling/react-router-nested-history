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
    R.sort((c1, c2) => c1.firstManualVisit.time - c2.firstManualVisit.time, cs)

const sort = (cs:IContainer[], fn:SortFn):IContainer[] => {
  const visited:IContainer[] = cs.filter(c => c.wasManuallyVisited)
  const unvisited:IContainer[] = R.difference(cs, visited)
  const du = R.find((c:IContainer) => !!c.isDefault, unvisited)
  const defaultUnvisited:IContainer[] = du ? [du] : []
  const nonDefaultUnvisited = R.difference(unvisited, defaultUnvisited)
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