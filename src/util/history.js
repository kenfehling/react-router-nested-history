// @flow

import { CREATE_CONTAINER, INIT_GROUP, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import * as _ from 'lodash';
import fp from 'lodash/fp';
import { pushToStack, back, forward } from './core';
import * as browser from '../browserFunctions';
import { switchContainer, loadGroupFromUrl } from '../behaviorist';
import type { History, State, StateSnapshot, Container, Page, Group, Step } from '../types';

export const push = (oldState:State, url:string):State => {
  const state = _.cloneDeep(oldState);
  const group = state.groups[state.activeGroupIndex];
  const container = group.containers[group.history.current.containerIndex];
  const id = state.lastPageId + 1;
  const page = {url, id, containerIndex: container.index};
  container.history = pushToStack(container.history, page);
  group.history = pushToStack(group.history, page);
  state.lastPageId = id
  return state
};

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
    const i = _.findIndex(oldHistory.back, b => b.id === newCurrentId);
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
  const group1:?Group = oldState ? oldState.groups[oldState.activeGroupIndex] : null;
  const group2:Group = newState.groups[newState.activeGroupIndex];
  const h1:?History = group1 ? group1.history : null;
  const h2:History = group2.history;
  if (_.isEqual(h1, h2)) {
    return []
  }
  return _.flatten([
    h1 ? {fn: browser.back, args: [h1.back.length + 1]} : [],
    _.isEmpty(h2.back) ? [] : _.map(h2.back, b => ({fn: browser.push, args: [b]})),
    {fn: browser.push, args: [h2.current, true]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, f => ({fn: browser.push, args: [f]})),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ])
}

export const constructNewHistory = (state:State, newCurrentId:number) : State => {
  const shiftAmount = getHistoryShiftAmount(state, newCurrentId)
  if (shiftAmount === 0) {
    return state
    //console.error(state, newCurrentId);
    //throw new Error("This should be used for back and forward");
  }
  else {
    return go(state, shiftAmount)
  }
};

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
      case INIT_GROUP: {
        return loadGroupFromUrl(state, action.groupIndex, action.currentUrl)
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

export const reduceAll = (state:?State, actions:Object[]) : State => actions.reduce(reducer, state);

export const deriveState = (actionHistory:Object[]) : ?StateSnapshot => {
  if (actionHistory.length === 0) {
    return null
  }
  else {
    const lastAction = _.last(actionHistory)
    const previousState = _.initial(actionHistory).reduce((state, action) =>
        reducer(state, action), null)
    const finalState = reducer(previousState, lastAction)
    return {
      ...finalState,
      previousState,
      lastAction
    }
  }
};

export function getContainerStackOrder(actionHistory:Object[], groupIndex:number) : Container[] {
  if (actionHistory.length === 0) {
    throw new Error("No actions in history");
  }
  const containerSwitches:Container[] = [];
  actionHistory.reduce((oldState:?State, action:Object) : State => {
    const newState:State = reducer(oldState, action);
    if (action.type === CREATE_CONTAINER) {
      const group:Group = _.last(newState.groups);
      fp.reverse(group.containers).forEach(c => containerSwitches.push(c));
    }
    if (newState.activeGroupIndex === groupIndex) {
      const newGroup:Group = newState.groups[groupIndex];
      const oldGroup:?Group = oldState ? getActiveGroup(oldState) : null;
      const oldContainerIndex:?number = oldGroup? oldGroup.history.current.containerIndex : null;
      const newContainerIndex:number = newGroup.history.current.containerIndex;
      if (!oldGroup || oldGroup.index !== newGroup.index || oldContainerIndex !== newContainerIndex) {
        const container = newGroup.containers[newContainerIndex];
        containerSwitches.push(container);
      }
    }
    return newState;
  }, null);
  return _.uniqBy(fp.reverse(containerSwitches), c => c.index);
}

/**
 * Gets the stack order values as numbers, in container order instead of stack order
 */
export function getIndexedContainerStackOrder(actionHistory:Object[], groupIndex:number) : number[] {
  const stackOrder = getContainerStackOrder(actionHistory, groupIndex);
  const values = _.map(stackOrder, (s, i) => ({index: s.index, i}));
  return _.map(_.sortBy(values, s => s.index), s => s.i);
}

export function getContainer(state:State, groupIndex:number, index:number):Container {
  return state.groups[groupIndex].containers[index];
}

export function getActiveGroup(state:State):Group {
  return state.groups[state.activeGroupIndex];
}

export function getActiveContainer(group:Group):Container {
  return group.containers[group.history.current.containerIndex];
}

/**
 * @returns {boolean} true if page is active in any group
 */
export function isPageActive(state:State, id:number):boolean {
  return _.some(state.groups, group => group.history.current.id === id);
}