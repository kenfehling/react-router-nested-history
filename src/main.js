import * as behavior from './behaviors/defaultTabBehavior';
import { getState, setState } from './historyStore';
import * as _ from 'lodash';

const _pushPage = (history, href) => ({
  back: [...history.back, history.current],
  current: href,
  forward: []
});

const _popPage = (history) => ({
  back: _.initial(history.back),
  current: _.last(history.back),
  forward: [history.current, ...history.forward]
});

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

export function push(href) {
  const state = getState();
  const tabIndex = state.currentTab;
  setState({
    ...state,
    browserHistory: _pushPage(state.browserHistory, href),
    tabHistories: _updateTab(state, tabIndex, tab => _pushPage(tab, href))
  });
}

export function pop() {
  const state = getState();
  const tabIndex = state.currentTab;
  setState({
    ...state,
    browserHistory: _popPage(state.browserHistory),
    tabHistories: _updateTab(state, tabIndex, _popPage)
  });
}