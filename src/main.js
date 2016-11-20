import * as behavior from './behaviors/defaultTabBehavior';
import { getState, setState } from './historyStore';

const _pushPage = (history, href) =>
  ({back: [...history.back, history.current], current: href, forward: []});

const _updateTab = (state, tabIndex, fn) => [
  ...state.tabHistories.slice(0, tabIndex),
  fn(state.tabHistories[tabIndex]),
  ...state.tabHistories.slice(tabIndex + 1)
];

export function switchTab(fromIndex, toIndex) {
  const historyState = getState();
  const state = behavior.switchTab({historyState, fromIndex, toIndex});
  setState({...state, currentTab: toIndex});
}

export function pushPage(href) {
  const state = getState();
  const tabIndex = state.currentTab;
  setState({
    ...state,
    browserHistory: _pushPage(state.browserHistory, href),
    tabHistories: _updateTab(state, tabIndex, tab => _pushPage(tab, href))
  });
}