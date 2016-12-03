// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import * as util from '../../src/util/history';
import { push, back, forward, go } from '../../src/browserFunctions';
import { SET_CONTAINERS, PUSH, BACK, FORWARD } from "../../src/constants/ActionTypes";
import type { ContainerConfig, State, StateSnapshot } from '../../src/types';

describe('history utils', () => {
  const containerConfigs : ContainerConfig[] = [
    {initialUrl: '/a', urlPatterns: ['/a/*']},
    {initialUrl: '/b', urlPatterns: ['/b/*']},
    {initialUrl: '/c', urlPatterns: ['/c/*']}
  ];

  const originalState = util.reducer(null,
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
  const containers = originalState.containers;

  const a = {url: '/a', id: 1, container: containers[0]};
  const b = {url: '/b', id: 2, container: containers[1]};
  const a1 = {url: '/a/1', id: 3, container: containers[0]};

  it('reduces a bunch of actions', () => {
    expect(util.reduceAll(null, [
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}
    ])).toEqual(originalState);

    const newState = util.reduceAll(null, [
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: PUSH, url: '/a/1'}
    ]);
    expect(newState.browserHistory.current.url).toEqual('/a/1');
    expect(newState.browserHistory.back.length).toEqual(1);
    expect(newState.browserHistory.back[0].url).toEqual('/a');
  });

  it('handles existing state', () => {
    const perform = (action): State => util.reducer(originalState, action);
    const performAll = (actions): State => util.reduceAll(originalState, actions);

    it('diffs old state and new state for push', () => {
      const newState = perform({type: PUSH, url: '/a/1'});
      const steps = util.diffStateToSteps(originalState, newState);
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [newState.browserHistory.back[0]]},
        {fn: push, args: [newState.browserHistory.current]}
      ]);
    });

    it('diffs old state and new state for back', () => {
      const newState = performAll([{type: PUSH, url: '/a/1'}, {type: BACK}]);
      const steps = util.diffStateToSteps(originalState, newState);
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [newState.browserHistory.current]},
        {fn: push, args: [newState.browserHistory.forward[0]]},
        {fn: back, args: [1]}
      ]);
    });

    it('gets history shift amount', () => {
      const newState = perform({type: PUSH, url: '/a/1'});
      expect(util.getHistoryShiftAmount(newState, 1)).toEqual(-1);
    });

    it('gets container stack order (default)', () => {
      const actions = [
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}
      ];
      expect(util.getContainerStackOrder(actions)).toEqual(containers);
    });

    it('gets indexed container stack order (default)', () => {
      const actions = [
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}
      ];
      expect(util.getIndexedContainerStackOrder(actions)).toEqual([0, 1, 2]);
    });

    it('gets indexed container stack order (non-default)', () => {
      const actions = [
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b'}
      ];
      expect(util.getIndexedContainerStackOrder(actions)).toEqual([1, 0, 2]);
    });
  });
});