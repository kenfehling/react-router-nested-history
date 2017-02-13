import Page from '../Page'
import IBaseHistory from './IBaseHistory'

abstract class IHistory extends IBaseHistory {
  abstract activate(time: number): IHistory
  abstract push(page: Page): IHistory
  abstract top(time: number, reset:boolean): IHistory
  abstract goBack(n: number, time: number): IHistory
  abstract goForward(n: number, time: number): IHistory
  abstract go(n: number, time: number): IHistory
  abstract shiftTo(page:Page, time):IHistory
}

export default IHistory