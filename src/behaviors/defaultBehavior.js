// @flow

import * as _ from 'lodash';
import type { State, Container, Page } from '../types';

/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [String], current: String, forward: [String] }
 * @param {State} state - Current state
 * @param {Container} container - The tab to switch to
 * @returns {Object} A new state object
 */
export function switchToContainer(state: State, container: Container) : State {
  const createNewState = (back:Page[]) : State => ({
    ...state,
    browserHistory: {
      back: _.map(back, p => ({...p, container})),
      current: {...container.history.current, container},
      forward: _.map(container.history.forward, p => ({...p, container}))
    }
  });
  if (container.isDefault) {  // going to default tab
    return createNewState([...container.history.back]);
  }
  else {  // going to non-default tab
    const defaultTab:Container = _.find(state.containers, c => c.group === container.group && c.isDefault);
    return createNewState([...defaultTab.history.back, defaultTab.history.current, ...container.history.back]);
  }
}