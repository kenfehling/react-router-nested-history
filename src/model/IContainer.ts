import Pages, {HistoryStack} from './Pages'
import IHistory from './IHistory'
import {
  ComputedContainer, ComputedGroup, ComputingWindow,
  ComputedGroupOrContainer
} from './ComputedState'
import HistoryWindow from './HistoryWindow'
import {Map, OrderedMap} from 'immutable'

abstract class IContainer extends IHistory {
  abstract get wasManuallyVisited(): boolean
  abstract get pages(): Pages
  abstract get associatedWindow(): HistoryWindow|undefined
  abstract replaceWindow(w:HistoryWindow):IContainer
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
  abstract load({url, time}:{url: string, time: number}): IContainer
  abstract patternsMatch(url: string): boolean
  abstract get isAtTopPage(): boolean
  abstract get isGroup(): boolean

  abstract computeContainersAndGroups():Map<string, ComputedGroupOrContainer>
  abstract computeContainers(currentUrl:string, activeParentUrl?:string):
                             Map<string, ComputedContainer>
  abstract computeWindows(parentVisible:boolean):OrderedMap<string, ComputingWindow>
}

export default IContainer