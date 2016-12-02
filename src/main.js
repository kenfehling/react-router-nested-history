// @flow

import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import { diffStateToSteps, deriveState, getInsertedContainers, getActiveContainer, getContainerStackOrder, getIndexedContainerStackOrder } from './util/history';
import store from './store';
import * as _ from 'lodash';
import type { Container, ContainerConfig, StateSnapshot, Step } from './types';

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

export const setContainers = (containerConfigs: ContainerConfig[]) => {
  const currentUrl = window.location.pathname;
  const patterns = _.flatMap(containerConfigs, container => container.urlPatterns);
  store.dispatch(actions.setContainers(containerConfigs, currentUrl));
  const state = getDerivedState();
  const containers = getInsertedContainers(state, containerConfigs.length);
  return {
    switchTo: (index:number) => switchToContainer(containers[index]),
    getActive: () => getActiveContainer(store.getState(), patterns),
    getStackOrder: () => getContainerStackOrder(store.getState(), patterns),
    getIndexedStackOrder: () => getIndexedContainerStackOrder(store.getState(), patterns),
    addChangeListener: (fn:Function) => store.subscribe(() => {
      const actions = store.getState();
      const active = getActiveContainer(actions, patterns);
      const stackOrder = getContainerStackOrder(actions, patterns);
      const indexedStackOrder = getIndexedContainerStackOrder(actions, patterns);
      fn({active, stackOrder, indexedStackOrder});
    })
  };
};

export const switchToContainer = (container:Container) =>
    store.dispatch(actions.switchToContainer(container));
export const push = (url:string) => store.dispatch(actions.push(url));
export const go = (n:number=1) => store.dispatch(actions.go(n));
export const back = (n:number=1) => store.dispatch(actions.back(n));
export const forward = (n:number=1) => store.dispatch(actions.forward(n));

function runSteps(steps:Step[]) {
  if (steps.length === 1) {
    steps[0].fn(...steps[0].args);
  }
  else if (steps.length > 1) {
    const promisedSteps = steps.map(s => () => {
      s.fn(...s.args);
      return _.includes(needsPop, s.fn) ? listenPromise() : Promise.resolve();
    });
    [unlistenPromise, ...promisedSteps, startListeningPromise].reduce(
        (p, step) => p.then(step),
        Promise.resolve()
    );
  }
}

export function createSteps(state:StateSnapshot) : Step[] {
  switch(state.lastAction.type) {
    case SET_CONTAINERS: return [{fn: browser.replace, args: [state.browserHistory.current]}];
    case SWITCH_TO_CONTAINER: return diffStateToSteps(state.previousState, state);
    case PUSH: return [{fn: browser.push, args: [state.browserHistory.current]}];
    case BACK:
    case FORWARD:
    case GO:
    case POPSTATE:
    default: return [];
  }
}

store.subscribe(() => runSteps(createSteps(getDerivedState())));