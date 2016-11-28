import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import * as utils from '../util/history';
import * as _ from 'lodash';
import {pathsMatch} from "../util/url";

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

export function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_TABS: {
      const {tabs, currentUrl} = action;
      const initialTabUrls = tabs.map(tab => tab.initialUrl);
      const tabUrlPatterns = tabs.map(tab => tab.urlPatterns);
      const id = state.lastId + 1;
      const startState = {
        ...state,
        browserHistory: {
          back: [],
          current: {url: initialTabUrls[0], tab: 0, id},
          forward: []
        },
        tabHistories: initialTabUrls.map((url, i) => ({
          back: [],
          current: {url, tab: i, id: id + i},
          forward: []
        })),
        currentTab: 0,
        lastId: initialTabUrls.length
      };
      if (currentUrl === initialTabUrls[0]) {
        return startState;
      }
      else {
        const tab = initialTabUrls.indexOf(currentUrl);
        if (tab >= 0) {
          return utils.switchToTab(startState, tab);
        }
        else {
          const tab = _.findIndex(tabUrlPatterns, patterns =>
              _.some(patterns, pattern => pathsMatch(pattern, currentUrl)));
          if (tab < 0) {
            throw new Error('Tab not found for url: ' + currentUrl);
          }
          return utils.push(utils.switchToTab(startState, tab), currentUrl);
        }
      }
    }
    case SWITCH_TO_TAB: { return utils.switchToTab(state, action.tab); }
    case PUSH: { return utils.push(state, action.url); }
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