import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
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
  lastId: 0,
  lastAction: null,
  lastState: null
};

export function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_TABS: {
      const id = ++state.lastId;
      return {
        ...state,
        browserHistory: {
          back: [],
          current: {url: action.initialUrls[0], tab: 0, id},
          forward: []
        },
        tabHistories: action.initialUrls.map((url, i) => ({
          back: [],
          current: {url, tab: i, id: id + i + 1},
          forward: []
        })),
        currentTab: 0,
        lastId: id + action.initialUrls.length + 1
      };
    }
    case SWITCH_TO_TAB: {
      const newState = switchToTab({historyState: state, tab: action.tab});
      return {...state, ...newState, currentTab: action.tab};
    }
    case PUSH: {
      const tab = state.currentTab;
      const id = state.lastId + 1;
      const page = {url: action.url, tab, id};
      return {
        ...state,
        browserHistory: utils.pushPage(state.browserHistory, page),
        tabHistories: utils.updateTab(state, tab, t => utils.pushPage(t, page)),
        lastId: id
      };
    }
    case BACK: { return {...state, ...utils.go(state, 0 - action.n || -1)}; }
    case FORWARD:
    case GO: { return {...state, ...utils.go(state, action.n || 1)}; }
    case POPSTATE: {
      return {
        ...state,
        ...utils.constructNewHistory(state, action.id)
      }
    }
  }
  return state;
}

export default function(state=initialState, action) {
  return {...reducer(state, action), lastAction: action.type, lastState: state};
}