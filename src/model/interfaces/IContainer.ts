import HistoryStack from '../HistoryStack'
import IHistory from './IHistory'
import Pages from '../Pages'
import Page from '../Page'

abstract class IContainer extends IHistory {
  abstract get pages(): Pages
  abstract updatePages(pages:Pages): IHistory
  abstract get name(): string
  abstract get patterns(): string[]
  abstract get groupName(): string|null
  abstract get history(): HistoryStack
  abstract get initialUrl(): string
  abstract get isDefault(): boolean|null
  abstract get resetOnLeave(): boolean
  abstract loadFromUrl(url: string, time: number): IContainer
  abstract patternsMatch(url: string): boolean
  abstract get isAtTopPage(): boolean
  abstract get isGroup(): boolean

  abstract activate(time: number): IContainer
  abstract push(page: Page, time:number): IContainer
  abstract top(time: number, reset: boolean): IContainer
  abstract goBack(n: number, time: number): IContainer
  abstract goForward(n: number, time: number): IContainer
  abstract go(n: number, time: number): IContainer
  abstract shiftTo(page: Page, time): IContainer
}

export default IContainer