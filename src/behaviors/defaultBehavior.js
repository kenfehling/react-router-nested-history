// @flow

import * as _ from 'lodash';
import type { State, Container, Page, BrowserPage } from '../types';

function createBrowserPage(page:Page, container:Container) : BrowserPage {
  return {...page, container};
}

/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [String], current: String, forward: [String] }
 * @param {State} state - Current state
 * @param {Container} container - The tab to switch to
 * @returns {Object} A new state object
 */
export function switchToContainer(state:State, container:Container) : State {
  const createNewState = (back:BrowserPage[]) : State => ({
    ...state,
    browserHistory: {
      back,
      current: createBrowserPage(container.history.current, container),
      forward: container.history.forward.map(p => createBrowserPage(p, container))
    }
  });
  if (container.isDefault) {  // going to default tab
    return createNewState([...container.history.back.map(p => createBrowserPage(p, container))]);
  }
  else {  // going to non-default tab
    const defaultTab:Container = _.find(state.containers, c => c.group === container.group && c.isDefault);
    if (!defaultTab) {
      throw new Error('Default tab not found with group: ' + container.group);
    }
    return createNewState([
      ...defaultTab.history.back.map(p => createBrowserPage(p, defaultTab)),
      createBrowserPage(defaultTab.history.current, defaultTab),
      ...container.history.back.map(p => createBrowserPage(p, container))
    ]);
  }
}