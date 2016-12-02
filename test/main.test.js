// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import reducer from '../src/reducers/index';
import { deriveState } from '../src/util/history';
import { createSteps } from '../src/main';
import { push, back, forward, go, replace } from '../src/browserFunctions';
import { SET_CONTAINERS, PUSH, BACK, FORWARD } from "../src/constants/ActionTypes";
import type { ContainerConfig, State, StateSnapshot } from '../src/types';

describe('main', () => {
  const containerConfigs : ContainerConfig[] = [
    {initialUrl: '/a', urlPatterns: ['/a/*']},
    {initialUrl: '/b', urlPatterns: ['/b/*']},
    {initialUrl: '/c', urlPatterns: ['/c/*']}
  ];

  //const tempState = deriveState(reducer([], {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}));
  //const containers = tempState.containers;

  const perform = (action) : StateSnapshot => deriveState(reducer([], action));

  it('creates steps from derived state', () => {
    const state = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
    expect(createSteps(state)).toEqual([
      {fn: replace, args: [state.browserHistory.current]}
    ])
  });
});