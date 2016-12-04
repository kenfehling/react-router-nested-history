// @flow
import * as _ from 'lodash';
import { patternsMatch , pathsMatch} from "./util/url";
import type { Page, BrowserPage, Container, ContainerHistory, BrowserHistory } from './types';

// TODO: Pass this in dynamically
import * as behavior from './behaviors/defaultBehavior';

const toBrowserPage = (page:Page, container:Container) : BrowserPage => ({...page, container});

const toBrowserHistory = (history:ContainerHistory, container:Container) : BrowserHistory => ({
  back: history.back.map(page => toBrowserPage(page, container)),
  current: {...history.current, container},
  forward: history.forward.map(page => toBrowserPage(page, container))
});

const createBrowserHistory = (c:Container) : BrowserHistory => toBrowserHistory(c.history);
const toArray = (h:BrowserHistory) : Array => [h.back, h.current, h.forward];
const fromArray = ([back, current, forward]) : BrowserHistory => ({back, current, forward});

export function switchContainer(from:Container, to:Container, all:Container[]) : BrowserHistory {
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

export function loadGroupFromUrl(page:Page, containers:Container, group:number) : BrowserHistory {

}

export function loadFromUrl(page:Page, containers:Container) : BrowserHistory {
  const matchingContainers:Container[] =
      _.filter(containers, c => patternsMatch(c.urlPatterns, page.url));
  const groups = _.uniq(matchingContainers.map(c => c.group));


  const defaultTab:Container = _.find(containers, c => c.isDefault);

  const a1 = toBrowserPage(containers[0].history.current, containers[0]);

  const initialContainer:Container =
      _.find(containers, c => pathsMatch(c.initialUrl, page.url));
  if (initialContainer) {
    if (initialContainer.isDefault) {
      return behavior.load_A([toBrowserPage(page)], []);
    }
    else {
      return behavior.load_B([[], toBrowserPage(page)]);
    }
  }
  const matchingContainer:Container =
      _.find(containers, c => patternsMatch(c.urlPatterns, currentUrl));
  if (matchingContainer) {
    if (matchingContainer.isDefault) {
      return behavior.load_A1([containers[0].initialUrl, toBrowserPage(page)], []);
    }
    else {
      return behavior.load_B1([[], toBrowserPage(page)]);
    }
  }
  else {
    return startState;
  }
}