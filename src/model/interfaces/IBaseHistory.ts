import Page from '../Page'
abstract class IBaseHistory {
  abstract getShiftAmount(page: Page): number
  abstract canGoBack(n: number): boolean
  abstract canGoForward(n: number): boolean
  abstract containsPage(page: Page): boolean
  abstract get activePage():Page
  abstract get backPage(): Page
  abstract get forwardPage(): Page
  abstract get firstVisited():number
  abstract get lastVisited():number
}

export default IBaseHistory