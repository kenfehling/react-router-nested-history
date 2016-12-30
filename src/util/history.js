// @flow

import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK,
  FORWARD, GO, POPSTATE} from "../constants/ActionTypes"
import * as _ from 'lodash'
import fp from 'lodash/fp'
import { go, getCurrentPageInGroup, getActiveContainer, getActiveGroup,
  filterZero, isZeroPage, isOnZeroPage, assureType,
  createContainer, getHistoryShiftAmountForId, pushUrl, getHistoryShiftAmount, switchToContainer, hasSameActiveContainer
} from './core'
import * as browser from '../browserFunctions'
import { switchContainer, loadFromUrl, reloadFromUrl} from '../behaviorist'
import type { History, Container, Page, Group, Step, Action} from '../types'
import { State, UninitialzedState, InitializedState } from '../types'
import compareAsc from 'date-fns/compare_asc'

export const onpop = (state:InitializedState, id:number,
                      zeroPage:string) : InitializedState => {
  const shiftAmount = getHistoryShiftAmountForId(state, id)
  if (shiftAmount === 0) {
    return state
  }
  else {
    return go(state, shiftAmount, zeroPage)
  }
}

function _loadReducer(state:State, action:Action,
                      zeroPage:string) : InitializedState {
  const {url, fromRefresh} : {url:string, fromRefresh:boolean} = action.data
  if (state instanceof UninitialzedState) {
    return loadFromUrl(state, url, zeroPage)
  }
  else if (state instanceof InitializedState) {
    return fromRefresh ? state : reloadFromUrl(state, url, zeroPage)
  }
  else {
    throw new Error('state is unknown type')
  }
}

function _reducer(state:InitializedState, action:Action,
                  zeroPage:string) : InitializedState {
  switch (action.type) {
    case SWITCH_TO_CONTAINER: {
      const {groupIndex, containerIndex} = action.data
      return switchToContainer(state, groupIndex, containerIndex, zeroPage)
    }
    case PUSH: {
      const {url, groupIndex, containerIndex} = action.data
      const f:Function = (s:InitializedState) =>
          pushUrl(s, url, groupIndex, containerIndex, zeroPage)
      return isOnZeroPage(state) ? f(go(state, 1, zeroPage)) : f(state)
    }
    case BACK: return go(state, 0 - action.data.n || -1, zeroPage)
    case FORWARD:
    case GO: return go(state, action.data.n || 1, zeroPage)
    case POPSTATE: return onpop(state, action.data.id, zeroPage)
  }
  return state
}

export function reducer(state:?State, action:Action, zeroPage:string) : State {
  if (!state) {
    if (action.type === CREATE_CONTAINER) {
      return createContainer(state, action.data)
    }
    else {
      throw new Error("State not yet initialized")
    }
  }
  else {
    switch (action.type) {
      case CREATE_CONTAINER: {
        if (state instanceof UninitialzedState) {
          return createContainer(state, action.data)
        }
        else {
          throw new Error("State already initialized")
        }
      }
      case LOAD_FROM_URL:
        return _loadReducer(state, action, zeroPage)
      default: {
        if (state instanceof InitializedState) {
          return _reducer(state, action, zeroPage)
        }
        else {
          throw new Error("State not yet initialized")
        }
      }
    }
  }
}

const pushStep = (page:Page) => ({fn: browser.push, args: [page]})
const replaceStep = (page:Page) => ({fn: browser.replace, args: [page]})
const backStep = (n:number) => ({fn: browser.back, args: [n]})

export const getHistoryReplacementSteps = (h1:?History, h2:History) : Step[] => {
  return _.flatten([
    h1 && !isZeroPage(h1.current) ? backStep(filterZero(h1.back).length + 1) : [],
    _.isEmpty(h2.back) ? [] : _.map(filterZero(h2.back), pushStep),
    {fn: browser.push, args: [h2.current]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, pushStep),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ])
}

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {?State} The original historyStore state
 * @param newState {InitializedState} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
export const diffStateToSteps = (oldState:InitializedState,
                                 newState:InitializedState) : Step[] => {
  const h1:History = oldState.browserHistory
  const h2:History = newState.browserHistory
  if (_.isEqual(h1, h2)) {
    return []
  }
  const shiftAmount:number =
      getHistoryShiftAmount(oldState, p => p.id === h2.current.id)
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

export function createStepsSinceLastUpdate(actions:Action[], zeroPage:string,
                                           lastUpdate:Date) : Step[] {
  const newState:InitializedState = deriveInitializedState(actions, zeroPage)
  const newActions:Action[] = _.filter(actions,
      a => compareAsc(a.time, lastUpdate) === 1)
  const oldActions:Action[] = _.filter(actions,
      a => compareAsc(a.time, lastUpdate) === -1 || a.type === POPSTATE)
  const shouldReset:boolean = _.some(newActions,
      a => a.type === LOAD_FROM_URL && !a.data.fromRefresh)
  if (shouldReset || _.isEmpty(oldActions)) {
    return [
      replaceStep({url: zeroPage, id: 0, containerIndex: 0}),
      ...getHistoryReplacementSteps(null, newState.browserHistory)
    ]
  }
  else {
    const oldState:InitializedState = deriveInitializedState(oldActions, zeroPage)
    return diffStateToSteps(oldState, newState)
  }
}

export const reduceAll = (state:?State, actions:Action[],
                          zeroPage:string) : State => {
  if (actions.length === 0) {
    throw new Error('No action history')
  }
  else {
    return actions.reduce((nextState:?State, action:Action) : State =>
        reducer(nextState, action, zeroPage), state)
  }
}

export const deriveState = (actions:Action[], zeroPage:string) : State => {
  return reduceAll(null, actions, zeroPage)
}

export const deriveInitializedState = (actions:Action[],
                                       zeroPage:string) : InitializedState =>
  assureType(deriveState(actions, zeroPage),
      InitializedState, 'State is not initialized')

export const deriveUninitializedState = (actions:Action[],
                                         zeroPage:string) : UninitialzedState =>
  assureType(deriveState(actions, zeroPage),
      UninitialzedState, 'State is already initialized')

export function getContainerStackOrder(actions:Action[], groupIndex:number,
                                       zeroPage:string) : Container[] {
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
    if (newState instanceof InitializedState && newState.activeGroupIndex === groupIndex) {
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
export function getIndexedContainerStackOrder(actions:Action[],
                                              groupIndex:number,
                                              zeroPage:string) : number[] {
  const stackOrder = getContainerStackOrder(actions, groupIndex, zeroPage)
  const values = _.map(stackOrder, (s, i) => ({index: s.index, i}))
  return _.map(_.sortBy(values, s => s.index), s => s.i)
}

export const getGroupState = (actions:Action[], groupIndex:number,
                              zeroPage:string) => {
  const state:InitializedState = deriveInitializedState(actions, zeroPage)
  const currentUrl:string = getCurrentPageInGroup(state, groupIndex).url
  const activeContainer:Container = getActiveContainer(state)
  const activeGroup:Group = getActiveGroup(state)
  const stackOrder:Container[] = getContainerStackOrder(actions, groupIndex, zeroPage)
  const indexedStackOrder:number[] =
      getIndexedContainerStackOrder(actions, groupIndex, zeroPage)
  return {activeContainer, activeGroup, currentUrl, stackOrder, indexedStackOrder}
}