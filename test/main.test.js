// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
//import reducer from '../src/reducers/index';
import { deriveState, reducer, reduceAll } from '../src/util/history';
import { createSteps } from '../src/main';
import { push, back, forward, go, replace } from '../src/browserFunctions';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD } from "../src/constants/ActionTypes";
import type { State, ContainerConfig, StateSnapshot } from '../src/types';

describe('main', () => {
  const containerConfigs : ContainerConfig[] = [
    {initialUrl: '/a', urlPatterns: ['/a', '/a/*']},
    {initialUrl: '/b', urlPatterns: ['/b', '/b/*']},
    {initialUrl: '/c', urlPatterns: ['/c',' /c/*']}
  ];

  const tempState = reducer(null,
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
  const group = tempState.groups[0];
  const originalContainers = group.containers;

  const perform = (action) : StateSnapshot => deriveState([action]);
  const performAll = (actions) : StateSnapshot => deriveState(actions);

  it('creates steps for set containers (default)', () => {
    const state = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
    const steps = createSteps(state);
    expect(state.groups[0].history.back.length).toBe(0);
    expect(steps.length).toBe(1);
    expect(steps).toEqual([
      {fn: replace, args: [state.groups[0].history.current]}
    ])
  });

  it('creates steps for set containers (non-default)', () => {
    const state = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b'});
    const steps = createSteps(state);
    expect(state.groups[0].history.back.length).toBe(1);
    expect(steps.length).toBe(2);
    expect(steps).toEqual([
      {fn: replace, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.current]}
    ])
  });

  it('creates steps for set containers (non-default) 2', () => {
    const state = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b/1'});
    const steps = createSteps(state);
    expect(state.groups[0].history.back.length).toBe(2);
    expect(steps.length).toBe(3);
    expect(steps).toEqual([
      {fn: replace, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.back[1]]},
      {fn: push, args: [state.groups[0].history.current]}
    ])
  });

  it('creates steps for switching a tab', () => {
    const state = deriveState([
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1}
    ]);
    const steps = createSteps(state);
    expect(state.groups[0].history.back.length).toBe(1);
    expect(steps).toEqual([
      {fn: replace, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.current]}
    ])
  });

  it('creates steps for switching a tab (2)', () => {
    const state = deriveState([
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2}
    ]);
    const steps = createSteps(state);
    expect(state.groups[0].history.back.length).toBe(1);
    expect(steps).toEqual([
      {fn: back, args: [1]},
      {fn: replace, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.current]}
    ])
  });
});