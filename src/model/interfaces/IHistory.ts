import Page from '../Page'

abstract class IHistory {
  abstract getBackPage(n:number): Page
  abstract getForwardPage(n:number): Page
  abstract canGoBack(n: number): boolean
  abstract canGoForward(n: number): boolean
  abstract get lastVisited(): number
  abstract get activePage(): Page
  abstract containsPage(page: Page): boolean
  abstract getShiftAmount(page: Page): number

  abstract activate(time: number): IHistory
  abstract push(page: Page, time:number): IHistory
  abstract top(time: number, reset: boolean): IHistory
  abstract goBack(n: number, time: number): IHistory
  abstract goForward(n: number, time: number): IHistory
  abstract go(n: number, time: number): IHistory
  abstract shiftTo(page: Page, time): IHistory
}

export default IHistory