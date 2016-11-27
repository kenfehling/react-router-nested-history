import * as _ from 'lodash';
import * as browser from '../../src/browserFunctions';

export const pushPage = (historyStack, page) => ({
  back: [...historyStack.back, historyStack.current],
  current: page,
  forward: []
});

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
export const diffStateForSteps = (oldState, newState) => {
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
    throw new Error("This should be used for back and forward");
  }
  else {
    return go(state, shiftAmount);
  }
<<<<<<< HEAD
};

export const constructNewStateForBackOrForward = (oldState, newCurrent) => ({
  ...oldState,
  browserHistory: constructNewBrowserHistory(oldState.browserHistory, newCurrent)
});
=======
};
>>>>>>> redux
