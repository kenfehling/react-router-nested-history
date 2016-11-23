import * as _ from 'lodash';
import { pushState } from '../../src/browserFunctions';

export const pushPage = (historyStack, url, tab) => ({
  back: [...historyStack.back, historyStack.current],
  current: {url, tab},
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

export const diffState = (oldState, newState) => {
  const oldHistory = oldState.browserHistory;
  const newHistory = newState.browserHistory;

  // TODO: We should probably store IDs in each history item so we can uniquely identify
  if (oldHistory.current.url === _.last(newHistory.back).url) {
    return [{fn: pushState, args: [newHistory.current.url]}];
  }
};