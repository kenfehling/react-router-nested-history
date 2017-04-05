import {Map, OrderedMap} from 'immutable'
import Page from './Page'
import IComputedState from '../store/IComputedState'
import {ReduxState} from '../reducers/index'
import BaseAction from './BaseAction'
import Action from '../store/Action'
import State from './State'

export interface ComputedContainer {
  name: string
  initialUrl: string
  resetOnLeave: boolean
  activeUrl: string
  backPage: Page|undefined
  isActiveInGroup: boolean
  matchesCurrentUrl: boolean
  lastAction: Action
}

export interface ComputedGroup {
  name: string
  isTopLevel: boolean
  activeContainerIndex: number
  activeContainerName: string
  gotoTopOnSelectActive: boolean
}

export interface ComputedWindow {
  forName: string
  visible: boolean
  zIndex: number
  isOnTop: boolean
}

export interface PartialComputedState {
  isInitialized: boolean
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