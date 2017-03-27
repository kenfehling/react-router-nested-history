import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import {Map} from 'immutable'
import * as R from 'ramda'
import ComputedState, {
  ComputedGroup, ComputedContainer
} from '../model/ComputedState'
import {patternsMatch} from '../util/url'

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  R.equals
)

export const createCachingSelector = createSelectorCreator(
  R.memoize,
  R.equals
)

export const EMPTY_OBJ = {}
export const getDispatch = (dispatch) => dispatch
export const getGroupName = (state, props):string => props.groupName
export const getContainerName = (state, props):string => props.containerName
export const getGroups = (state):Map<string, ComputedGroup> => state.groups
export const getActiveGroupName = (state:ComputedState) => state.activeGroupName
export const getPatterns = (state, props) => props.patterns
export const getPathname = (state, props) => state.activeUrl

// TODO: Should we only use makeGetGroup?
export const getGroup = (state, props):ComputedGroup => state.groups.get(props.groupName)

export const makeGetGroup = () => createSelector(
  getGroupName, getGroups,
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

export const getContainer = createSelector(
  getContainerName, getGroup,
  (containerName, group):ComputedContainer|ComputedGroup => {
    return group.containers.get(containerName)
  }
)

export const makeGetContainer = () => getContainer

export const makeGetIsActiveInGroup = () => createSelector(
  getContainer,
  (container:ComputedContainer) => container.isActiveInGroup
)

export const makeGetMatchesCurrentUrl = () => createSelector(
  getContainer,
  (container:ComputedContainer) => container.matchesCurrentUrl
)

export const makeGetContainerActiveUrl = () => createSelector(
  getContainer,
  (container:ComputedContainer) => container.activeUrl
)