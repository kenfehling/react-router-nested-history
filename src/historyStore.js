import * as _ from "lodash";

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

let _state = initialState;

export function getState() {
  return _.clone(_state);
}

export function setState(state) {
  _state = {..._state, ...state};
}

export function clearState() {
  _state = initialState;
}