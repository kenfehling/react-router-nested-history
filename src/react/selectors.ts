import {createSelectorCreator, defaultMemoize, createSelector} from 'reselect'
import createReselector from 're-reselect'
import {Map} from 'immutable'
import * as _ from 'lodash'
import {
  ComputedGroup, ComputedContainer, ComputedWindow
} from '../model/ComputedState'
import UpdateBrowser from '../model/actions/UpdateBrowser'
import AddTitle from '../model/actions/AddTitle'

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
)

export const createCachingSelector = createSelectorCreator(
  _.memoize,
  (a, b) => a === b
)

export const EMPTY_OBJ = {}
export const getDispatch = (dispatch) => dispatch
export const getGroupName = (state, props):string => props.groupName
export const getContainerName = (state, props):string => props.containerName
export const getLastAction = (state) => _.last(state.actions.filter(a =>
    !(a instanceof UpdateBrowser) && !(a instanceof AddTitle)))
export const getIsInitialized = state => state.isInitialized
export const getLoadedFromPersist = state => state.loadedFromPersist
const getContainers = (state):Map<string, ComputedContainer> => state.containers
const getGroups = (state):Map<string, ComputedGroup> => state.groups
const getWindows = (state):Map<string, ComputedWindow> => state.windows
const getPositions = (state):Map<string, Object> => state.windowPositions

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

export const getContainerFromGroupName = createReselector(
  getGroupName, getContainers, getIsInitialized,
  (name:string, groupsAndContainers:Map<string, ComputedContainer>,
   isInitialized:boolean): ComputedContainer|undefined => {
    if (isInitialized) {
      const gc:
        ComputedContainer
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
  getContainerFromGroupName,
  (group:ComputedContainer) => group ? group.backPage : undefined
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
  getContainer,
  (container:ComputedContainer) => container ? container.activeUrl : undefined
)((state, props) => props.containerName)

export const getShouldGoToTop = createReselector(
  getContainer, getGroup,
  (container:ComputedContainer, group:ComputedGroup) =>
      group && group.gotoTopOnSelectActive &&
      container && container.isActiveInGroup
)((state, props) => props.containerName)

export const getHeaderLinkUrl = createReselector(
  getContainer, getGroup, getShouldGoToTop,
  (container:ComputedContainer, shouldGoToTop:boolean) =>
    container ?
      (shouldGoToTop ? container.initialUrl : container.activeUrl) :
      undefined
)((state, props) => props.containerName)

export const getWindow = createReselector(
  getContainerName, getWindows, getPositions,
  (containerName, ws, ps) => {
    if (ws) {
      const w = ws.get(containerName)
      if (w) {
        return {...w, position: ps[containerName]}
      }
    }
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