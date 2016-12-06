// @flow
import * as _ from 'lodash';
import { patternsMatch , pathsMatch} from "./util/url";
import { pushToStack } from './util/core';
import type { State, Page, Group, Container, History } from './types';

// TODO: Pass this in dynamically
import * as behavior from './behaviors/defaultBehavior';

const toArray = (h:History) : Array<any> => [h.back, h.current, h.forward];
const fromArray = ([back, current, forward]) : History => ({back, current, forward});

export function switchContainer(from:Container, to:Container, defaulT:Container) : History {
  const defaultHistory = toArray(defaulT.history);
  const fromHistory = toArray(from.history);
  const toHistory = toArray(to.history);
  if (from.isDefault) {
    return fromArray(behavior.A_to_B(fromHistory, toHistory, []));
  }
  else {
    if (to.isDefault) {
      return fromArray(behavior.B_to_A(toHistory, fromHistory, []));
    }
    else {
      return fromArray(behavior.B_to_C(defaultHistory, fromHistory, toHistory));
    }
  }
}

function push(state:State, container:Container, url:string) : Page {
  const id:number = state.lastPageId + 1;
  const page:Page = {url, id, containerIndex: container.index};
  container.history = pushToStack(container.history, page);
  state.lastPageId = id;
  return page;
}

export function loadGroupFromUrl(oldState:State, groupIndex:number, url:string) : State {
  const state:State = _.cloneDeep(oldState);
  const group = state.groups[groupIndex];
  const containers:Container[] = group.containers;
  const defaultContainer:Container = _.find(containers, c => c.isDefault);
  const A = defaultContainer.history.current;
  const initialContainer:Container = _.find(containers, c => pathsMatch(c.initialUrl, url));
  if (initialContainer) {
    if (initialContainer.isDefault) {
      group.history = fromArray(behavior.load_A([A], []));
    }
    else {
      const B = initialContainer.history.current;
      group.history = fromArray(behavior.load_B([A], [B]));
    }
  }
  else {
    const matchingContainer:Container = _.find(containers, c => patternsMatch(c.urlPatterns, url));
    if (matchingContainer) {
      const P:Page = push(state, matchingContainer, url);
      if (matchingContainer.isDefault) {
        group.history = fromArray(behavior.load_A1([A, P], []));
      }
      else {
        const B = matchingContainer.history.back[0];
        group.history = fromArray(behavior.load_B1([A], [B, P]));
      }
    }
  }
  return state;
}