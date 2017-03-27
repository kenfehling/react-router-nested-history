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
export const getContainerName = (state, props):string => props.containerName

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

export const makeGetGroupActiveContainerName = () => createSelector(
  getActiveGroupName, getGroups,
  (activeGroupName, groups):string => {
    const group:ComputedGroup|undefined = groups.get(activeGroupName)
    if (!group) {
      throw new Error(`Group '${name}' not found`)
    }
    else {
      return group.name
    }
  }
)

export const makeGetBackPageInGroup = () => createSelector(
  getGroup, (group) => group.backPage
)

export const makeGetContainer = () => createSelector(
  getContainerName, getGroup,
  (containerName, group):ComputedContainer => {
    return group.containers.get(containerName)
  }
)

export const getGroup = (state:ComputedState, ownProps):ComputedGroup =>
  state.groups.get(ownProps.groupName)

export const getActiveGroupName = (state:ComputedState) => state.activeGroupName

export const makeGetIsGroupActive = () => createSelector(
  getGroupName, getActiveGroupName,
  (groupName, activeGroupName) => groupName === activeGroupName
)