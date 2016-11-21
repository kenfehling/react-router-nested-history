import * as behavior from './behaviors/defaultTabBehavior';
import { getState, setState } from './historyStore';
import { pushPage, popPage, updateTab } from './util/history';

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

export function go(n) {

}

export function back(n=1) {
  const state = getState();
  const tab = state.currentTab;
  setState({
    ...state,
    browserHistory: popPage(state.browserHistory),
    tabHistories: updateTab(state, tab, popPage)
  });
}

export function forward(n=1) {
  const state = getState();

}