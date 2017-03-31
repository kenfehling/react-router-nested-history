import * as R from 'ramda'
import IHistory from './IHistory'
import PageVisit from './PageVisit'
import VisitedPage from './VistedPage'
import {VisitType} from './PageVisit'
import Page from './Page'

/**
 * A list of VisitedPage objects that's always sorted by first manually visited
 */
export default class Pages implements IHistory {
  readonly pages: VisitedPage[]

  constructor(pages:VisitedPage[]=[], sort:boolean=true) {
    this.pages = sort ? R.sort(Pages.compareByFirstVisited, pages) : pages
  }
  


  /**
   * Updates the times of pages stored in this object
   * Ignores pages that don't intersect
   */
  update(pages:Pages):Pages {
    return new Pages(
      this.pages.map(page => {
        return R.find(p => p.equals(page), pages.pages) || page
      })
    )
  }

  replacePageAtIndex(page:VisitedPage, index:number):Pages {
    const pages:VisitedPage[] = this.pages
    return new Pages([
      ...pages.slice(0, index),
      page,
      ...pages.slice(index + 1)
    ])
  }

  touchPageAtIndex(index:number, pageVisit:PageVisit):Pages {
    const page:VisitedPage = this.pages[index]
    return this.replacePageAtIndex(page.touch(pageVisit), index)
  }

  activate(pageVisit:PageVisit):Pages {
    return this.touchPageAtIndex(this.activeIndex, pageVisit)
  }

  push({page, time, type}:{page: Page, time:number, type?:VisitType}):Pages {
    const index:number = this.activeIndex + 1
    const newPage:VisitedPage = new VisitedPage({
      ...Object(page),
      visits:[{time, type}]
    })
    return new Pages([...this.pages.slice(0, index), newPage])
  }

  /**
   * Go back to the first page
   * @param time - The time this action was originally run
   * @param reset - Should it remove the forward pages from history?
   */
  top({time, reset=false}:{time:number, reset?:boolean}):Pages {
    const visit:PageVisit = {time, type: VisitType.MANUAL}
    const page:VisitedPage = this.pages[0].touch(visit)
    return new Pages(reset ? [page] : [page, ...this.slice(1).pages])
  }

  /**
   * Gets the distance and direction of a page on the stack
   * @param page - The page to look for
   * @returns {number} - The amount (-2 = 2 steps back)
   * @throws Error if page not found
   */
  getShiftAmount(page:Page):number {
    const index = this.findIndex((p:Page) => p.equals(page))
    if (index === -1) {
      throw new Error('Page not found')
    }
    else {
      return index - this.activeIndex
    }
  }

  go({n, time}:{n:number, time}):Pages {
    const oldIndex:number = this.activeIndex
    const newIndex:number = oldIndex + n
    if (newIndex < 0 || newIndex >= this.pages.length) {
      throw new Error(
          `Can't go ${n}, size = ${this.pages.length}, index = ${oldIndex}`)
    }
    else {
      return this.touchPageAtIndex(newIndex, {time, type: VisitType.MANUAL})
    }
  }

  back({n=1, time}:{n:number, time}):Pages {
    return this.go({n: 0 - n, time})
  }

  forward({n=1, time}:{n:number, time}):Pages {
    return this.go({n, time})
  }

  canGoBack(n:number=1):boolean {
    return this.activeIndex >= n
  }

  canGoForward(n:number=1):boolean {
    return this.pages.length - this.activeIndex > n
  }

  get backPages():Page[] {
    return this.pages.slice(0, this.activeIndex)
  }

  get forwardPages():Page[] {
    return this.pages.slice(this.activeIndex + 1)
  }

  get backLength():number {
    return this.activeIndex
  }

  get forwardLength():number {
    return this.length - this.activeIndex - 1
  }

  get backPage():Page|undefined {
    return this.pages[this.activeIndex - 1]
  }

  get forwardPage():Page|undefined {
    return this.pages[this.activeIndex + 1]
  }

  shiftTo({page, time}:{page:Page, time:number}):Pages {
    return this.go({n: this.getShiftAmount(page), time})
  }

  get activePage():VisitedPage {
    return R.sort(Pages.compareByLastVisited, this.pages)[0]
  }

  get activeUrl():string {
    return this.activePage.url
  }

  get activeIndex():number {
    const current:Page = this.activePage
    return this.findIndex(p => p === current)
  }

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

  get length():number {
    return this.pages.length
  }

  get isEmpty():boolean {
    return this.length === 0
  }

  add(page:VisitedPage):Pages {
    return new Pages([...this.pages, page])
  }

  sort(fn:(a:VisitedPage, b:VisitedPage) => number):Pages {
    return new Pages(R.sort(fn, this.pages), false)
  }

  slice(start:number, end?:number):Pages {
    return new Pages(this.pages.slice(start, end), false)
  }

  filter(fn:(a:VisitedPage) => boolean):Pages {
    return new Pages(this.pages.filter(fn), false)
  }

  map(fn:(a:VisitedPage) => VisitedPage):Pages {
    return new Pages(this.pages.map(fn), false)
  }

  findIndex(fn:(a:VisitedPage) => boolean):number {
    return R.findIndex(fn, this.pages)
  }

  static compareByFirstVisited(p1:VisitedPage, p2:VisitedPage):number {
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

  static compareByLastVisited(p1:VisitedPage, p2:VisitedPage):number {
    return p2.lastVisit.time - p1.lastVisit.time
  }
}