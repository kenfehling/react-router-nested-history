import Page from './Page'
import PageVisit, {VisitType} from './PageVisit'
import VisitedPage from './VistedPage'

abstract class IHistory {
  abstract backPage: Page|undefined
  abstract forwardPage: Page|undefined
  abstract canGoBack(n: number): boolean
  abstract canGoForward(n: number): boolean
  abstract get firstManualVisit(): PageVisit|undefined
  abstract get lastVisit(): PageVisit
  abstract get activePage(): VisitedPage
  abstract get activeUrl(): string
  abstract containsPage(page: Page): boolean
  abstract getShiftAmount(page: Page): number

  abstract get backPages():Page[]
  abstract get forwardPages():Page[]
  abstract get backLength():number
  abstract get forwardLength():number

  abstract activate(pageVisit: PageVisit): IHistory
  abstract push({page, time, type}:{page: Page, time:number, type?:VisitType}): IHistory
  abstract top({time, reset}:{time: number, reset?: boolean}): IHistory
  abstract back({n, time}:{n:number, time}): IHistory
  abstract forward({n, time}:{n:number, time}): IHistory
  abstract go({n, time}:{n:number, time}): IHistory
  abstract shiftTo({page, time}:{page: Page, time}): IHistory
}

export default IHistory