import HistoryStack from '../HistoryStack'
import IHistory from './IHistory'
import Pages from '../Pages'

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
}

export default IContainer