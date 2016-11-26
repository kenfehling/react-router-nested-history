import * as fakeMain from './main';
import * as browser from './browserFunctions';
import { listen } from './historyListener';
import { constructNewStateForBackOrForward, diffStateForSteps } from './util/history';
import { getState, setState } from './historyStore';

listen(location => {
  const oldState = getState();
  const newState = constructNewStateForBackOrForward(oldState, location.state);
  setState(newState);
});

export function setTabs(...initialUrls) {
  const state = getState();
  const id = ++state.lastId;
  setState({
    browserHistory: {
      back: [],
      current: {url: initialUrls[0], tab: 0, id},
      forward: []
    },
    tabHistories: initialUrls.map((url, i) => ({
      back: [],
      current: {url, tab: i, id: id + i + 1},
      forward: []
    })),
    currentTab: 0,
    lastId: id + initialUrls.length + 1
  });
  browser.replace({url: initialUrls[0], id});
}

export function push(url) {
  fakeMain.push(url);
  browser.push(getState().browserHistory.current);
}

export function switchToTab(index) {
  const oldState = getState();
  fakeMain.switchToTab(index);
  const newState = getState();
  const steps = diffStateForSteps(oldState, newState);
  const promises = steps.map(step => new Promise((resolve, reject) => {
    return resolve(step.fn(...step.args));
  }));
  Promise.all(promises);
}