import {Map, OrderedMap} from 'immutable'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import Pages from './Pages'
import {HistoryStack} from './Pages'
import {ReduxState} from '../reducers/index'
import BaseAction from './BaseAction'
import State from './State'

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

export interface ComputedWindow {
  forName: string
  visible: boolean
  zIndex: number
  isOnTop: boolean
}

export interface PartialComputedState {
  isInitialized: boolean
  groupsAndContainers: Map<string, ComputedGroupOrContainer>
  groups: Map<string, ComputedGroup>
  containers: Map<string, ComputedContainer>
  windows: OrderedMap<string, ComputedWindow>
  activeUrl: string
  //pages: Pages
  activeTitle: string|undefined
}

type ComputedState = IComputedState<BaseAction> &
                     PartialComputedState &
                     ReduxState &
                     {oldState: State, newActions: BaseAction[]}

export default ComputedState