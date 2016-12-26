// @flow

import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE, SET_ZERO_PAGE} from "../constants/ActionTypes"
import * as _ from 'lodash'
import fp from 'lodash/fp'
import { pushToStack, replaceCurrent, back, forward, getCurrentPageInGroup, getActiveContainer, getActiveGroup,
  filterZero, isZeroPage, isOnZeroPage, toBrowserHistory
} from './core'
import * as browser from '../browserFunctions'
import { switchContainer, loadFromUrl } from '../behaviorist'
import type { History, State, Container, Page, Group, Step, Action} from '../types'
import compareAsc from 'date-fns/compare_asc'

export const pushPage = (oldState:State, page:Page) : State => {
  const state:State = _.cloneDeep(oldState)
  const group:Group = getActiveGroup(state)
  const container:Container = group.containers[page.containerIndex]
  container.history = pushToStack(container.history, page)
  group.history = pushToStack(group.history, page)
  state.browserHistory = pushToStack(state.browserHistory, page)
  state.lastPageId = Math.max(state.lastPageId, page.id)
  return state
}

export const replacePage = (oldState:State, page:Page) : State => {
  const state:State = _.cloneDeep(oldState)
  const group:Group = state.groups[state.activeGroupIndex]
  const container:Container = group.containers[page.containerIndex]
  container.history = replaceCurrent(container.history, page)
  group.history = replaceCurrent(group.history, page)
  state.browserHistory = replaceCurrent(state.browserHistory, page)
  state.lastPageId = Math.max(state.lastPageId, page.id)
  return state
}

export const replacePageZero = (state:State, zeroPage:string) : State => ({
    ...state,
  browserHistory: replaceCurrent(state.browserHistory, {url: zeroPage, id: 0, containerIndex: 0})
})

export const _Url = (state:State, url:string, containerIndex:?number, fn:Function) : State => {
  const id:number = state.lastPageId + 1
  return fn(state, {
    url,
    id,
    containerIndex: containerIndex || getActiveContainer(state).index
  })
}

export const pushUrl = (state:State, url:string, containerIndex:?number) : State =>
    _Url(state, url, containerIndex, pushPage)

export const replaceUrl = (state:State, url:string, containerIndex:?number) : State =>
    _Url(state, url, containerIndex, replacePage)

export function go(oldState:State, n:number, zeroPage:string) : State {
  if (n === 0) {
    return oldState
  }
  const state = _.cloneDeep(oldState)
  const group = state.groups[state.activeGroupIndex]
  const container = group.containers[group.history.current.containerIndex]
  const f = n < 0 ? back : forward
  const getStack = (h:History) : Page[] => n < 0 ? h.back : h.forward
  const nextN = n < 0 ? n + 1 : n - 1
  if (getStack(group.history).length > 0) {
    group.history = f(group.history)
    if (getStack(container.history).length > 0) {
      container.history = f(container.history)
    }
    state.browserHistory = toBrowserHistory(group.history, zeroPage)
  }
  return go(state, nextN, zeroPage)
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

export const onpop = (state:State, id:number, zeroPage:string) : State => {
  const shiftAmount = getHistoryShiftAmountForId(state, id)
  if (shiftAmount === 0) {
    return state
  }
  else {
    return go(state, shiftAmount, zeroPage)
  }
}

export function reducer(state:?State, action:Action, zeroPage:string) : State {
  switch (action.type) {
    case CREATE_CONTAINER: {
      const {groupIndex=0, initialUrl, urlPatterns, useDefault=true} = action.data
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
        lastPageId: id,
        browserHistory: state ? state.browserHistory :
            toBrowserHistory(history, zeroPage)
      }
    }
  }
  if (!state) {
    throw new Error("State not yet initialized")
  }
  else {
    switch (action.type) {
      case LOAD_FROM_URL: {
        const {url} = action.data
        return loadFromUrl(replacePageZero(state, zeroPage), url, zeroPage)
      }
      case SWITCH_TO_CONTAINER: {
        const {groupIndex, containerIndex} = action.data
        const newState:State = isOnZeroPage(state) ?
            _.cloneDeep(go(state, 1, zeroPage)) : _.cloneDeep(state)
        const group:Group = newState.groups[groupIndex]
        const oldContainerIndex = group.history.current.containerIndex
        const fromContainer:Container = group.containers[oldContainerIndex]
        const toContainer:Container = getContainer(newState, groupIndex, containerIndex)
        const defaultContainer:?Container =
            _.find(group.containers, (c:Container) => c.isDefault)
        group.history = switchContainer(fromContainer, toContainer, defaultContainer)
        newState.browserHistory = toBrowserHistory(group.history, zeroPage)
        newState.activeGroupIndex = group.index
        return newState
      }
      case PUSH: {
        const {url} = action.data
        const f:Function = (s:State) => pushUrl(s, url)
        return isOnZeroPage(state) ? f(go(state, 1, zeroPage)) : f(state)
      }
      case BACK: return go(state, 0 - action.data.n || -1, zeroPage)
      case FORWARD:
      case GO: return go(state, action.data.n || 1, zeroPage)
      case POPSTATE: return onpop(state, action.data.id, zeroPage)
    }
  }
  return state
}

const createPushStep = (page:Page) => ({fn: browser.push, args: [page]})
const createReplaceStep = (page:Page) => ({fn: browser.replace, args: [page]})

export const getHistoryReplacementSteps = (h1:?History, h2:History) : Step[] => {
  return _.flatten([
    h1 && !isZeroPage(h1.current) ? {fn: browser.back, args: [filterZero(h1.back).length + 1]} : [],
    _.isEmpty(h2.back) ? [] : _.map(filterZero(h2.back), createPushStep),
    {fn: browser.push, args: [h2.current]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, createPushStep),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ])
}

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {?State} The original historyStore state
 * @param newState {State} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffStateToSteps = (oldState:?State, newState:State, zeroPage:string) : Step[] => {
  const h1:?History = oldState ? oldState.browserHistory : null
  const h2:History = newState.browserHistory
  if (_.isEqual(h1, h2)) {
    return []
  }
  if (!oldState) {
    return [
      createReplaceStep({url: zeroPage, id: 0, containerIndex: 0}),
      ...getHistoryReplacementSteps(h1, h2)
    ]
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

export function createStepsSinceLastUpdate(actions:Action[], zeroPage:string, lastUpdate:Date) : Step[] {
  const oldActions:Action[] = _.filter(actions,
      a => compareAsc(a.time, lastUpdate) === -1 || a.type === POPSTATE)
  const oldState:?State = _.isEmpty(oldActions) ? null : deriveState(oldActions, zeroPage)
  const newState:State = deriveState(actions, zeroPage)
  return diffStateToSteps(oldState, newState, zeroPage)
}

export const reduceAll = (state:?State, actions:Action[], zeroPage:string) : State => {
  if (actions.length === 0) {
    throw new Error('No action history')
  }
  else {
    return actions.reduce((nextState:State, action:Action) =>
        reducer(nextState, action, zeroPage), state)
  }
}

export const deriveState = (actions:Action[], zeroPage:string) : State => {
  if (actions.length === 0) {
    throw new Error('No action history')
  }
  return {
    ...actions.reduce((state, action) => reducer(state, action, zeroPage), null),
    lastAction: _.last(actions)
  }
}

export function getContainerStackOrder(actions:Action[], groupIndex:number, zeroPage:string) : Container[] {
  if (actions.length === 0) {
    throw new Error("No actions in history")
  }
  const containerSwitches:Container[] = []
  actions.reduce((oldState:?State, action:Action) : State => {
    const newState:State = reducer(oldState, action, zeroPage)
    if (action.type === CREATE_CONTAINER && action.data.groupIndex === groupIndex) {
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
export function getIndexedContainerStackOrder(actions:Action[], groupIndex:number, zeroPage:string) : number[] {
  const stackOrder = getContainerStackOrder(actions, groupIndex, zeroPage)
  const values = _.map(stackOrder, (s, i) => ({index: s.index, i}))
  return _.map(_.sortBy(values, s => s.index), s => s.i)
}

export function getContainer(state:State, groupIndex:number, index:number):Container {
  return state.groups[groupIndex].containers[index]
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

export const getGroupState = (actions:Action[], groupIndex:number, zeroPage:string) => {
  const state:State = deriveState(actions, zeroPage)
  const currentUrl:string = getCurrentPageInGroup(state, groupIndex).url
  const activeContainer:Container = getActiveContainer(state)
  const activeGroup:Group = getActiveGroup(state)
  const stackOrder:Container[] = getContainerStackOrder(actions, groupIndex, zeroPage)
  const indexedStackOrder:number[] = getIndexedContainerStackOrder(actions, groupIndex, zeroPage)
  return {activeContainer, activeGroup, currentUrl, stackOrder, indexedStackOrder}
}