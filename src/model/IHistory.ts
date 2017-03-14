import Page from './Page'
import PageVisit, {VisitType} from './PageVisit'
import VisitedPage from './VistedPage'

abstract class IHistory {
  abstract backPage: Page|undefined
  abstract forwardPage: Page|undefined
  abstract canGoBack(n: number): boolean
  abstract canGoForward(n: number): boolean
  abstract get firstManualVisit(): PageVisit|null
  abstract get lastVisit(): PageVisit
  abstract get activePage(): VisitedPage
  abstract get activeUrl(): string|null
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