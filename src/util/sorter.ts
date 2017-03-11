import IContainer from '../model/IContainer'
import * as R from 'ramda'

const simpleSort = (cs:IContainer[]):IContainer[] =>
    R.sort((c1, c2) => c2.lastVisit.time - c1.lastVisit.time, cs)

export const sortContainersByLastVisited = (cs:IContainer[]):IContainer[] => {
  const visited:IContainer[] = cs.filter(c => c.wasManuallyVisited)
  const unvisited:IContainer[] = R.difference(cs, visited)
  const defaultUnvisited:IContainer|undefined =
      R.find((c:IContainer) => !!c.isDefault, unvisited)
  const nonDefaultUnvisited:IContainer[] = defaultUnvisited ?
      R.difference(unvisited, [defaultUnvisited]) : unvisited
  return [
    ...simpleSort(visited),
    ...(defaultUnvisited ? [defaultUnvisited] : []),
    ...nonDefaultUnvisited
  ]
}