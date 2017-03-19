import Pages, {HistoryStack} from './Pages'
import IHistory from './IHistory'
import {ComputedContainer, ComputedGroup} from './ComputedState'

abstract class IContainer extends IHistory {
  abstract computeState(): ComputedGroup|ComputedContainer
  abstract get wasManuallyVisited(): boolean
  abstract get pages(): Pages
  abstract updatePages(pages:Pages): IContainer
  abstract get name(): string
  abstract get patterns(): string[]
  abstract get history(): HistoryStack
  abstract get initialUrl(): string
  abstract get groupName(): string
  abstract get isDefault(): boolean
  abstract get enabled(): boolean
  abstract setEnabled(enabled:boolean): IContainer
  abstract get resetOnLeave(): boolean
  abstract loadFromUrl(url: string, time: number): IContainer
  abstract patternsMatch(url: string): boolean
  abstract get isAtTopPage(): boolean
  abstract get isGroup(): boolean
}

export default IContainer