import Pages, {HistoryStack} from './Pages'
import IHistory from './IHistory'
import {ComputedContainer, ComputedGroup, ComputedWindow} from './ComputedState'
import HistoryWindow from './HistoryWindow'
import {Map} from 'immutable'

abstract class IContainer extends IHistory {
  abstract computeState(): ComputedGroup|ComputedContainer
  abstract get wasManuallyVisited(): boolean
  abstract get pages(): Pages
  abstract get associatedWindow(): HistoryWindow|undefined
  abstract replaceWindow(w:HistoryWindow):IContainer
  abstract computeWindows(parentVisible:boolean):Map<string, ComputedWindow>
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