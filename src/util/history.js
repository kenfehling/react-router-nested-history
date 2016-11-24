import * as _ from 'lodash';
import * as browser from '../../src/browserFunctions';

export const pushPage = (historyStack, page) => ({
  back: [...historyStack.back, historyStack.current],
  current: page,
  forward: []
});

export const popPage = (historyStack) => ({
  back: _.initial(historyStack.back),
  current: _.last(historyStack.back),
  forward: [historyStack.current, ...historyStack.forward]
});

export const goForward = (historyStack) => ({
  back: [...historyStack.back, historyStack.current],
  current: _.head(historyStack.forward),
  forward: _.tail(historyStack.forward)
});

export const updateTab = (state, tab, fn) => [
  ...state.tabHistories.slice(0, tab),
  fn(state.tabHistories[tab]),
  ...state.tabHistories.slice(tab + 1)
];

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {Object} The original historyStore state
 * @param newState {Object} The new historyStore state
 * @returns {[Object]} An array of steps to get from old state to new state
 */
export const diffState = (oldState, newState) => {
  const oldHistory = oldState.browserHistory;
  const newHistory = newState.browserHistory;
  const current = newHistory.current;

  if (!_.isEmpty(oldHistory.back)) {
    const i = _.findIndex(oldHistory.back, b => b.id === current.id);
    if (i !== -1) {
      return [{fn: browser.back, args: [_.size(oldHistory.back) - i]}];
    }
  }

  if (!_.isEmpty(oldHistory.forward)) {
    const i = _.findIndex(oldHistory.forward, b => b.id === current.id);
    if (i !== -1) {
      return [{fn: browser.forward, args: [i + 1]}];
    }
  }

  if (!_.isEmpty(newHistory.back)) {
    if (oldHistory.current.id === _.last(newHistory.back).id) {
      return [{fn: browser.pushState, args: [current]}];
    }
  }
};