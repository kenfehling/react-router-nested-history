// @flow

import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import { diffStateToSteps, deriveState, getActiveContainer, getContainerStackOrder } from './util/history';
import store from './store';
import * as _ from 'lodash';
import type { Container, ContainerConfig, StateSnapshot } from './types';

const needsPop = [browser.back, browser.forward, browser.go];
let unlisten;

const getDerivedState = () : StateSnapshot => deriveState(store.getState());

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

export const setContainers = (containers: ContainerConfig[]) => {
  const currentUrl = window.location.pathname;
  const patterns = _.flatMap(containers, container => container.urlPatterns);
  store.dispatch(actions.setContainers(containers, currentUrl));

  console.log(containers);

  return {

    //TODO: Here `containers` is of type ContainerConfig[] but we need Container[]
    switchTo: (index:number) => switchToContainer(containers[index]),

    getActive: () => getActiveContainer(store.getState(), patterns),
    getStackOrder: () => getContainerStackOrder(store.getState(), patterns),
    addChangeListener: (fn:Function) => store.subscribe(() => {
      const state = store.getState();
      fn({
        active: getActiveContainer(state, patterns),
        stackOrder: getContainerStackOrder(state, patterns)
      });
    })
  };
};

export const switchToContainer = (container:Container) =>
    store.dispatch(actions.switchToContainer(container));
export const push = (url:string) => store.dispatch(actions.push(url));
export const go = (n:number=1) => store.dispatch(actions.go(n));
export const back = (n:number=1) => store.dispatch(actions.back(n));
export const forward = (n:number=1) => store.dispatch(actions.forward(n));

store.subscribe(() => {
  const state = getDerivedState();
  switch(state.lastAction.type) {
    case SET_CONTAINERS: {
      browser.replace(state.browserHistory.current);
      break;
    }
    case SWITCH_TO_CONTAINER: {
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