// @flow
import * as _ from 'lodash';
import { patternsMatch , pathsMatch} from "./util/url";
import type { State, Page, IncomingPage, Group, Container, History } from './types';

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

export function loadGroupHistoryFromUrl(group:Group, page:IncomingPage) : History {
  const containers = group.containers;
  const defaultContainer:Container = _.find(containers, c => c.isDefault);
  const A = defaultContainer.history.current;
  const initialContainer:Container = _.find(containers, c => pathsMatch(c.initialUrl, page.url));
  if (initialContainer) {
    const P:Page = {...page, containerIndex: initialContainer.index};
    if (initialContainer.isDefault) {
      return fromArray(behavior.load_A([A], []));
    }
    else {
      return fromArray(behavior.load_B([A], [P]));
    }
  }
  const matchingContainer:Container = _.find(containers, c => patternsMatch(c.urlPatterns, page.url));
  if (matchingContainer) {
    const P:Page = {...page, containerIndex: matchingContainer.index};
    if (matchingContainer.isDefault) {
      return fromArray(behavior.load_A1([A, P], []));
    }
    else {
      const B = matchingContainer.initialUrl;
      return fromArray(behavior.load_B1([A], [B, P]));
    }
  }
  return group.history;
}