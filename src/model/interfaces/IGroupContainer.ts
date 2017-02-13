import IContainer from './IContainer'
import Page from '../Page'

abstract class IGroupContainer extends IContainer {
  abstract get groupName(): string
  abstract get isDefault(): boolean

  abstract activate(time: number): IGroupContainer
  abstract push(page: Page): IGroupContainer
  abstract top(time: number, reset: boolean): IGroupContainer
  abstract goBack(n: number, time: number): IGroupContainer
  abstract goForward(n: number, time: number): IGroupContainer
  abstract go(n: number, time: number): IGroupContainer
  abstract shiftTo(page: Page, time): IGroupContainer
}

export default IGroupContainer