import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import { diffStateForSteps } from './util/history';
import store from './store';

let unlisten;

const startListening = () => {
  unlisten = listen(location => {
    store.dispatch(actions.popstate(location));
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

export const setTabs = (...initialUrls) => store.dispatch(actions.setTabs(initialUrls));
export const switchToTab = (tab) => store.dispatch(actions.switchToTab(tab));
export const push = (url) => store.dispatch(actions.push(url));
export const go = (n=1) => store.dispatch(actions.go(n));
export const back = (n=1) => store.dispatch(actions.back(n));
export const forward = (n=1) => store.dispatch(actions.forward(n));

store.subscribe(() => {
  const state = store.getState();
  switch(state.lastAction) {
    case SET_TABS: {
      console.log(state);
      browser.replace(state.browserHistory.current);
      break;
    }
    case SWITCH_TO_TAB: {
      const steps = diffStateForSteps(state.lastState, state).map(s => () => {
        s.fn(...s.args);
        if (s.fn === browser.back || s.fn === browser.forward || s.fn === browser.go) {
          return listenPromise();
        }
        else {
          return Promise.resolve();
        }
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