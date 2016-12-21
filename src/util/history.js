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

export const getHistoryShiftAmount = (oldState:State, pageEquals:Function) : number => {
  const group = oldState.groups[oldState.activeGroupIndex]
  const oldHistory = group.history
  if (!_.isEmpty(oldHistory.back)) {
    const i = _.findIndex(oldHistory.back, pageEquals)
    if (i !== -1) {
      return 0 - (_.size(oldHistory.back) - i)
    }
  }
  if (!_.isEmpty(oldHistory.forward)) {
    const i = _.findIndex(oldHistory.forward, pageEquals)
    if (i !== -1) {
      return i + 1
    }
  }
  return 0
}

export const getHistoryShiftAmountForId = (oldState:State, id:number) : number =>
    getHistoryShiftAmount(oldState, (p:Page) => p.id === id)

export const getHistoryShiftAmountForUrl = (oldState:State, url:string) : number =>
    getHistoryShiftAmount(oldState, (p:Page) => p.url === url)

export const onpop = (state:State, id:number) : State => {
  const shiftAmount = getHistoryShiftAmountForId(state, id)
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
      const {groupIndex=0, initialUrl, urlPatterns, useDefault=true} = action
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
        isDefault: containerIndex === 0 && useDefault
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
        groups: state ? [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ] : [group],
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
        const {url} = action
        const currentUrl = state.groups[0].history.current.url
        if (url === currentUrl) {
          return state
        }
        else {
          const shiftAmount:number = getHistoryShiftAmountForUrl(state, url)
          if (shiftAmount === 0) {
            const newState = loadFromUrl(state, url)
            const activeGroup = findGroupWithCurrentUrl(newState, url)
            return {...newState, activeGroupIndex: activeGroup.index}
          }
          else {
            return go(state, shiftAmount)
          }
        }
      }
      case SWITCH_TO_CONTAINER: {
        const {groupIndex, containerIndex} = action
        const newState:State = _.cloneDeep(state)
        const group:Group = newState.groups[groupIndex]
        const oldContainerIndex = group.history.current.containerIndex
        const fromContainer:Container = group.containers[oldContainerIndex]
        const toContainer:Container = getContainer(newState, groupIndex, containerIndex)
        const defaultContainer:?Container =
            _.find(group.containers, (c:Container) => c.isDefault)
        group.history = switchContainer(fromContainer, toContainer, defaultContainer)
        newState.activeGroupIndex = group.index
        return newState
      }
      case PUSH: return push(state, action.url)
      case BACK: return go(state, 0 - action.n || -1)
      case FORWARD:
      case GO: return go(state, action.n || 1)
      case POPSTATE: return onpop(state, action.id)
    }
  }
  return state
}

const createPushStep = (page:Page) => ({fn: browser.push, args: [page]})

export const getHistoryReplacementSteps = (h1:?History, h2:History) : Step[] =>
  _.flatten([
    h1 ? {fn: browser.back, args: [h1.back.length + 1]} : [],
    _.isEmpty(h2.back) ? [] : _.map(h2.back, createPushStep),
    {fn: browser.push, args: [h2.current]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, createPushStep),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ])


/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {?State} The original historyStore state
 * @param newState {State} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffStateToSteps = (oldState:?State, newState:State) : Step[] => {
  const group1:?Group = oldState ? oldState.groups[oldState.activeGroupIndex] : null
  const group2:Group = newState.groups[newState.activeGroupIndex]
  const h1:?History = group1 ? group1.history : null
  const h2:History = group2.history
  if (_.isEqual(h1, h2)) {
    return []
  }
  if (!oldState) {
    return getHistoryReplacementSteps(h1, h2)
  }
  const shiftAmount:number = getHistoryShiftAmount(oldState, p => p.id === h2.current.id)
  if (shiftAmount !== 0) {
    return [{fn: browser.go, args: [shiftAmount]}]
  }
  else if (hasSameActiveContainer(oldState, newState)) {
    return [{fn: browser.push, args: [h2.current]}]
  }
  else {
    return getHistoryReplacementSteps(h1, h2)
  }
}

export function createStepsForLastAction(actions:Object[]) : Step[] {
  const newState:State = deriveState(actions)
  switch(newState.lastAction.type) {
    case LOAD_FROM_URL: {
      const i = _.findLastIndex(actions, a => a.type !== CREATE_CONTAINER)
      const oldState:?State= i < 0 ? null : deriveState(actions.slice(0, i + 1))
      const oldPage:?Page = oldState ? getActivePage(oldState) : null
      const newPage:Page = getActivePage(newState)
      const oldUrl:?string = oldPage ? oldPage.url : null
      const newUrl:string = newPage.url
      if (oldUrl === newUrl) {
        return [createPushStep(newPage)]  // probably a browser refresh
      }                                   // but add "zero page" to be safe
      else {
        return [
          createPushStep(newPage),             // add "zero page"
          ...diffStateToSteps(null, newState)  // and just start over again
        ]
      }
    }
    case SWITCH_TO_CONTAINER: {
      const oldState:State = deriveState(_.initial(actions))
      return diffStateToSteps(oldState, newState)
    }
    case PUSH:
      return [createPushStep(getActiveGroup(newState).history.current)]
    case BACK:
      return [{fn: browser.back, args: [newState.lastAction.n || 1]}]
    case FORWARD:
      return [{fn: browser.forward, args: [newState.lastAction.n || 1]}]
    case GO:
      return [{fn: browser.go, args: [newState.lastAction.n || 1]}]
  }
  return []
}

export const reduceAll = (state:?State, actions:Object[]) : State => {
  if (actions.length === 0) {
    throw new Error('No action history')
  }
  else {
    return actions.reduce(reducer, state)
  }
}

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
      if (!hasSameActiveContainer(oldState, newState)) {
        containerSwitches.push(getActiveContainer(newState))
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

export function getActiveContainer(state:State):Container {
  const group = getActiveGroup(state)
  return group.containers[group.history.current.containerIndex]
}

export function getCurrentPageInGroup(state:State, groupIndex:number) {
  return state.groups[groupIndex].history.current
}

export function getActivePage(state:State) {
  return getCurrentPageInGroup(state, getActiveGroup(state).index)
}

export function hasSameActiveContainer(oldState:?State, newState:State) : boolean {
  if (!oldState) return false
  const o:Container = getActiveContainer(oldState)
  const n:Container = getActiveContainer(newState)
  return o.groupIndex === n.groupIndex && o.index === n.index
}

export function isActiveContainer(state:State, groupIndex:number, containerIndex:number) {
  const c = getActiveContainer(state)
  return c.groupIndex === groupIndex && c.index === containerIndex
}

export const getGroupState = (actions:Object[], groupIndex:number) => {
  const state:State = deriveState(actions)
  const currentUrl:string = getCurrentPageInGroup(state, groupIndex).url
  const activeContainer:Container = getActiveContainer(state)
  const activeGroup:Group = getActiveGroup(state)
  const stackOrder:Container[] = getContainerStackOrder(actions, groupIndex)
  const indexedStackOrder:number[] = getIndexedContainerStackOrder(actions, groupIndex)
  return {activeContainer, activeGroup, currentUrl, stackOrder, indexedStackOrder}
}

export const findGroupWithCurrentUrl = (state:State, url:string) : Group =>
  _.find(state.groups, (g:Group) : boolean => g.history.current.url === url)