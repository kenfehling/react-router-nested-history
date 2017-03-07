import Page from '../Page'

abstract class IHistory {
  abstract getBackPage(n:number): Page|undefined
  abstract getForwardPage(n:number): Page|undefined
  abstract canGoBack(n: number): boolean
  abstract canGoForward(n: number): boolean
  abstract get lastVisited(): number
  abstract get activePage(): Page
  abstract containsPage(page: Page): boolean
  abstract getShiftAmount(page: Page): number

  abstract get backPages():Page[]
  abstract get forwardPages():Page[]
  abstract get backLength():number
  abstract get forwardLength():number

  abstract activate(time: number): IHistory
  abstract push(page: Page, time:number): IHistory
  abstract top(time: number, reset: boolean): IHistory
  abstract back(n: number, time: number): IHistory
  abstract forward(n: number, time: number): IHistory
  abstract go(n: number, time: number): IHistory
  abstract shiftTo(page: Page, time): IHistory
}

export default IHistory