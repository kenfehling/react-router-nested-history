import ComputedState from '../model/ComputedState'

export const getGroup = (state:ComputedState, ownProps) =>
  state.groups.get(ownProps.groupName)

export const getContainer = (state:ComputedState, ownProps) =>
  getGroup(state, ownProps).containers.get(ownProps.name)

export const getActiveGroupContainerName = (state:ComputedState, ownProps) =>
  getGroup(state, ownProps).activeContainerName

export const getBackPageInGroup = (state:ComputedState, ownProps) =>
  getGroup(state, ownProps).backPage

export const isGroupActive = (state:ComputedState, ownProps) =>
  getGroup(state, ownProps).name === state.activeGroupName

export const getIsInitialized = (state:ComputedState) =>
  state.isInitialized

export const getLoadedFromRefresh = (state:ComputedState) =>
  state.loadedFromRefresh

export const getPathname = (state:ComputedState) =>
  state.activeUrl