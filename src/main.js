// @flow

import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes";
import * as actions from './actions/HistoryActions';
import * as browser from './browserFunctions';
import { listen, listenPromise } from './historyListener';
import * as util from './util/history';
import store from './store';
import * as _ from 'lodash';
import type { State, Group, Container, ContainerConfig, StateSnapshot, Step } from './types';

const needsPop = [browser.back, browser.forward, browser.go];
let unlisten;

const getDerivedState = () : StateSnapshot => util.deriveState(store.getState());

const startListening = () => {
  unlisten = listen(location => {
    const state = location.state;
    if (state) {
      store.dispatch(actions.popstate(location.state.id));
    }
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
  const currentUrl:string = window.location.pathname;
  store.dispatch(actions.setContainers(containerConfigs, currentUrl));
  const state:State = getDerivedState();
  const group:Group = _.last(state.groups);
  const groupIndex:number = group.index;
  return {
    switchTo: (index:number) => switchToContainer(groupIndex, index),
    push: (containerIndex:number, url:string) => push(groupIndex, containerIndex, url),
    getActive: () => group.containers[group.history.current.containerIndex],
    getStackOrder: () => util.getContainerStackOrder(store.getState(), groupIndex),
    getIndexedStackOrder: () => util.getIndexedContainerStackOrder(store.getState(), groupIndex),
    addChangeListener: (fn:Function) => store.subscribe(() => {
      const actions:Array<Object> = store.getState();
      const state:State = util.deriveState(actions);
      const group:Group = state.groups[groupIndex];
      const currentUrl:string = group.history.current.url;
      const activeContainer:Container = group.containers[group.history.current.containerIndex];
      const activeGroup:Group = state.groups[state.activeGroupIndex];
      const stackOrder:Container[] = util.getContainerStackOrder(actions, groupIndex);
      const indexedStackOrder:number[] = util.getIndexedContainerStackOrder(actions, groupIndex);
      fn({activeContainer, activeGroup, currentUrl, stackOrder, indexedStackOrder});
    })
  };
};

export const addChangeListener = (fn:Function) => {
  fn(getDerivedState());
  return store.subscribe(() => fn(getDerivedState()));
};

export const switchToContainer = (groupIndex:number, containerIndex:number) =>
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex));

export const push = (groupIndex:number, containerIndex:number, url:string) => {
  const state = getDerivedState();
  const activeGroup = util.getActiveGroup(state);
  const activeContainer = util.getActiveContainer(activeGroup);
  if (activeGroup.index !== groupIndex || activeContainer.index !== containerIndex) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex));
  }
  store.dispatch(actions.push(url));
};

export const go = (n:number=1) => store.dispatch(actions.go(n));
export const back = (n:number=1) => store.dispatch(actions.back(n));
export const forward = (n:number=1) => store.dispatch(actions.forward(n));

export const isPageActive = (id:number) => util.isPageActive(getDerivedState(), id);

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
    case SET_CONTAINERS: /* return [

      {fn: browser.replace, args: [state.browserHistory.current]}
    ]; */
    case SWITCH_TO_CONTAINER: return util.diffStateToSteps(state.previousState, state);
    case PUSH: return [{fn: browser.push, args: [util.getActiveGroup(state).history.current]}];
    case BACK:
    case FORWARD:
    case GO:
    case POPSTATE:
    default: return [];
  }
}

store.subscribe(() => runSteps(createSteps(getDerivedState())));