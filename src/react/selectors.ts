import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import createReselector from 're-reselect'
import {Map} from 'immutable'
import * as R from 'ramda'
import ComputedState, {
  ComputedGroup, ComputedContainer, ComputedGroupOrContainer
} from '../model/ComputedState'

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  R.equals
)

export const createCachingSelector = createSelectorCreator(
  R.memoize,
  R.identical
)

export const EMPTY_OBJ = {}
//export const getState = (state) => state
export const getDispatch = (dispatch) => dispatch
export const getGroupName = (state, props):string => props.groupName
export const getContainerName = (state, props):string => props.containerName
export const getGroups = (state):Map<string, ComputedGroup> => state.groups
export const getContainers = (state):Map<string, ComputedContainer> => state.containers

export const getGroupsAndContainers =
    (state:ComputedState):Map<string, ComputedGroupOrContainer> =>
        state.groupsAndContainers

const getIsInitialized = state => state.isInitialized
const getLoadedFromRefresh = state => state.loadedFromRefresh

export const getIsInitializedAndLoadedFromRefresh = createCachingSelector(
  getIsInitialized, getLoadedFromRefresh,
  (isInitialized, loadedFromRefresh) => ({isInitialized, loadedFromRefresh})
)

export const getGroup = createReselector(
  getGroupName, getGroups,
  (name:string, groups:Map<string, ComputedGroup>):ComputedGroup => {
    const group:ComputedGroup|undefined = groups.get(name)
    if (!group) {
      throw new Error(`Group '${name}' not found`)
    }
    else {
      return group
    }
  }
)((state, props) => props.groupName)

export const getGroupOrContainerFromGroupName = createReselector(
  getGroupName, getGroupsAndContainers,
  (name:string, groupsAndContainers:Map<string, ComputedGroupOrContainer>):
                                                ComputedGroupOrContainer => {
    const gc:ComputedGroupOrContainer|undefined = groupsAndContainers.get(name)
    if (!gc) {
      throw new Error(`Group or container '${name}' not found`)
    }
    else {
      return gc
    }
  }
)((state, props) => props.groupName)

export const getGroupOrContainerFromContainerName = createReselector(
  getContainerName, getGroupsAndContainers,
  (name:string, groupsAndContainers:Map<string, ComputedGroupOrContainer>):
                                                ComputedGroupOrContainer => {
    const gc:ComputedGroupOrContainer|undefined = groupsAndContainers.get(name)
    if (!gc) {
      throw new Error(`Group or container '${name}' not found`)
    }
    else {
      return gc
    }
  }
)((state, props) => props.containerName)

export const getContainer = createReselector(
  getContainerName, getContainers,
  (name:string, containers:Map<string, ComputedContainer>) => {
    const container:ComputedContainer|undefined = containers.get(name)
    if (!container) {
      throw new Error(`Container '${name}' not found`)
    }
    else {
      return container
    }
  }
)((state, props) => props.containerName)

export const getBackPageInGroup = createReselector(
  getGroupOrContainerFromGroupName,
  (group:ComputedGroupOrContainer) => group.backPage
)((state, props) => props.groupName)

export const getIsActiveInGroup = createReselector(
  getContainer,
  (container:ComputedContainer) => container.isActiveInGroup
)((state, props) => props.containerName)

export const getMatchesCurrentUrl = createReselector(
  getContainer,
  (container:ComputedContainer) => container.matchesCurrentUrl
)((state, props) => props.containerName)

export const getContainerActiveUrl = createReselector(
  getGroupOrContainerFromContainerName,
  (container:ComputedGroupOrContainer) => {
    return container.activeUrl
  }
)((state, props) => props.containerName)