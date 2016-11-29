// @flow

import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import * as _ from 'lodash';
import { pathsMatch } from "../util/url";
import * as browser from '../../src/browserFunctions';
import * as behavior from '../behaviors/defaultTabBehavior';
import type { History, State, Container, Page, ContainerConfig, defaultState } from '../model';

export const switchToTab = (state: State, tab: Container) => ({
  ...state,
  ...behavior.switchToTab(state, tab),
  currentContainer: tab
});

export const pushToStack = (historyStack: History, page: Page) : History => ({
  back: [...historyStack.back, historyStack.current],
  current: page,
  forward: []
});

export const back = (historyStack: History) => ({
  back: _.initial(historyStack.back),
  current: _.last(historyStack.back),
  forward: [historyStack.current, ...historyStack.forward]
});

export const forward = (historyStack: History) => ({
  back: [...historyStack.back, historyStack.current],
  current: _.head(historyStack.forward),
  forward: _.tail(historyStack.forward)
});

export const updateTabHistory = (state: State, tab: Container, fn: Function) => {
  const index = _.findIndex(state.containers, c => c.group === tab.group && c.initialUrl === tab.initialUrl);
  return [
    ...state.containers.slice(0, index),
    {...state.containers[index], history: fn(state.containers[index])},
    ...state.containers.slice(index + 1)
  ];
};

export const push = (state: State, url: string) => {
  const tab = state.currentContainer;
  const id = state.lastId + 1;
  const page = {url: url, tab, id};
  return {
    ...state,
    browserHistory: pushToStack(state.browserHistory, page),
    tabs: updateTabHistory(state, tab, t => pushToStack(t, page)),
    lastId: id
  };
};

export function go(state: State, n: number) {
  const tab = state.currentContainer;
  if (n === 0) {
    return state;
  }
  else {
    const f = n < 0 ? back : forward;
    const browserHistory = f(state.browserHistory);
    const tabHistory = tab.history;
    const stack = n < 0 ? tabHistory.back : tabHistory.forward;
    const tabCanGo = stack.length > 0;
    const nextN = n < 0 ? n + 1 : n - 1;
    if (tabCanGo) {
      return go({
        ...state,
        browserHistory,
        tabs: updateTabHistory(state, tab, f)
      }, nextN);
    }
    else {
      return go({
        ...state,
        browserHistory,
        currentContainer: browserHistory.current.tab
      }, nextN);
    }
  }
}

export const getHistoryShiftAmount = (oldState, newCurrentId) => {
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
export const diffStateToSteps = (oldState, newState) => {
  const h1 = oldState.browserHistory;
  const h2 = newState.browserHistory;
  return _.flatten([
    _.isEmpty(h1.back) ? [] : {fn: browser.back, args: [h1.back.length]},
    _.isEmpty(h2.back) ? [] : _.map(h2.back, b => ({fn: browser.push, args: [b]})),
    {fn: browser.push, args: [h2.current]},
    _.isEmpty(h2.forward) ? [] : _.map(h2.forward, f => ({fn: browser.push, args: [f]})),
    _.isEmpty(h2.forward) ? [] : {fn: browser.back, args: [h2.forward.length]}
  ]);
};

export const constructNewHistory = (state, newCurrentId) => {
  const shiftAmount = getHistoryShiftAmount(state, newCurrentId);
  if (shiftAmount === 0) {
    console.error(state, newCurrentId);
    throw new Error("This should be used for back and forward");
  }
  else {
    return go(state, shiftAmount);
  }
};

export function reducer(state=defaultState, action) {
  switch (action.type) {
    case SET_TABS: {
      const {tabs, currentUrl} = action;
      const id = state.lastId + 1;
      const startState = {
        ...state,
        browserHistory: {
          ...state.browserHistory,
          current: state.browserHistory.current || {url: initialTabUrls[0], tab: 0, id}
        },
        tabHistories: [...state.tabHistories, ...tabs.map((t, i) => ({
          back: [],
          current: {url: t.initialUrl, tab: t, id: id + i},
          forward: []
        }))],
        currentContainer: state.currentContainer || 0,
        lastId: state.lastId || tabs.length
      };
      const initialTab = _.find(tabs, t => pathsMatch(t.initialUrl, currentUrl));
      if (initialTab) {
        if (initialTab.isDefault) {
          return state;
        }
        else {
          return switchToTab(startState, initialTab);
        }
      }
      const matchingTab = _.find(tabs, t => _.some(t.urlPatterns, p => pathsMatch(p, currentUrl)));
      if (matchingTab) {
        if (matchingTab.isDefault) {
          return push(startState, currentUrl);
        }
        else {
          return push(switchToTab(startState, matchingTab), currentUrl);
        }
      }
      return state;  // ignore, current URL doesn't match this container
    }
    case SWITCH_TO_TAB: {
      return switchToTab(state, action.tab);
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
  return state;
}

export const deriveState = (actionHistory) => {
  const lastAction = _.last(actionHistory);
  const previousState = _.initial(actionHistory).reduce((state, action) => reducer(state, action), defaultState);
  const finalState = reducer(previousState, lastAction);
  return {
    ...finalState,
    previousState,
    lastAction
  }
};

export function getContainerStackOrder(actionHistory, patterns=['*']) {
  const tabSwitchNumbers = [];
  actionHistory.reduce((oldState, action) => {
    const newState = reducer(oldState, action);
    if (oldState.currentContainer !== newState.currentContainer) {
      if (_.some(patterns, p => pathsMatch(p, newState.browserHistory.current.url))) {
        tabSwitchNumbers.push(newState.currentContainer);
      }
    }
    return newState;
  }, defaultState);
  return _.uniq(_.reverse(tabSwitchNumbers));
}

export function getActiveContainer(actionHistory, patterns=['*']) {
  return _.first(getContainerStackOrder(actionHistory, patterns));
}