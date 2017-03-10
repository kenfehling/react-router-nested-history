import * as R from 'ramda'
import IHistory from './IHistory'
import PageVisit from './PageVisit'
import VisitedPage from './VistedPage'
import Page from './Page'
import Push from './actions/Push'
import Top from './actions/Top'
import Go from './actions/Go'
import Back from './actions/Back'
import Forward from './actions/Forward'
import {IActionClass} from './PageVisit'

export default class Pages implements IHistory {
  readonly pages: VisitedPage[]

  constructor(pages:VisitedPage[]=[]) {
    this.pages = pages
  }
  
  toHistoryStack():HistoryStack {
    const firstVisited:VisitedPage[] = this.byFirstVisited
    const currentIndex = this.activeIndex
    return new HistoryStack({
      back: firstVisited.slice(0, currentIndex),
      current: this.activePage,
      forward: firstVisited.slice(currentIndex + 1).filter(Pages.manualOnly)
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

  replacePageAtIndex(page:VisitedPage, index:number):Pages {
    const firstVisited:VisitedPage[] = this.byFirstVisited
    return new Pages([
      ...firstVisited.slice(0, index),
      page,
      ...firstVisited.slice(index + 1)
    ])
  }

  touchPageAtIndex(index:number, pageVisit:PageVisit):Pages {
    const page:VisitedPage = this.byFirstVisited[index]
    return this.replacePageAtIndex(page.touch(pageVisit), index)
  }

  activate(pageVisit:PageVisit):Pages {
    return this.touchPageAtIndex(this.activeIndex, pageVisit)
  }

  push(page:Page, time:number):Pages {
    const index:number = this.activeIndex + 1
    const newPage:VisitedPage = new VisitedPage({
      ...Object(page),
      visits:[{time, action: Push}]
    })
    return new Pages([...this.byFirstVisited.slice(0, index), newPage])
  }

  /**
   * Go back to the first page
   * @param time - The time this action was originally run
   * @param reset - Should it remove the forward pages from history?
   */
  top(time:number, reset:boolean=false):Pages {
    const firstVisit:VisitedPage[] = this.byFirstVisited
    const page:VisitedPage = firstVisit[0].touch({time, action: Top})
    return new Pages(reset ? [page] : [page, ...firstVisit.slice(1)])
  }

  /**
   * Gets the distance and direction of a page on the stack
   * @param page - The page to look for
   * @returns {number} - The amount (-2 = 2 steps back)
   * @throws Error if page not found
   */
  getShiftAmount(page:Page):number {
    const firstVisit:Page[] = this.byFirstVisited
    const index = R.findIndex((p:Page) => p.equals(page), firstVisit)
    if (index === -1) {
      throw new Error('Page not found')
    }
    else {
      return index - this.activeIndex
    }
  }

  go(n:number, time:number, action:IActionClass=Go):Pages {
    const oldIndex:number = this.activeIndex
    const newIndex:number = oldIndex + n
    if (newIndex < 0 || newIndex >= this.pages.length) {
      throw new Error(
          `Can't go ${n}, size = ${this.pages.length}, index = ${oldIndex}`)
    }
    else {
      return this.touchPageAtIndex(newIndex, {time, action})
    }
  }

  back(n:number=1, time:number):Pages {
    return this.go(0 - n, time, Back)
  }

  forward(n:number=1, time:number):Pages {
    return this.go(n, time, Forward)
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

  get activePage():VisitedPage {
    return this.byLastVisited[0]
  }

  get activeIndex():number {
    const current:Page = this.activePage
    const firstVisit:Page[] = this.byFirstVisited
    return R.findIndex(p => p === current, firstVisit)
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

  add(page:VisitedPage):Pages {
    return new Pages([...this.pages, page])
  }

  filter(fn:(page:VisitedPage)=>boolean):Pages {
    return new Pages([...this.pages.filter(fn)])
  }

  static manualOnly(page:VisitedPage):boolean {
    return page.wasManuallyVisited
  }

  static compareByFirstVisited(p1:VisitedPage, p2:VisitedPage):number {
    return p1.firstVisit.time - p2.firstVisit.time
  }

  static compareByLastVisited(p1:VisitedPage, p2:VisitedPage):number {
    return p2.lastVisit.time - p1.lastVisit.time
  }

  private get byFirstVisited():VisitedPage[] {
    return R.sort(Pages.compareByFirstVisited, this.pages)
  }

  private get byLastVisited():VisitedPage[] {
    return R.sort(Pages.compareByLastVisited, this.pages)
  }

  private get manualOnly():Pages {
    return new Pages(this.filter(Pages.manualOnly).byFirstVisited)
  }
}

/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
export class HistoryStack {
  readonly back: VisitedPage[]
  readonly current: VisitedPage
  readonly forward: VisitedPage[]

  constructor({back, current, forward}:
    {back:VisitedPage[], current:VisitedPage, forward:VisitedPage[]}) {
    this.back = back
    this.current = current
    this.forward = forward
  }

  get lastVisit():PageVisit {
    return this.current.lastVisit
  }

  flatten():VisitedPage[] {
    return [...this.back, this.current, ...this.forward]
  }

  toPages():Pages {
    return new Pages(this.flatten())
  }
}