import Page from './Page'
import HistoryStack from './HistoryStack'
import * as R from 'ramda'
import IHistory from './interfaces/IHistory'

export default class Pages implements IHistory {
  readonly pages: Page[]

  constructor(pages:Page[]=[]) {
    this.pages = pages
  }
  
  toHistoryStack():HistoryStack {
    const firstVisited:Page[] = this.byFirstVisited
    const currentIndex = this.activeIndex
    return new HistoryStack({
      back: firstVisited.slice(0, currentIndex),
      current: this.activePage,
      forward: firstVisited.slice(currentIndex + 1)
    })
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

  replacePageAtIndex(page:Page, index:number):Pages {
    const firstVisited:Page[] = this.byFirstVisited
    return new Pages([
      ...firstVisited.slice(0, index),
      page,
      ...firstVisited.slice(index + 1)
    ])
  }

  touchPageAtIndex(index:number, time:number):Pages {
    return this.replacePageAtIndex(this.byFirstVisited[index].touch(time), index)
  }

  activate(time:number):Pages {
    return this.touchPageAtIndex(this.activeIndex, time)
  }

  push(page:Page, time:number):Pages {
    const index:number = this.activeIndex + 1
    const newPage:Page = new Page({
      ...Object(page),
      createdAt: time,
      firstVisited: time,
      lastVisited: time
    })
    return new Pages([...this.byFirstVisited.slice(0, index), newPage])
  }

  /**
   * Go back to the first page
   * @param time - The time this action was originally run
   * @param reset - Should it remove the forward pages from history?
   */
  top(time:number, reset:boolean=false):Pages {
    const firstVisited:Page[] = this.byFirstVisited
    const page:Page = firstVisited[0].touch(time)
    return new Pages(reset ? [page] : [page, ...firstVisited.slice(1)])
  }

  /**
   * Gets the distance and direction of a page on the stack
   * @param page - The page to look for
   * @returns {number} - The amount (-2 = 2 steps back)
   * @throws Error if page not found
   */
  getShiftAmount(page:Page):number {
    const firstVisited:Page[] = this.byFirstVisited
    const index = R.findIndex((p:Page) => p.equals(page), firstVisited)
    if (index === -1) {
      throw new Error('Page not found')
    }
    else {
      return index - this.activeIndex
    }
  }

  go(n:number, time:number):Pages {
    const oldIndex:number = this.activeIndex
    const newIndex:number = oldIndex + n
    if (newIndex < 0 || newIndex >= this.pages.length) {
      throw new Error(
          `Can't go ${n}, size = ${this.pages.length}, index = ${oldIndex}`)
    }
    else {
      return this.touchPageAtIndex(newIndex, time)
    }
  }

  back(n:number=1, time:number):Pages {
    return this.go(0 - n, time)
  }

  forward(n:number=1, time:number):Pages {
    return this.go(n, time)
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

  getBackPage(n:number=1):Page|undefined {
    return this.pages[this.activeIndex - n]
  }

  getForwardPage(n:number=1):Page|undefined {
    return this.pages[this.activeIndex + n]
  }

  shiftTo(page:Page, time:number):Pages {
    return this.go(this.getShiftAmount(page), time)
  }

  get activePage():Page {
    return this.byLastVisited[0]
  }

  get activeIndex():number {
    const current:Page = this.activePage
    const firstVisited:Page[] = this.byFirstVisited
    return R.findIndex(p => p === current, firstVisited)
  }

  get lastVisited():number {
    return this.activePage.lastVisited
  }

  containsPage(page:Page):boolean {
    return R.findIndex((p:Page) => p.equals(page), this.pages) !== -1
  }

  get length():number {
    return this.pages.length
  }

  static compareByFirstVisited(p1:Page, p2:Page):number {
    if (p1.firstVisited === p2.firstVisited) {
      return p1.createdAt - p2.createdAt
    }
    else {
      return p1.firstVisited - p2.firstVisited
    }
  }

  static compareByLastVisited(p1:Page, p2:Page):number {
    return p2.lastVisited - p1.lastVisited
  }

  private get byFirstVisited():Page[] {
    return R.sort(Pages.compareByFirstVisited, this.pages)
  }

  private get byLastVisited():Page[] {
    return R.sort(Pages.compareByLastVisited, this.pages)
  }
}