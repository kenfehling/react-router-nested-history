import * as _ from 'lodash';

export const pushPage = (history, href) => ({
  back: [...history.back, history.current],
  current: href,
  forward: []
});

export const popPage = (history) => ({
  back: _.initial(history.back),
  current: _.last(history.back),
  forward: [history.current, ...history.forward]
});

export const updateTab = (state, tabIndex, fn) => [
  ...state.tabHistories.slice(0, tabIndex),
  fn(state.tabHistories[tabIndex]),
  ...state.tabHistories.slice(tabIndex + 1)
];
