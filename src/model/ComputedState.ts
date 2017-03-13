import {Map} from 'immutable'
import PathTitle from './PathTitle'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import Pages from './Pages'

export interface ComputedContainer {
  name: string,
  activeUrl: string
}

export interface ComputedGroup {
  name: string,
  containers: Map<string, ComputedContainer|ComputedGroup>
  stackOrder: (ComputedContainer|ComputedGroup)[]
  activeContainerIndex: number
  activeContainerName: string
  activeUrl: string
  backPage: Page|undefined
}

export interface PartialComputedState {
  isInitialized: boolean
  loadedFromRefresh: boolean
  groups: Map<string, ComputedGroup>
  activeUrl: string|null
  activeGroupName: string
  lastUpdate: number
  pages: Pages
  activeTitle: string|null
}

type ComputedState = IComputedState & PartialComputedState

export default ComputedState