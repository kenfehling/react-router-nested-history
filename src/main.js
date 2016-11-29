// @flow

import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import { diffStateToSteps, deriveState, getActiveContainer, getContainerStackOrder } from './util/history';
import store from './store';
import * as _ from 'lodash';
import type { Container, ContainerConfig } from './model';

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

export const setTabs = (tabs: ContainerConfig) => {
  const currentUrl = window.location.pathname;
  const patterns = _.flatMap(tabs, tab => tab.urlPatterns);
  store.dispatch(actions.setTabs(tabs, currentUrl));
  return {
    switchToTab: (index: number) => switchToTab(tabs[index]),
    getActiveContainer: () => getActiveContainer(store.getState(), patterns),
    getContainerStackOrder: () => getContainerStackOrder(store.getState(), patterns),
    addChangeListener: (fn: Function) => store.subscribe(() => {
      const state = store.getState();
      fn({
        activeContainer: getActiveContainer(state, patterns),
        containerStackOrder: getContainerStackOrder(state, patterns)
      });
    })
  };
};

export const switchToTab = (tab: Container) => store.dispatch(actions.switchToTab(tab));
export const push = (url: string) => store.dispatch(actions.push(url));
export const go = (n:number=1) => store.dispatch(actions.go(n));
export const back = (n:number=1) => store.dispatch(actions.back(n));
export const forward = (n:number=1) => store.dispatch(actions.forward(n));

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