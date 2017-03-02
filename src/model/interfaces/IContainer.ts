import HistoryStack from '../HistoryStack'
import IHistory from './IHistory'
import Comparable from './Comparable'
import Page from '../Page'
import IBaseHistory from './IBaseHistory'

abstract class IContainer extends IBaseHistory implements IHistory, Comparable {
  abstract get name(): string
  abstract get patterns(): string[]
  abstract get groupName(): string|null
  abstract get history(): HistoryStack
  abstract get initialUrl(): string
  abstract get isDefault(): boolean|null
  abstract get resetOnLeave(): boolean
  abstract loadFromUrl(url: string, time: number): IContainer
  abstract patternsMatch(url: string): boolean
  abstract get isAtTopPage():boolean
  abstract get isGroup(): boolean

  abstract activate(time: number): IContainer
  abstract push(page: Page): IContainer
  abstract top(time: number, reset: boolean): IContainer
  abstract goBack(n: number, time: number): IContainer
  abstract goForward(n: number, time: number): IContainer
  abstract go(n: number, time: number): IContainer
  abstract shiftTo(page: Page, time: number): IContainer

  abstract compareTo(other: this): number
}

export default IContainer