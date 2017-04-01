import {Map, OrderedMap} from 'immutable'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import HistoryStack from './HistoryStack'
import {ReduxState} from '../reducers/index'
import BaseAction from './BaseAction'
import State from './State'

export interface ComputedGroupOrContainer {
  name: string
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
  activeTitle: string|undefined
}

type ComputedState = IComputedState<BaseAction> &
                     PartialComputedState &
                     ReduxState &
                     {oldState: State, newActions: BaseAction[]}

export default ComputedState