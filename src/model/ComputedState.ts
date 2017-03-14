import {Map} from 'immutable'
import PathTitle from './PathTitle'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import Pages from './Pages'
import {HistoryStack} from './Pages'

export interface ComputedContainer {
  name: string,
  activeUrl: string|null,
  history: HistoryStack|null
}

export interface ComputedGroup {
  name: string,
  containers: Map<string, ComputedContainer|ComputedGroup>
  stackOrder: (ComputedContainer|ComputedGroup)[]
  activeContainerIndex: number|null
  activeContainerName: string|null
  activeUrl: string|null
  backPage: Page|undefined
  history: HistoryStack|null
}

export interface PartialComputedState {
  isInitialized: boolean
  loadedFromRefresh: boolean
  groups: Map<string, ComputedGroup>
  activeUrl: string|null
  activeGroupName: string|null
  lastUpdate: number
  pages: Pages
  activeTitle: string|null
}

type ComputedState = IComputedState & PartialComputedState

export default ComputedState