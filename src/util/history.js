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

export const getHistoryShiftAmount = (oldHistory, newCurrent) => {
  if (!newCurrent) {
    throw new Error("newCurrent must be defined");
  }
  if (!newCurrent.id) {
    throw new Error("newCurrent must have an id. Received:", newCurrent);
  }
  if (!_.isEmpty(oldHistory.back)) {
    const i = _.findIndex(oldHistory.back, b => b.id === newCurrent.id);
    if (i !== -1) {
      return 0 - _.size(oldHistory.back) - i;
    }
  }
  if (!_.isEmpty(oldHistory.forward)) {
    const i = _.findIndex(oldHistory.forward, b => b.id === newCurrent.id);
    if (i !== -1) {
      return i + 1;
    }
  }
  return 0;
};

export const shiftHistory = (oldHistory, amount) => {
  const f = amount > 0 ? forward : back;
  const n = amount > 0 ? amount - 1 : amount + 1;
  return n === 0 ? f(oldHistory) : shiftHistory(f(oldHistory), n);
};

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {Object} The original historyStore state
 * @param newState {Object} The new historyStore state
 * @returns {[Object]} An array of steps to get from old state to new state
 */
export const diffStateForSteps = (oldState, newState) => {
  const oldHistory = oldState.browserHistory;
  const newHistory = newState.browserHistory;
  const newCurrent = newHistory.current;
  const shiftAmount = getHistoryShiftAmount(oldHistory, newCurrent);
  if (shiftAmount === 0) {
    if (!_.isEmpty(newHistory.back)) {
      if (oldHistory.current.id === _.last(newHistory.back).id) {
        return [{fn: browser.push, args: [newCurrent]}];
      }
    }
  }
  else {
    return [{fn: browser.go, args: [shiftAmount]}];
  }
};

export const constructNewBrowserHistory = (oldHistory, newCurrent) => {
  const shiftAmount = getHistoryShiftAmount(oldHistory, newCurrent);
  if (shiftAmount === 0) {
    throw new Error("This should be used for back and forward");
  }
  else {
    return shiftHistory(oldHistory, shiftAmount);
  }
};

export const constructNewState = (oldState, newCurrent) => ({
  ...oldState,
  browserHistory: constructNewBrowserHistory(oldState.browserHistory, newCurrent)
});