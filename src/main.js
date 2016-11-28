import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import { diffStateForSteps } from './util/history';
import store from './store';
import * as _ from 'lodash';

const needsPop = [browser.back, browser.forward, browser.go];
let unlisten;

const startListening = () => {
  unlisten = listen(location => {
    store.dispatch(actions.popstate(location.state.id));
  });
};

const unlistenPromise = () => new Promise(resolve => {
  unlisten();
  return resolve();
});

const startListeningPromise = () => new Promise(resolve => {
  startListening();
  return resolve();
});

startListening();

export const setTabs = (tabs) => {
  const currentUrl = window.location.pathname;
  store.dispatch(actions.setTabs(tabs, currentUrl));
};

export const switchToTab = (tab) => store.dispatch(actions.switchToTab(tab));
export const push = (url) => store.dispatch(actions.push(url));
export const go = (n=1) => store.dispatch(actions.go(n));
export const back = (n=1) => store.dispatch(actions.back(n));
export const forward = (n=1) => store.dispatch(actions.forward(n));

export const getCurrentTab = () => {
  const state = store.getState();
  return state.browserHistory.current.tab;
};

store.subscribe(() => {
  const state = store.getState();
  switch(state.lastAction) {
    case SET_TABS: {
      browser.replace(state.browserHistory.current);
      break;
    }
    case SWITCH_TO_TAB: {
      const steps = diffStateForSteps(state.lastState, state).map(s => () => {
        s.fn(...s.args);
        return _.includes(needsPop, s.fn) ? listenPromise() : Promise.resolve();
      });
      [unlistenPromise, ...steps, startListeningPromise].reduce(
        (p, step) => p.then(step),
        Promise.resolve()
      );
      break;
    }
    case PUSH: {
      browser.push(state.browserHistory.current);
      break;
    }
    case BACK: {
      break;
    }
    case FORWARD: {
      break;
    }
    case GO: {
      break;
    }
    case POPSTATE: {
      break;
    }
  }
});