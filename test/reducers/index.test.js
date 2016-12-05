// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import reducer from '../../src/reducers/index';
import { deriveState } from '../../src/util/history';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../../src/constants/ActionTypes";
import type { ContainerConfig, State, StateSnapshot } from '../../src/types';

describe('reducer', () => {
  const containerConfigs : ContainerConfig[] = [
    {initialUrl: '/a', urlPatterns: ['/a/*']},
    {initialUrl: '/b', urlPatterns: ['/b/*']},
    {initialUrl: '/c', urlPatterns: ['/c/*']}
  ];

  const tempState = deriveState(reducer([], {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}));
  const group = tempState.groups[0];
  const containers = group.containers;

  describe('with no initial state', () => {
    const perform = (action) : StateSnapshot => deriveState([action]);
    const performAll = (actions) : StateSnapshot => deriveState(actions);

    it('loads with default container', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
      expect(result.groups[0].history.current.url).toBe('/a');
      expect(result.groups[0].containers.length).toBe(3);
      expect(result.groups[0].containers[0].history.current.url).toBe('/a');
      expect(result.groups[0].containers[1].history.current.url).toBe('/b');
      expect(result.groups[0].containers[2].history.current.url).toBe('/c');
      expect(result.groups[0].history.current.containerIndex).toBe(0);
      expect(result.lastPageId).toBe(3);
    });

    it('loads with non-default container', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b'});
      expect(result.groups[0].history.back.length).toBe(1);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.current.url).toBe('/b');
      expect(result.groups[0].history.current.containerIndex).toBe(1);
    });

    it('loads with non-initial page on default container', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a/1'});
      expect(result.groups[0].history.back.length).toBe(1);
      expect(result.groups[0].history.current.url).toBe('/a/1');
      expect(result.groups[0].history.current.id).toBe(4);
      expect(result.groups[0].containers[0].history.current.url).toBe('/a/1');
      expect(result.groups[0].history.current.containerIndex).toBe(0);
      expect(result.lastPageId).toBe(4);
    });

    it('loads with non-initial page on non-default container', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b/1'});
      expect(result.groups[0].history.back.length).toBe(2);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.back[1].url).toBe('/b');
      expect(result.groups[0].history.current.url).toBe('/b/1');
      expect(result.groups[0].containers[1].history.current.url).toBe('/b/1');
      expect(result.groups[0].history.current.id).toBe(4);
      expect(result.groups[0].history.current.containerIndex).toBe(1);
      expect(result.lastPageId).toBe(4);
    });
  });

  describe('with initial state', () => {
    const state = [
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: PUSH, url: '/a/1'},
      {type: SWITCH_TO_CONTAINER, container: containers[1]}
    ];

    const perform = (action) : StateSnapshot => deriveState(reducer(state, action));
    const performAll = (actions) : StateSnapshot => deriveState(actions.reduce(reducer, state));

    it('pushes page', () => {
      const result = perform({type: PUSH, url: '/b/2'});
      expect(result.groups[0].history.back.length).toBe(3);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.back[1].url).toBe('/a/1');
      expect(result.groups[0].history.back[2].url).toBe('/b');
      expect(result.groups[0].history.current.url).toBe('/b/2');
      expect(result.groups[0].history.current.id).toBe(5);
      expect(result.groups[0].history.current.containerIndex).toBe(1);
      expect(result.lastPageId).toBe(5);
    });

    it('switches container', () => {
      const derivedState = deriveState(state);
      const container = derivedState.groups[0].containers[0];
      const result = perform({type: SWITCH_TO_CONTAINER, container: container});
      expect(result.groups[0].history.back.length).toBe(1);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.current.url).toBe('/a/1');
      expect(result.groups[0].history.current.id).toBe(4);
      expect(result.groups[0].history.current.containerIndex).toBe(0);
      expect(result.lastPageId).toBe(4);
    });

    it('switches container(2)', () => {
      const result = perform({type: SWITCH_TO_CONTAINER, container: containers[2]});
      expect(result.groups[0].history.back.length).toBe(2);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.back[1].url).toBe('/a/1');
      expect(result.groups[0].history.current.url).toBe('/c');
      expect(result.groups[0].history.current.id).toBe(3);
      expect(result.groups[0].history.current.containerIndex).toBe(2);
      expect(result.lastPageId).toBe(4);
    });

    it('goes back in history', () => {
      const result = performAll([
        {type: PUSH, url: '/b/1'},
        {type: BACK, n: 2}
      ]);
      expect(result.groups[0].history.back.length).toBe(1);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.current.url).toBe('/a/1');
      expect(result.groups[0].history.current.id).toBe(4);
      expect(result.groups[0].history.forward.length).toBe(2);
      expect(result.groups[0].history.forward[0].url).toBe('/b');
      expect(result.groups[0].history.forward[1].url).toBe('/b/1');
      expect(result.groups[0].history.current.containerIndex).toBe(0);
      expect(result.lastPageId).toBe(5);
    });

    it('goes forward in history', () => {
      const result = performAll([
        {type: PUSH, url: '/b/1'},
        {type: BACK, n: 2},
        {type: FORWARD, n: 2}
      ]);
      expect(result.groups[0].history.back.length).toBe(3);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.back[1].url).toBe('/a/1');
      expect(result.groups[0].history.back[2].url).toBe('/b');
      expect(result.groups[0].history.current.url).toBe('/b/1');
      expect(result.groups[0].history.current.id).toBe(5);
      expect(result.groups[0].history.forward.length).toBe(0);
      expect(result.groups[0].history.current.containerIndex).toBe(1);
      expect(result.lastPageId).toBe(5);
    });

    it('goes back N pages in history', () => {

    });

    it('goes forward N pages in history', () => {

    });

    it('correctly updates history from popstate', () => {
      const result = performAll([
        {type: PUSH, url: '/b/1'},
        {type: BACK, n: 2},
        {type: POPSTATE, id: 5}
      ]);
      expect(result.groups[0].history.back.length).toBe(3);
      expect(result.groups[0].history.back[0].url).toBe('/a');
      expect(result.groups[0].history.back[1].url).toBe('/a/1');
      expect(result.groups[0].history.back[2].url).toBe('/b');
      expect(result.groups[0].history.current.url).toBe('/b/1');
      expect(result.groups[0].history.current.id).toBe(5);
      expect(result.groups[0].history.forward.length).toBe(0);
      expect(result.groups[0].history.current.containerIndex).toBe(1);
      expect(result.lastPageId).toBe(5);
    });
  });

  it('switches container, goes back, switches container back', () => {
    const actions = [
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: PUSH, url: '/a/1'},
      {type: SWITCH_TO_CONTAINER, container: containers[1]},
      {type: SWITCH_TO_CONTAINER, container: containers[0]},
      {type: BACK},
      {type: SWITCH_TO_CONTAINER, container: containers[1]},
      {type: SWITCH_TO_CONTAINER, container: containers[0]}
    ];
    const result = deriveState(actions);
    expect(result.groups[0].history.back.length).toBe(0);
    expect(result.groups[0].history.current.url).toBe('/a');
    expect(result.groups[0].history.current.id).toBe(1);
    expect(result.groups[0].history.forward.length).toBe(1);
    expect(result.groups[0].history.forward[0].url).toBe('/a/1');
    expect(result.groups[0].history.forward[0].id).toBe(4);
    expect(result.groups[0].history.current.containerIndex).toBe(0);
    expect(result.lastPageId).toBe(5);
  });
});