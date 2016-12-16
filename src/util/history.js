// @flow

import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes"
import * as _ from 'lodash'
import fp from 'lodash/fp'
import { pushToStack, back, forward } from './core'
import * as browser from '../browserFunctions'
import { switchContainer, loadFromUrl } from '../behaviorist'
import type { History, State, Container, Page, Group, Step } from '../types'

export const push = (oldState:State, url:string):State => {
  const state = _.cloneDeep(oldState)
  const group = state.groups[state.activeGroupIndex]
  const container = group.containers[group.history.current.containerIndex]
  const id = state.lastPageId + 1
  const page = {url, id, containerIndex: container.index}
  container.history = pushToStack(container.history, page)
  group.history = pushToStack(group.history, page)
  state.lastPageId = id
  return state
}

export function go(oldState:State, n:number) : State {
  if (n === 0) {
    return oldState
  }
  const state = _.cloneDeep(oldState)
  const group = state.groups[state.activeGroupIndex]
  const container = group.containers[group.history.current.containerIndex]
  const f = n < 0 ? back : forward
  group.history = f(group.history)
  const stack = n < 0 ? container.history.back : container.history.forward
  const containerCanGo = stack.length > 0
  const nextN = n < 0 ? n + 1 : n - 1
  if (containerCanGo) {
    container.history = f(container.history)
  }
  return go(state, nextN)
}

export const getHistoryShiftAmount = (oldState:State, newCurrentId:number) :number => {
  const group = oldState.groups[oldState.activeGroupIndex]
  const oldHistory = group.history
  if (!_.isEmpty(oldHistory.back)) {
    const i = _.findIndex(oldHistory.back, b => b.id === newCurrentId)
    if (i !== -1) {
      return 0 - (_.size(oldHistory.back) - i)
    }
  }
  if (!_.isEmpty(oldHistory.forward)) {
    const i = _.findIndex(oldHistory.forward, b => b.id === newCurrentId)
    if (i !== -1) {
      return i + 1
    }
  }
  return 0
}

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {Object} The original historyStore state
 * @param newState {Object} The new historyStore state
 * @returns {[Object]} An array of steps to get from old state to new state
 */
export const diffStateToSteps = (oldState:?State, newState:State) : Step[] => {
  const group1:?Group = oldState ? oldState.groups[oldState.activeGroupIndex] : null
  const group2:Group = newState.groups[newState.activeGroupIndex]
  const h1:?History = group1 ? group1.history : null
  const h2:History = group2.history
  if (_.isEqual(h1, h2)) {
    return []
  }
  return _.flatten([
    h1 ? {fn: browser.back, args: [h1.back.length + 1]} : [],
    _.isEmpty(h2.back) ? [] : _.map(h2.back, b => ({fn: browser.push, args: [b]})),
    {fn: browser.push, args: [h2.current]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, f => ({fn: browser.push, args: [f]})),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ])
}

export function createSteps(actions:Object[]) : Step[] {
  const currentState:State = deriveState(actions)
  switch(currentState.lastAction.type) {
    case LOAD_FROM_URL: {
      const i = _.findLastIndex(actions, a => !_.includes([CREATE_CONTAINER, LOAD_FROM_URL], a.type))
      const previousState:?State= i < 0 ? null : deriveState(actions.slice(0, i + 1))
      return diffStateToSteps(previousState, currentState)
    }
    case SWITCH_TO_CONTAINER: {
      const previousState:State = deriveState(_.initial(actions))
      return diffStateToSteps(previousState, currentState)
    }
    case PUSH:
      return [{fn: browser.push, args: [getActiveGroup(currentState).history.current]}]
    case CREATE_CONTAINER:
    case BACK:
    case FORWARD:
    case GO:
    case POPSTATE:
    default: return []
  }
}

export const constructNewHistory = (state:State, newCurrentId:number) : State => {
  const shiftAmount = getHistoryShiftAmount(state, newCurrentId)
  if (shiftAmount === 0) {
    return state
  }
  else {
    return go(state, shiftAmount)
  }
}

export function reducer(state:?State, action:Object) : State {
  switch (action.type) {
    case CREATE_CONTAINER: {
      const {groupIndex=0, initialUrl, urlPatterns} = action
      const id = (state ? state.lastPageId : 0) + 1
      const existingGroup:?Group = state ? state.groups[groupIndex] : null
      const containerIndex = existingGroup ? existingGroup.containers.length : 0

      const history:History = {
        back: [],
        current: {url: initialUrl, id, containerIndex},
        forward: []
      }

      const container:Container = {
        initialUrl,
        urlPatterns,
        history,
        groupIndex,
        index: containerIndex,
        isDefault: containerIndex === 0  // TODO: Add option to not have a default
      }

      const group = existingGroup ? {
        ...existingGroup,
        containers: [...existingGroup.containers, container]
      } : {
        index: groupIndex,
        history: history,
        containers: [container]
      }

      return {
        ...(state ? state : {}),
        groups: state ? [...state.groups.slice(0, groupIndex), group, ...state.groups.slice(groupIndex + 1)] : [group],
        activeGroupIndex: state ? state.activeGroupIndex : 0,
        lastPageId: id
      }
    }
  }
  if (!state) {
    throw new Error("State not yet initialized")
  }
  else {
    switch (action.type) {
      case LOAD_FROM_URL: {
        return loadFromUrl(state, action.url)
      }
      case SWITCH_TO_CONTAINER: {
        const newState:State = _.cloneDeep(state)
        const group:Group = newState.groups[action.groupIndex]
        const fromContainer:Container = group.containers[group.history.current.containerIndex]
        const toContainer:Container = getContainer(newState, action.groupIndex, action.containerIndex)
        group.history = switchContainer(fromContainer, toContainer, group.containers[0])
        newState.activeGroupIndex = group.index
        return newState
      }
      case PUSH: {
        return push(state, action.url)
      }
      case BACK: { return {...state, ...go(state, 0 - action.n || -1)} }
      case FORWARD:
      case GO: { return {...state, ...go(state, action.n || 1)} }
      case POPSTATE: {
        return {
          ...state,
          ...constructNewHistory(state, action.id)
        }
      }
    }
  }
  return state
}

export const reduceAll = (state:?State, actions:Object[]) : State =>
    actions.reduce(reducer, state)

export const deriveState = (actions:Object[]) : State => {
  if (actions.length === 0) {
    throw new Error('No action history')
  }
  return {
    ...actions.reduce((state, action) => reducer(state, action), null),
    lastAction: _.last(actions)
  }
}

export function getContainerStackOrder(actions:Object[], groupIndex:number) : Container[] {
  if (actions.length === 0) {
    throw new Error("No actions in history")
  }
  const containerSwitches:Container[] = []
  actions.reduce((oldState:?State, action:Object) : State => {
    const newState:State = reducer(oldState, action)
    if (action.type === CREATE_CONTAINER && action.groupIndex === groupIndex) {
      const group:Group = _.last(newState.groups)
      fp.reverse(group.containers).forEach(c => containerSwitches.push(c))
    }
    if (newState.activeGroupIndex === groupIndex) {
      const newGroup:Group = newState.groups[groupIndex]
      const oldGroup:?Group = oldState ? getActiveGroup(oldState) : null
      const oldContainerIndex:?number = oldGroup? oldGroup.history.current.containerIndex : null
      const newContainerIndex:number = newGroup.history.current.containerIndex
      if (!oldGroup || oldGroup.index !== newGroup.index || oldContainerIndex !== newContainerIndex) {
        const container = newGroup.containers[newContainerIndex]
        containerSwitches.push(container)
      }
    }
    return newState
  }, null)
  return _.uniqBy(fp.reverse(containerSwitches), c => c.index)
}

/**
 * Gets the stack order values as numbers, in container order instead of stack order
 */
export function getIndexedContainerStackOrder(actions:Object[], groupIndex:number) : number[] {
  const stackOrder = getContainerStackOrder(actions, groupIndex)
  const values = _.map(stackOrder, (s, i) => ({index: s.index, i}))
  return _.map(_.sortBy(values, s => s.index), s => s.i)
}

export function getContainer(state:State, groupIndex:number, index:number):Container {
  return state.groups[groupIndex].containers[index]
}

export function getActiveGroup(state:State):Group {
  return state.groups[state.activeGroupIndex]
}

export function getActiveContainer(group:Group):Container {
  return group.containers[group.history.current.containerIndex]
}

export function getCurrentPage(state:State, groupIndex:number) {
  return state.groups[groupIndex].history.current;
}

export const getGroupState = (actions:Object[], groupIndex:number) => {
  const state:State = deriveState(actions)
  const group:Group = state.groups[groupIndex]
  const currentUrl:string = group.history.current.url
  const activeContainer:Container = group.containers[group.history.current.containerIndex]
  const activeGroup:Group = state.groups[state.activeGroupIndex]
  const stackOrder:Container[] = getContainerStackOrder(actions, groupIndex)
  const indexedStackOrder:number[] = getIndexedContainerStackOrder(actions, groupIndex)
  return {activeContainer, activeGroup, currentUrl, stackOrder, indexedStackOrder}
}