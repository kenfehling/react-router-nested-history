// @flow

import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import * as _ from 'lodash';
import { patternsMatch , pathsMatch} from "../util/url";
import * as browser from '../../src/browserFunctions';
import * as behavior from '../behaviors/defaultBehavior';
import type { History, ContainerHistory, BrowserHistory, State, StateSnapshot, Container, ContainerConfig, Page } from '../types';

export const switchToContainer = (state:State, container: Container) => ({
  ...state,
  ...behavior.switchToContainer(state, container)
});

export const pushToStack = (historyStack:History, page:Page) : History => ({
  back: [...historyStack.back, historyStack.current],
  current: page,
  forward: []
});

export const back = (historyStack:History) : History => ({
  back: _.initial(historyStack.back),
  current: _.last(historyStack.back),
  forward: [historyStack.current, ...historyStack.forward]
});

export const forward = (historyStack:History) : History => ({
  back: [...historyStack.back, historyStack.current],
  current: _.head(historyStack.forward),
  forward: _.tail(historyStack.forward)
});

export const updateContainerHistory = (state:State, container:Container, fn:Function) : Container[] => {
  const index:number = _.findIndex(state.containers, c => c.group === container.group && c.initialUrl === container.initialUrl);
  if (index < 0) {
    throw new Error('Index not found');
  }
  return [
    ...state.containers.slice(0, index),
    {...state.containers[index], history: fn(state.containers[index])},
    ...state.containers.slice(index + 1)
  ];
};

export const push = (state:State, url:string):State => {
  const container = state.browserHistory.current.container;
  const id = state.lastId + 1;
  return {
    ...state,
    browserHistory: pushToStack(state.browserHistory, {url, container, id}),
    containers: updateContainerHistory(state, container, c => pushToStack(c.history, {url, id})),
    lastId: id
  };
};

export function go(state:State, n:number) : State {
  const container = state.browserHistory.current.container;
  if (n === 0) {
    return state;
  }
  else {
    const f = n < 0 ? back : forward;
    const browserHistory = f(state.browserHistory);
    const containerHistory = container.history;
    const stack = n < 0 ? containerHistory.back : containerHistory.forward;
    const containerCanGo = stack.length > 0;
    const nextN = n < 0 ? n + 1 : n - 1;
    if (containerCanGo) {
      return go({
        ...state,
        browserHistory,
        containers: updateContainerHistory(state, container, f)
      }, nextN);
    }
    else {
      return go({
        ...state,
        browserHistory,
      }, nextN);
    }
  }
}

export const getHistoryShiftAmount = (oldState:State, newCurrentId:number) :number => {
  const oldHistory = oldState.browserHistory;
  if (!_.isEmpty(oldHistory.back)) {
    const i = _.findIndex(oldHistory.back, b => b.id === newCurrentId);
    if (i !== -1) {
      return 0 - (_.size(oldHistory.back) - i);
    }
  }
  if (!_.isEmpty(oldHistory.forward)) {
    const i = _.findIndex(oldHistory.forward, b => b.id === newCurrentId);
    if (i !== -1) {
      return i + 1;
    }
  }
  return 0;
};

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {Object} The original historyStore state
 * @param newState {Object} The new historyStore state
 * @returns {[Object]} An array of steps to get from old state to new state
 */
export const diffStateToSteps = (oldState:State, newState:State) : Object[] => {
  const h1 = oldState.browserHistory;
  const h2 = newState.browserHistory;
  return _.flatten([
    [{fn: browser.back, args: [h1.back.length + 1]}],
    _.isEmpty(h2.back) ? [] : _.map(h2.back, b => ({fn: browser.push, args: [b.url]})),
    {fn: browser.push, args: [h2.current.url]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, f => ({fn: browser.push, args: [f.url]})),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ]);
};

export const constructNewHistory = (state:State, newCurrentId:number) : State => {
  const shiftAmount = getHistoryShiftAmount(state, newCurrentId);
  if (shiftAmount === 0) {
    console.error(state, newCurrentId);
    throw new Error("This should be used for back and forward");
  }
  else {
    return go(state, shiftAmount);
  }
};

export function reducer(state:?State, action:Object) : State {

  if (state && !state.browserHistory) {
    throw new Error("WHY");
  }

  switch (action.type) {
    case SET_CONTAINERS: {
      const containerConfigs:ContainerConfig[] = action.containers;
      const currentUrl:string = action.currentUrl;
      const id = (state ? state.lastId : 0) + 1;
      const group = (state ? state.lastGroup : 0) + 1;
      const containers:Container[] = [
        ...(state ? state.containers : []),
        ...containerConfigs.map((c, i) => ({
          ...c,
          history: {
            back: [],
            current: {url: c.initialUrl, id: id + i},
            forward: []
          },
          isDefault: i === 0,
          group,
          index: i
        }))
      ];
      const defaultContainer:Container = containers[0];
      const startState:State = {
        ...(state ? state : {}),
        browserHistory: {
          ...(state ? state.browserHistory : {}),
          current: state ? state.browserHistory.current : {
            url: defaultContainer.initialUrl,
            container: defaultContainer,
            id
          },
          back: state ? state.browserHistory.back : [],
          forward: state ? state.browserHistory.forward : []
        },
        containers,
        lastId: (state ? state.lastId : 0) + containerConfigs.length,
        lastGroup: group
      };
      const initialContainer:Container =
          _.find(containers, c => pathsMatch(c.initialUrl, currentUrl));
      if (initialContainer) {
        if (initialContainer.isDefault) {
          return startState;
        }
        else {
          return switchToContainer(startState, initialContainer);
        }
      }
      const matchingContainer:Container =
          _.find(containers, c => patternsMatch(c.urlPatterns, currentUrl));
      if (matchingContainer) {
        if (matchingContainer.isDefault) {
          return push(startState, currentUrl);
        }
        else {
          return push(switchToContainer(startState, matchingContainer), currentUrl);
        }
      }
    }
  }
  if (!state) {
    throw new Error("State not yet initialized");
  }
  else {
    switch (action.type) {
      case SWITCH_TO_CONTAINER: {
        return switchToContainer(state, action.container);
      }
      case PUSH: { return push(state, action.url); }
      case BACK: { return {...state, ...go(state, 0 - action.n || -1)}; }
      case FORWARD:
      case GO: { return {...state, ...go(state, action.n || 1)}; }
      case POPSTATE: {
        return {
          ...state,
          ...constructNewHistory(state, action.id)
        }
      }
    }
  }
  return state;
}

export const deriveState = (actionHistory:Object[]) : StateSnapshot => {
  const lastAction = _.last(actionHistory);
  const previousState = _.initial(actionHistory).reduce((state, action) => reducer(state, action), null);
  const finalState = reducer(previousState, lastAction);
  return {
    ...finalState,
    previousState,
    lastAction
  }
};

export function getContainerStackOrder(actionHistory:Object[], patterns:string[]=['*']) : Container[] {
  if (actionHistory.length === 0) {
    throw new Error("No actions in history");
  }
  const containerSwitches:Container[] = [];
  const matches = (path:string) => patternsMatch(patterns, path);

  actionHistory.reduce((oldState:?State, action:Object) : State => {
    const newState = reducer(oldState, action);
    if (action.type === SET_CONTAINERS) {
      if (matches(newState.containers[0].initialUrl)) {  // if one matches, they all match
        _.each(_.reverse(newState.containers), c => containerSwitches.push(c));
      }
    }
    else {
      const oldCurrent = oldState ? oldState.browserHistory.current.container.initialUrl : null;
      const newCurrent = newState.browserHistory.current.container.initialUrl;
      if ((!oldState || oldCurrent !== newCurrent) && matches(newCurrent)) {
        containerSwitches.push(newState.browserHistory.current.container);
      }
    }
    return newState;
  }, null);
  return _.uniq(_.reverse(containerSwitches));
}

export function getActiveContainer(actionHistory:Object[], patterns:string[]=['*']) : Container {
  return _.first(getContainerStackOrder(actionHistory, patterns));
}