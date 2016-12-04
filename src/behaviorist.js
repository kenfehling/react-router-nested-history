// @flow
import * as _ from 'lodash';
import type { Container, BrowserHistory } from './types';

// TODO: Pass this in dynamically
import * as behavior from './behaviors/defaultBehavior';

const createBrowserHistory = (container:Container) : BrowserHistory => ({
  back: container.history.back.map(page => ({...page, container})),
  current: {...container.history.current, container},
  forward: container.history.forward.map(page => ({...page, container}))
});

const toArray = (history:BrowserHistory) : Array => [history.back, history.current, history.forward];
const fromArray = ([back, current, forward]) : BrowserHistory => ({back, current, forward});

export function switchToContainer(from:Container, to:Container, all:Container[]) : BrowserHistory {
  const defaultTab:Container = _.find(all, c => c.group === to.group && c.isDefault);
  const defaultHistory = toArray(createBrowserHistory(defaultTab));
  const fromHistory = toArray(createBrowserHistory(from));
  const toHistory = toArray(createBrowserHistory(to));
  if (from.isDefault) {
    return fromArray(behavior.A_to_B(defaultHistory, toHistory, []));
  }
  else {
    if (to.isDefault) {
      return fromArray(behavior.B_to_A(fromHistory, defaultHistory, []));
    }
    else {
      return fromArray(behavior.B_to_C(defaultHistory, fromHistory, toHistory));
    }
  }
}