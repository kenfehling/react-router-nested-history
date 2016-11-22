import * as behavior from './behaviors/defaultTabBehavior';
import { getState, setState } from './historyStore';
import { pushPage, popPage, goForward, updateTab } from './util/history';

export function switchToTab(tab) {
  const historyState = getState();
  const state = behavior.switchToTab({historyState, tab});
  setState({...state, currentTab: tab});
}

export function push(url) {
  const state = getState();
  const tab = state.currentTab;
  setState({
    ...state,
    browserHistory: pushPage(state.browserHistory, url, tab),
    tabHistories: updateTab(state, tab, t => pushPage(t, url, tab))
  });
}

export function _go(state, n) {
  const tab = state.currentTab;
  if (n === 0) {
    return state;
  }
  else {
    const f = n < 0 ? popPage : goForward;
    const browserHistory = f(state.browserHistory);
    const tabHistory = state.tabHistories[tab];
    const stack = n < 0 ? tabHistory.back : tabHistory.forward;
    const tabCanGo = stack.length > 0;
    const nextN = n < 0 ? n + 1 : n - 1;
    if (tabCanGo) {
      return _go({
        ...state,
        browserHistory,
        tabHistories: updateTab(state, tab, f)
      }, nextN);
    }
    else {
      return _go({
        ...state,
        browserHistory,
        currentTab: browserHistory.current.tab
      }, nextN);
    }
  }
}

export function go(n) {
  setState(_go(getState(), n));
}

export function back(n=1) {
  go(0 - n)
}

export function forward(n=1) {
  go(n)
}