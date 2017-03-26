import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
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

export const getDispatch = (dispatch) => dispatch

export const EMPTY_OBJ = {}
export const getName = (state, props):string => props.name
export const getGroupName = (state, props):string => props.groupName

export const getGroups = (state):Map<string, ComputedGroup> => state.groups

export const makeGetGroup = (groupNameSelector) => createSelector(
  groupNameSelector, getGroups,
  (name:string, groups):ComputedGroup => {
    const group:ComputedGroup|undefined = groups.get(name)
    if (!group) {
      throw new Error(`Group '${name}' not found`)
    }
    else {
      return group
    }
  }
)

export const getGroup = (state:ComputedState, ownProps):ComputedGroup =>
  state.groups.get(ownProps.groupName)

export const getActiveGroup = (state:ComputedState) => state.activeGroupName

export const makeGetIsGroupActive = () => createSelector(
  getGroupName, getActiveGroup,
  (groupName, activeGroupName) => groupName === activeGroupName
)

export const getContainer = (state:ComputedState, ownProps):ComputedContainer =>
  getGroup(state, ownProps).containers.get(ownProps.containerName)

export const getActiveGroupContainerName = (state:ComputedState, ownProps):string =>
  getGroup(state, ownProps).activeContainerName

export const getBackPageInGroup = (state:ComputedState, ownProps):Page|undefined =>
  getGroup(state, ownProps).backPage

export const getIsInitialized = (state:ComputedState) =>
  state.isInitialized

export const getLoadedFromRefresh = (state:ComputedState) =>
  state.loadedFromRefresh

export const getPathname = (state:ComputedState) =>
  state.activeUrl