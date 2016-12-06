// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import * as util from '../../src/util/history';
import { push, back, forward, go } from '../../src/browserFunctions';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD } from "../../src/constants/ActionTypes";
import type { ContainerConfig, State, StateSnapshot } from '../../src/types';
import * as _ from "lodash";
import fp from 'lodash/fp';

describe('history utils', () => {
  const containerConfigs : ContainerConfig[] = [
    {initialUrl: '/a', urlPatterns: ['/a/*']},
    {initialUrl: '/b', urlPatterns: ['/b/*']},
    {initialUrl: '/c', urlPatterns: ['/c/*']}
  ];

  const originalState = util.reducer(null,
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
  const group = originalState.groups[0];
  const containers = group.containers;

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
    expect(newState.groups[0].history.current.url).toEqual('/a/1');
    expect(newState.groups[0].history.back.length).toEqual(1);
    expect(newState.groups[0].history.back[0].url).toEqual('/a');
  });

  describe('handles existing state', () => {
    const perform = (action): State => util.reducer(originalState, action);
    const performAll = (actions): State => util.reduceAll(originalState, actions);

    it('diffs old state and new state for push', () => {
      const newState = perform({type: PUSH, url: '/a/1'});
      const steps = util.diffStateToSteps(originalState, newState);
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [newState.groups[0].history.back[0]]},
        {fn: push, args: [newState.groups[0].history.current]}
      ]);
    });

    it('diffs old state and new state for back', () => {
      const newState = performAll([{type: PUSH, url: '/a/1'}, {type: BACK}]);
      const steps = util.diffStateToSteps(originalState, newState);
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [newState.groups[0].history.current]},
        {fn: push, args: [newState.groups[0].history.forward[0]]},
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
      expect(util.getContainerStackOrder(actions, 0)).toEqual(containers);
    });

    it('gets container stack order (default) 2', () => {
      const actions = [
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2},
      ];
      expect(util.getContainerStackOrder(actions, 0)).toEqual(fp.reverse(containers));
    });

    it('gets indexed container stack order (default)', () => {
      const actions = [
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}
      ];
      expect(util.getIndexedContainerStackOrder(actions, 0)).toEqual([0, 1, 2]);
    });

    it('gets indexed container stack order (non-default)', () => {
      const actions = [
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b'}
      ];
      expect(util.getIndexedContainerStackOrder(actions, 0)).toEqual([1, 0, 2]);
    });
  });
});