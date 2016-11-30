// @flow

import * as _ from 'lodash';
import type { State, Container } from '../types';

/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [String], current: String, forward: [String] }
 * @param {State} state - Current state
 * @param {Container} tab - The tab to switch to
 * @returns {Object} A new state object
 */
export function switchToContainer(state: State, tab: Container) : State {
  if (tab.isDefault) {  // going to default tab
    return {
      ...state,
      browserHistory: {
        ...tab.history,
        back: [...tab.history.back]
      }
    };
  }
  else {  // going to non-default tab

    console.log(tab, state.containers);

    const defaultTab = _.find(state.containers, c => c.group === tab.group && c.isDefault).history;
    return {
      ...state,
      browserHistory: {
        ...tab.history,
        back: [...defaultTab.back, defaultTab.current, ...tab.history.back]
      }
    }
  }
}