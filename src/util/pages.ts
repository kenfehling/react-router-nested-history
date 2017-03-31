import VisitedPage from '../model/VistedPage'
import {List} from 'immutable'
import {compareByLastVisited} from './sorter'
import {HistoryStack} from '../model/HistoryStack'

export const toHistoryStack = (pages:List<VisitedPage>):HistoryStack => {
  const currentIndex = getActiveIndex(pages)
  return new HistoryStack({
    back: pages.slice(0, currentIndex).toList(),
    current: pages.get(currentIndex),
    forward: pages
      .slice(currentIndex + 1)
      .filter((p:VisitedPage) => p.wasManuallyVisited).toList()
  })
}

export const getActivePage = (pages:List<VisitedPage>):VisitedPage =>
    pages.max(compareByLastVisited)

export const getActiveIndex = (pages:List<VisitedPage>):number =>
    pages.indexOf(getActivePage(pages))

export const getBackLength = (pages:List<VisitedPage>):number =>
    this.getActiveIndex(pages)

export const getForwardLength = (pages:List<VisitedPage>):number =>
    pages.size - 1 - this.getActiveIndex(pages)


export const getBackPage = (pages:List<VisitedPage>,
                            n:number=1):VisitedPage|undefined => {
  const index:number = getActiveIndex(pages)
  if (index < 0) {  // Should never happen
    throw new Error('Page not found in group')
  }
  return index < n ? undefined : pages.get(index - n)
}

export const getForwardPage = (pages:List<VisitedPage>,
                               n:number=1):VisitedPage|undefined => {
  const index:number = getActiveIndex(pages)
  if (index < 0) {  // Should never happen
    throw new Error('Page not found in group')
  }
  return pages.get(index + n)
}