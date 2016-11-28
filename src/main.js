import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import { diffStateToSteps, deriveState, getActiveContainer, getContainerStackOrder } from './util/history';
import store from './store';
import * as _ from 'lodash';

const needsPop = [browser.back, browser.forward, browser.go];
let unlisten;

const getDerivedState = () => deriveState(store.getState());

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
  const tabsWithIndexes = tabs.map((tab, index) => ({...tab, index}));
  const patterns = _.flatMap(tabs, tab => tab.urlPatterns);
  store.dispatch(actions.setTabs(tabsWithIndexes, currentUrl));
  return {
    switchToTab: index => switchToTab(tabsWithIndexes[index]),
    getActiveContainer: () => getActiveContainer(store.getState(), patterns),
    getContainerStackOrder: () => getContainerStackOrder(store.getState(), patterns),
    addChangeListener: fn => store.subscribe(() => {
      const state = store.getState();
      fn({
        activeContainer: getActiveContainer(state, patterns),
        containerStackOrder: getContainerStackOrder(state, patterns)
      });
    })
  };
};

export const switchToTab = (tab) => store.dispatch(actions.switchToTab(tab));
export const push = (url) => store.dispatch(actions.push(url));
export const go = (n=1) => store.dispatch(actions.go(n));
export const back = (n=1) => store.dispatch(actions.back(n));
export const forward = (n=1) => store.dispatch(actions.forward(n));

store.subscribe(() => {
  const state = getDerivedState();
  switch(state.lastAction.type) {
    case SET_TABS: {
      browser.replace(state.browserHistory.current);
      break;
    }
    case SWITCH_TO_TAB: {
      const steps = diffStateToSteps(state.previousState, state).map(s => () => {
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