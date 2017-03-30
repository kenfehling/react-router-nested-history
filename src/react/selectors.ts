import {
  createSelectorCreator, defaultMemoize, createSelector
} from 'reselect'
import createReselector from 're-reselect'
import {Map} from 'immutable'
import * as R from 'ramda'
import ComputedState, {
  ComputedGroup, ComputedContainer, ComputedGroupOrContainer, ComputedWindow
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
export const getContainers = (state):Map<string, ComputedContainer> => state.containers
export const getGroups = (state):Map<string, ComputedGroup> => state.groups
const getWindows = (state):Map<string, ComputedWindow> => state.windows
const getPositions = (state):Map<string, Object> => state.windowPositions

export const getGroupsAndContainers =
    (state:ComputedState):Map<string, ComputedGroupOrContainer> =>
        state.groupsAndContainers

export const getIsInitialized = state => state.isInitialized
export const getLoadedFromPersist = state => {
  return state.loadedFromPersist
}

export const getGroup = createReselector(
  getGroupName, getGroups, getIsInitialized,
  (name:string, groups:Map<string, ComputedGroup>,
   isInitialized:boolean):ComputedGroup|undefined => {
    if (isInitialized) {
      const group:ComputedGroup|undefined = groups.get(name)
      if (!group) {
        throw new Error(`Group '${name}' not found`)
      }
      else {
        return group
      }
    }
    else {
      return undefined
    }
  }
)((state, props) => props.groupName)

export const getGroupOrContainerFromGroupName = createReselector(
  getGroupName, getGroupsAndContainers, getIsInitialized,
  (name:string, groupsAndContainers:Map<string, ComputedGroupOrContainer>,
   isInitialized:boolean): ComputedGroupOrContainer|undefined => {
    if (isInitialized) {
      const gc:
        ComputedGroupOrContainer
        | undefined = groupsAndContainers.get(name)
      if (!gc) {
        throw new Error(`Group or container '${name}' not found`)
      }
      else {
        return gc
      }
    }
    else {
      return undefined
    }
  }
)((state, props) => props.groupName)

export const getGroupOrContainerFromContainerName = createReselector(
  getContainerName, getGroupsAndContainers, getIsInitialized,
  (name:string, groupsAndContainers:Map<string, ComputedGroupOrContainer>,
   isInitialized:boolean): ComputedGroupOrContainer|undefined => {
    if (isInitialized) {
      const gc:
        ComputedGroupOrContainer
        | undefined = groupsAndContainers.get(name)
      if (!gc) {
        throw new Error(`Group or container '${name}' not found`)
      }
      else {
        return gc
      }
    }
    else {
      return undefined
    }
  }
)((state, props) => props.containerName)

export const getContainer = createReselector(
  getContainerName, getContainers, getIsInitialized,
  (name:string, containers:Map<string, ComputedContainer>,
   isInitialized:boolean):ComputedContainer|undefined => {
    if (isInitialized) {
      const container: ComputedContainer | undefined = containers.get(name)
      if (!container) {
        throw new Error(`Container '${name}' not found`)
      }
      else {
        return container
      }
    }
    else {
      return undefined
    }
  }
)((state, props) => props.containerName)

export const getCurrentContainerIndex = createReselector(
  getGroup,
  (group:ComputedGroup) => group ? group.activeContainerIndex : undefined
)((state, props) => props.groupName)

export const getCurrentContainerName = createReselector(
  getGroup,
  (group:ComputedGroup) => group ? group.activeContainerName : undefined
)((state, props) => props.groupName)

export const getBackPageInGroup = createReselector(
  getGroupOrContainerFromGroupName,
  (group:ComputedGroupOrContainer) => group ? group.backPage : undefined
)((state, props) => props.groupName)

export const getIsActiveInGroup = createReselector(
  getContainer,
  (container:ComputedContainer) => container ? container.isActiveInGroup : false
)((state, props) => props.containerName)

export const getMatchesCurrentUrl = createReselector(
  getContainer,
  (container:ComputedContainer) => container ? container.matchesCurrentUrl : false
)((state, props) => props.containerName)

export const getContainerActiveUrl = createReselector(
  getGroupOrContainerFromContainerName,
  (container:ComputedGroupOrContainer) => container ? container.activeUrl : undefined
)((state, props) => props.containerName)

export const getWindow = createReselector(
  getContainerName, getWindows, getPositions,
  (containerName, ws, ps) => {
    return ws ? ({...ws.get(containerName), position: ps[containerName]}) : undefined
  }
)((state, props) => props.containerName)

export const getHasWindow = createReselector(
  getWindow, (w) =>!!w
)((state, props) => props.containerName)

export const getWindowVisible = createReselector(
  getWindow, w => w ? w.visible : false
)((state, props) => props.containerName)

export const getWindowPosition = createReselector(
  getWindow, w => w ? w.position : {x: 0, y: 0}
)((state, props) => props.containerName)

export const getWindowZIndex = createReselector(
  getWindow, w => w ? w.zIndex : 1
)((state, props) => props.containerName)

export const getWindowIsOnTop = createReselector(
  getWindow, w => w ? w.isOnTop : false
)((state, props) => props.containerName)