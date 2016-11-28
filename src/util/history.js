import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import * as _ from 'lodash';
import { pathsMatch } from "../util/url";
import * as browser from '../../src/browserFunctions';
import * as behavior from '../behaviors/defaultTabBehavior';

const initialState = {
  browserHistory: {
    back: [],
    current: null,
    forward: []
  },
  tabHistories: [],
  currentTab: 0,
  lastId: 0
};

export const switchToTab = (state, tab) => ({
  ...state,
  ...behavior.switchToTab({historyState: state, tab}),
  currentTab: tab.index
});

export const pushToStack = (historyStack, page) => ({
  back: [...historyStack.back, historyStack.current],
  current: page,
  forward: []
});

export const push = (state, url) => {
  const tab = state.currentTab;
  const id = state.lastId + 1;
  const page = {url: url, tab, id};
  return {
    ...state,
    browserHistory: pushToStack(state.browserHistory, page),
    tabHistories: updateTab(state, tab, t => pushToStack(t, page)),
    lastId: id
  };
};

export const back = (historyStack) => ({
  back: _.initial(historyStack.back),
  current: _.last(historyStack.back),
  forward: [historyStack.current, ...historyStack.forward]
});

export const forward = (historyStack) => ({
  back: [...historyStack.back, historyStack.current],
  current: _.head(historyStack.forward),
  forward: _.tail(historyStack.forward)
});

export const updateTab = (state, tab, fn) => [
  ...state.tabHistories.slice(0, tab),
  fn(state.tabHistories[tab]),
  ...state.tabHistories.slice(tab + 1)
];

export function go(state, n) {
  const tab = state.currentTab;
  if (n === 0) {
    return state;
  }
  else {
    const f = n < 0 ? back : forward;
    const browserHistory = f(state.browserHistory);
    const tabHistory = state.tabHistories[tab];
    const stack = n < 0 ? tabHistory.back : tabHistory.forward;
    const tabCanGo = stack.length > 0;
    const nextN = n < 0 ? n + 1 : n - 1;
    if (tabCanGo) {
      return go({
        ...state,
        browserHistory,
        tabHistories: updateTab(state, tab, f)
      }, nextN);
    }
    else {
      return go({
        ...state,
        browserHistory,
        currentTab: browserHistory.current.tab
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

export function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_TABS: {
      const {tabs, currentUrl} = action;
      const tabUrlPatterns = tabs.map(tab => tab.urlPatterns);
      const initialTabUrls = tabs.map(tab => tab.initialUrl);
      const id = state.lastId + 1;
      const startState = {
        ...state,
        browserHistory: {
          ...state.browserHistory,
          current: state.browserHistory.current || {url: initialTabUrls[0], tab: 0, id}
        },
        tabHistories: [...state.tabHistories, ...initialTabUrls.map((url, i) => ({
          back: [],
          current: {url, tab: i, id: id + i},
          forward: []
        }))],
        currentTab: state.currentTab || 0,
        lastId: state.lastId || initialTabUrls.length
      };
      if (currentUrl === initialTabUrls[0]) {
        return startState;
      }
      else {
        const tabIndex = initialTabUrls.indexOf(currentUrl);
        if (tabIndex >= 0) {
          return switchToTab(startState, tabs[tabIndex]);
        }
        else {
          const tab = _.findIndex(tabUrlPatterns, patterns =>
              _.some(patterns, pattern => pathsMatch(pattern, currentUrl)));
          if (tab >= 0) {
            return push(switchToTab(startState, tab), currentUrl);
          }
          else {
            return state;  // ignore because this doesn't match this container
          }
        }
      }
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
  const previousState = _.initial(actionHistory).reduce((state, action) => reducer(state, action), initialState);
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
    if (oldState.currentTab !== newState.currentTab) {
      if (_.some(patterns, p => pathsMatch(p, newState.browserHistory.current.url))) {
        tabSwitchNumbers.push(newState.currentTab);
      }
    }
    return newState;
  }, initialState);
  return _.uniq(_.reverse(tabSwitchNumbers));
}

export function getActiveContainer(actionHistory, patterns=['*']) {
  return _.first(getContainerStackOrder(actionHistory, patterns));
}