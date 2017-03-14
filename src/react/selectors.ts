import {createSelectorCreator, defaultMemoize} from 'reselect'
import * as R from 'ramda'
import ComputedState, {
  ComputedGroup, ComputedContainer
} from '../model/ComputedState'
import Page from '../model/Page'

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  R.equals
)

export const createCachingSelector = createSelectorCreator(
  R.memoize,
  R.equals
)

export const EMPTY_OBJ = {}
export const getGroupName = (_, ownProps):string => ownProps.groupName

export const getGroup = (state:ComputedState, ownProps):ComputedGroup =>
  state.groups.get(ownProps.groupName)

export const getContainer = (state:ComputedState, ownProps):ComputedContainer =>
  getGroup(state, ownProps).containers.get(ownProps.containerName)

export const getActiveGroupContainerName = (state:ComputedState, ownProps):string =>
  getGroup(state, ownProps).activeContainerName

export const getBackPageInGroup = (state:ComputedState, ownProps):Page|undefined =>
  getGroup(state, ownProps).backPage

export const isGroupActive = (state:ComputedState, ownProps):boolean =>
  getGroup(state, ownProps).name === state.activeGroupName

export const getIsInitialized = (state:ComputedState) =>
  state.isInitialized

export const getLoadedFromRefresh = (state:ComputedState) =>
  state.loadedFromRefresh

export const getPathname = (state:ComputedState) =>
  state.activeUrl