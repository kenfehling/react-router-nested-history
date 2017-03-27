import {Map, OrderedMap} from 'immutable'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import Pages from './Pages'
import {HistoryStack} from './Pages'
import {ReduxState} from '../reducers/index'

export interface ComputedContainer {
  name: string
  enabled: boolean
  activeUrl: string
  isActiveInGroup: boolean
  matchesCurrentUrl: boolean
  history: HistoryStack
}

export interface ComputedGroup {
  name: string
  enabled: boolean
  isTopLevel: boolean
  containers: Map<string, ComputedContainer|ComputedGroup>
  activeContainerIndex: number
  activeContainerName: string
  activeUrl: string
  backPage: Page|undefined
  history: HistoryStack
}

export interface ComputingWindow {
  forName: string
  visible: boolean
  groupName: string
}

export type ComputedWindow = ComputingWindow & {
  zIndex: number
  isOnTop: boolean
}

export interface PartialComputedState {
  isInitialized: boolean
  loadedFromRefresh: boolean
  groups: Map<string, ComputedGroup>
  windows: OrderedMap<string, ComputedWindow>
  activeUrl: string
  activeGroupName: string
  lastUpdate: number
  pages: Pages
  activeTitle: string|null
}

type ComputedState = IComputedState & PartialComputedState & ReduxState

export default ComputedState