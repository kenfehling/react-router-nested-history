import { SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO } from "../constants/ActionTypes";
import * as utils from '../util/history';
import { switchToTab } from '../behaviors/defaultTabBehavior';

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

function go(state, n) {
  const tab = state.currentTab;
  if (n === 0) {
    return state;
  }
  else {
    const f = n < 0 ? utils.back : utils.forward;
    const browserHistory = f(state.browserHistory);
    const tabHistory = state.tabHistories[tab];
    const stack = n < 0 ? tabHistory.back : tabHistory.forward;
    const tabCanGo = stack.length > 0;
    const nextN = n < 0 ? n + 1 : n - 1;
    if (tabCanGo) {
      return go({
        ...state,
        browserHistory,
        tabHistories: utils.updateTab(state, tab, f)
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

export default (state=initialState, action) => {
  switch (action.type) {
    case SWITCH_TO_TAB:
      const newState = switchToTab({historyState: state, tab: action.tab});
      return {...state, ...newState, currentTab: action.tab};
    case PUSH:
      const tab = state.currentTab;
      const id = state.lastId + 1;
      const page = {url: action.url, tab, id};
      return {
        ...state,
        browserHistory: utils.pushPage(state.browserHistory, page),
        tabHistories: utils.updateTab(state, tab, t => utils.pushPage(t, page)),
        lastId: id
      };
    case BACK:
      return {...state, ...go(state, 0 - action.n || -1)};
    case FORWARD:
    case GO:
      return {...state, ...go(state, action.n || 1)};
  }
  return state;
};