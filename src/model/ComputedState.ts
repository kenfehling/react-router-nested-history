import {Map} from 'immutable'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import Pages from './Pages'
import {HistoryStack} from './Pages'

export interface ComputedContainer {
  name: string
  activeUrl: string
  history: HistoryStack
}

export interface ComputedGroup {
  name: string
  containers: Map<string, ComputedContainer|ComputedGroup>
  stackOrder: (ComputedContainer|ComputedGroup)[]
  activeContainerIndex: number
  activeContainerName: string
  activeUrl: string
  backPage: Page|undefined
  history: HistoryStack
}

export interface ComputedWindow {
  forName: string
  visible: boolean
}

export interface PartialComputedState {
  isInitialized: boolean
  loadedFromRefresh: boolean
  groups: Map<string, ComputedGroup>
  windows: Map<string, ComputedWindow>
  activeUrl: string
  activeGroupName: string
  lastUpdate: number
  pages: Pages
  activeTitle: string|null
}

type ComputedState = IComputedState & PartialComputedState

export default ComputedState