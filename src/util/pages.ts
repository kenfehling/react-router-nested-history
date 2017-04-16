import VisitedPage from '../model/VisitedPage'
import {List} from 'immutable'
import {comparePagesByFirstVisited, comparePagesByLastVisited} from './sorting'
import PageVisit, {VisitType} from '../model/PageVisit'
import Page from '../model/Page'
import HistoryStack from '../model/HistoryStack'

export const toHistoryStack = (pages:List<VisitedPage>):HistoryStack => {
  const currentIndex = getActiveIndex(pages)
  const ps = pages.toArray()
  return new HistoryStack({
    back: ps.slice(0, currentIndex),
    current: ps[currentIndex],
    forward: ps
      .slice(currentIndex + 1)
      .filter((p:VisitedPage) => p.wasManuallyVisited)
  })
}

export const sort = (pages:List<VisitedPage>):List<VisitedPage> =>
  pages.sort(comparePagesByFirstVisited).toList()

export const isOnZeroPage = (pages:List<VisitedPage>):boolean =>
  getActiveIndex(pages) === 0

export const getActivePage = (pages:List<VisitedPage>):VisitedPage => {
  if (pages.isEmpty()) {
    throw new Error('pages is empty')
  }
  else {
    return pages.min(comparePagesByLastVisited)
  }
}

const indexOfPage = (pages:List<VisitedPage>, page:VisitedPage):number => {
  const index:number = pages.indexOf(page)
  if (index < 0) {
    throw new Error('Page not found in group')
  }
  else {
    return index
  }
}

export const getActiveIndex = (pages:List<VisitedPage>):number =>
    pages.isEmpty() ? 0 : pages.indexOf(getActivePage(pages))

export const getBackLength = (pages:List<VisitedPage>):number =>
    getActiveIndex(pages)

export const getForwardLength = (pages:List<VisitedPage>):number =>
    pages.size - 1 - getActiveIndex(pages)


export const getBackPage = (pages:List<VisitedPage>,
                            n:number=1):VisitedPage|undefined => {
  const index:number = getActiveIndex(pages)
  return index < n ? undefined : pages.get(index - n)
}

export const getForwardPage = (pages:List<VisitedPage>,
                               n:number=1):VisitedPage|undefined =>
  pages.get(getActiveIndex(pages) + n)

export const getBackPages = (pages:List<VisitedPage>):List<VisitedPage> =>
    pages.slice(0, getActiveIndex(pages)).toList()

export const getForwardPages = (pages:List<VisitedPage>):List<VisitedPage> =>
    pages.slice(getActiveIndex(pages) + 1).toList()

export const canGoBack = (pages:List<VisitedPage>, n:number=1):boolean =>
    getActiveIndex(pages) >= n

export const canGoForward = (pages:List<VisitedPage>, n:number=1):boolean =>
    pages.size - getActiveIndex(pages) > n

export const isAtTopPage = (pages:List<VisitedPage>):boolean => !canGoBack(pages)

const touch = (pages:List<VisitedPage>,
               pageVisit:PageVisit):List<VisitedPage> =>
  touchPageAtIndex(pages, getActiveIndex(pages), pageVisit)

const pushOrReplace = (pages:List<VisitedPage>,
                       {page, time, type=VisitType.MANUAL, sliceFn}:
                       {page: Page, time:number, type?:VisitType,
                         sliceFn:(ps:List<VisitedPage>, index:number,
                                  newPage:VisitedPage)=>List<VisitedPage>
                       }):List<VisitedPage> => {
  if (!pages.isEmpty() && getActivePage(pages).url === page.url) {
    return touch(pages, {time, type})
  }
  else {
    const index:number = getActiveIndex(pages) + 1
    const newPage:VisitedPage = new VisitedPage({
      ...Object(page),
      visits:[{time, type}]
    })
    return sliceFn(pages, index, newPage)
  }
}

export const push = (pages:List<VisitedPage>, {page, time, type=VisitType.MANUAL}:
                  {page: Page, time:number, type?:VisitType}):List<VisitedPage> => {
  const fn = (ps, i, newPage) => pages.slice(0, i).toList().push(newPage)
  return pushOrReplace(pages, {page, time, type, sliceFn: fn})
}

export const replace = (pages:List<VisitedPage>, {page, time, type=VisitType.MANUAL}:
                    {page: Page, time:number, type?:VisitType}):List<VisitedPage> => {
  const fn = (ps, i, newPage) => pages.slice(0, i - 1).toList().push(newPage)
  return pushOrReplace(pages, {page, time, type, sliceFn: fn})
}

const touchPageAtIndex = (pages:List<VisitedPage>, index:number,
                         {time, type=VisitType.MANUAL}:
                         {time:number, type?:VisitType}) => {
  return pages.set(index, pages.get(index).touch({time, type}))
}

/**
 * Go back to the first page
 * @param time - The time this action was originally run
 * @param reset - Should it remove the forward pages from history?
 */
export const top = (pages:List<VisitedPage>, {time, reset=false}:
                    {time:number, reset?:boolean}):List<VisitedPage> => {
  const visit:PageVisit = {time, type: VisitType.MANUAL}
  const page:VisitedPage = pages.get(0).touch(visit)
  return reset ? List<VisitedPage>([page]) : pages.toList().set(0, page)
}

/**
 * Gets the distance and direction of a page on the stack
 * @param page - The page to look for
 * @returns {number} - The amount (-2 = 2 steps back)
 * @throws Error if page not found
 */
export const getShiftAmount = (pages:List<VisitedPage>, page:Page):number => {
  const index = pages.findIndex((p:VisitedPage) => p.equals(page))
  if (index === -1) {
    throw new Error('Page not found')
  }
  else {
    return index - getActiveIndex(pages)
  }
}

export const go = (pages:List<VisitedPage>,
                   {n, time}:{n:number, time}):List<VisitedPage> => {
  const oldIndex:number = getActiveIndex(pages)
  const newIndex:number = oldIndex + n
  if (newIndex < 0 || newIndex >= pages.size) {
    throw new Error(
      `Can't go ${n}, size = ${pages.size}, index = ${oldIndex}`)
  }
  else {
    return touchPageAtIndex(pages, newIndex, {time})
  }
}

export const back = (pages:List<VisitedPage>,
                     {n=1, time}:{n?:number, time:number}):List<VisitedPage> =>
    go(pages, {n: 0 - n, time})

export const forward = (pages:List<VisitedPage>,
                        {n=1, time}:{n?:number, time}):List<VisitedPage> =>
    go(pages, {n, time})

export const shiftTo = (pages:List<VisitedPage>, {page, time}:
                          {page:Page, time:number}):List<VisitedPage> =>
    go(pages, {n: getShiftAmount(pages, page), time})

/*
 get firstManualVisit():PageVisit|undefined {
   const page:VisitedPage = this.pages.filter(p => p.wasManuallyVisited)[0]
   return page ? page.firstManualVisit : undefined
 }

 get lastVisit():PageVisit {
  return this.activePage.lastVisit
 }

 containsPage(page:Page):boolean {
  return R.findIndex((p:Page) => p.equals(page), this.pages) !== -1
 }
 */