import * as _ from "lodash";

const initialState = {
  browserHistory: {
    back: [],
    current: null,
    forward: []
  },
  currentTab: 0,
  tabHistories: []
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