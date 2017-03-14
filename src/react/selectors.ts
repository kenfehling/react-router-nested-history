import ComputedState, {ComputedGroup} from '../model/ComputedState'

export const getGroup = (state:ComputedState, ownProps):ComputedGroup =>
  state.groups.get(ownProps.groupName)

export const getContainer = (state:ComputedState, ownProps) => {
  const group: ComputedGroup = getGroup(state, ownProps)
  return group ? group.containers.get(ownProps.name) : null
}

export const getActiveGroupContainerName = (state:ComputedState, ownProps) => {
  const group:ComputedGroup = getGroup(state, ownProps)
  return group ? group.activeContainerName : null
}

export const getBackPageInGroup = (state:ComputedState, ownProps) => {
  const group: ComputedGroup = getGroup(state, ownProps)
  return group ? group.backPage : null
}

export const isGroupActive = (state:ComputedState, ownProps) => {
  const group: ComputedGroup = getGroup(state, ownProps)
  return group ? group.name === state.activeGroupName : false
}

export const getIsInitialized = (state:ComputedState) =>
  state.isInitialized

export const getLoadedFromRefresh = (state:ComputedState) =>
  state.loadedFromRefresh

export const getPathname = (state:ComputedState) =>
  state.activeUrl