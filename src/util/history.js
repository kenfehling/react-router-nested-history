import * as _ from 'lodash';

export const pushPage = (history, url, tab) => ({
  back: [...history.back, history.current],
  current: {url, tab},
  forward: []
});

export const popPage = (history) => ({
  back: _.initial(history.back),
  current: _.last(history.back),
  forward: [history.current, ...history.forward]
});

export const updateTab = (state, tab, fn) => [
  ...state.tabHistories.slice(0, tab),
  fn(state.tabHistories[tab]),
  ...state.tabHistories.slice(tab + 1)
];
