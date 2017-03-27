import {Map, OrderedMap} from 'immutable'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import Pages from './Pages'
import {HistoryStack} from './Pages'
import {ReduxState} from '../reducers/index'

export interface ComputedGroupOrContainer {
  name: string
  enabled: boolean
  activeUrl: string
  backPage: Page|undefined
  history: HistoryStack
}

export interface ComputedContainer {
  name: string
  isActiveInGroup: boolean
  matchesCurrentUrl: boolean
}

export interface ComputedGroup {
  name: string
  isTopLevel: boolean
  activeContainerIndex: number
  activeContainerName: string
}

export interface ComputingWindow {
  forName: string
  visible: boolean
  groupName: string
}

export type ComputedWindow = ComputingWindow & {
  zIndex: number
  isOnTop: boolean
  groupName: string
}

export interface PartialComputedState {
  isInitialized: boolean
  loadedFromRefresh: boolean
  groupsAndContainers: Map<string, ComputedGroupOrContainer>
  groups: Map<string, ComputedGroup>
  containers: Map<string, ComputedContainer>
  windows: OrderedMap<string, ComputedWindow>
  activeUrl: string
  activeGroupName: string
  lastUpdate: number
  pages: Pages
  activeTitle: string|null
}

type ComputedState = IComputedState & PartialComputedState & ReduxState

export default ComputedState