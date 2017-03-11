import Page from './Page'
import PageVisit, {VisitType} from './PageVisit'
import VisitedPage from './VistedPage'

abstract class IHistory {
  abstract getBackPage(n:number): Page|undefined
  abstract getForwardPage(n:number): Page|undefined
  abstract canGoBack(n: number): boolean
  abstract canGoForward(n: number): boolean
  abstract get firstManualVisit(): PageVisit
  abstract get lastVisit(): PageVisit
  abstract get activePage(): VisitedPage
  abstract containsPage(page: Page): boolean
  abstract getShiftAmount(page: Page): number

  abstract get backPages():Page[]
  abstract get forwardPages():Page[]
  abstract get backLength():number
  abstract get forwardLength():number

  abstract activate(pageVisit: PageVisit): IHistory
  abstract push(page: Page, time:number, type?:VisitType): IHistory
  abstract top(time: number, reset: boolean): IHistory
  abstract back(n: number, time: number): IHistory
  abstract forward(n: number, time: number): IHistory
  abstract go(n: number, time: number): IHistory
  abstract shiftTo(page: Page, time): IHistory
}

export default IHistory