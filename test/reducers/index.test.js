// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import reducer from '../../src/reducers/index';
import { deriveState } from '../../src/util/history';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../../src/constants/ActionTypes";
import type { ContainerConfig, State, StateSnapshot } from '../../src/types';

describe('main', () => {

  const containerConfigs : ContainerConfig[] = [
    {initialUrl: '/a', urlPatterns: ['/a/*']},
    {initialUrl: '/b', urlPatterns: ['/b/*']},
    {initialUrl: '/c', urlPatterns: ['/c/*']}
  ];

  const tempState = deriveState(reducer([], {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}));
  const containers = tempState.containers;

  describe('with no initial state', () => {
    const perform = (action) : StateSnapshot => deriveState(reducer([], action));

    it('loads correctly (default container)', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'});
      expect(result.browserHistory.current.url).toBe('/a');
      expect(result.containers.length).toBe(3);
      expect(result.containers[0].history.current.url).toBe('/a');
      expect(result.containers[1].history.current.url).toBe('/b');
      expect(result.containers[2].history.current.url).toBe('/c');
      expect(result.browserHistory.current.container.initialUrl).toBe('/a');
      expect(result.lastId).toBe(3);
    });

    it('loads correctly (non-default container)', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b'});
      expect(result.browserHistory.back.length).toBe(1);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.current.url).toBe('/b');
      expect(result.browserHistory.current.container.initialUrl).toBe('/b');
    });

    it('loads correctly (non-initial page on default container)', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a/1'});
      expect(result.browserHistory.back.length).toBe(1);
      expect(result.browserHistory.current.url).toBe('/a/1');
      expect(result.browserHistory.current.id).toBe(4);
      expect(result.containers[0].history.current.url).toBe('/a/1');
      expect(result.browserHistory.current.container.initialUrl).toBe('/a');
      expect(result.lastId).toBe(4);
    });

    it('loads correctly (non-initial page on non-default container)', () => {
      const result = perform({type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/b/1'});
      expect(result.browserHistory.back.length).toBe(2);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.back[1].url).toBe('/b');
      expect(result.browserHistory.current.url).toBe('/b/1');
      expect(result.containers[1].history.current.url).toBe('/b/1');
      expect(result.browserHistory.current.id).toBe(4);
      expect(result.browserHistory.current.container.initialUrl).toBe('/b');
      expect(result.lastId).toBe(4);
    });
  });

  describe('with initial state', () => {
    const state = [
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: PUSH, url: '/a/1'},
      {type: SWITCH_TO_CONTAINER, container: containers[1]}
    ];

    const perform = (action) : StateSnapshot => deriveState(reducer(state, action));

    it('pushes page', () => {
      const result = perform({type: PUSH, url: '/b/2'});
      expect(result.browserHistory.back.length).toBe(3);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.back[1].url).toBe('/a/1');
      expect(result.browserHistory.back[2].url).toBe('/b');
      expect(result.browserHistory.current.url).toBe('/b/2');
      expect(result.browserHistory.current.id).toBe(5);
      expect(result.browserHistory.current.container.initialUrl).toBe('/b');
      expect(result.lastId).toBe(5);
    });

    it.only('switches container', () => {
      const result = perform({type: SWITCH_TO_CONTAINER, container: containers[0]});

      console.log(result.browserHistory);
      console.log(result.containers.map(c => c.history));

      expect(result.browserHistory.back.length).toBe(1);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.current.url).toBe('/a/1');
      expect(result.browserHistory.current.id).toBe(4);
      expect(result.browserHistory.current.container.initialUrl).toBe('/a');
      expect(result.lastId).toBe(4);
    });

    it('switches container(2)', () => {
      const result = perform({type: SWITCH_TO_CONTAINER, container: containers[2]});
      expect(result.browserHistory.back.length).toBe(2);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.back[1].url).toBe('/a/1');
      expect(result.browserHistory.current.url).toBe('/c');
      expect(result.browserHistory.current.id).toBe(3);
      expect(result.browserHistory.current.container.initialUrl).toBe('/c');
      expect(result.lastId).toBe(4);
    });

    it('goes back in history', () => {
      const result = perform({type: BACK});
      expect(result.browserHistory.back.length).toBe(1);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.current.url).toBe('/a/1');
      expect(result.browserHistory.current.id).toBe(1);
      expect(result.browserHistory.forward.length).toBe(2);
      expect(result.browserHistory.forward[0].url).toBe('/b');
      expect(result.browserHistory.forward[1].url).toBe('/b/1');
      expect(result.browserHistory.current.container.initialUrl).toBe('/a');
      expect(result.lastId).toBe(5);
    });

    it('goes forward in history', () => {
      const result = perform({type: FORWARD});
      expect(result.browserHistory.back.length).toBe(3);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.back[1].url).toBe('/a/1');
      expect(result.browserHistory.back[2].url).toBe('/b');
      expect(result.browserHistory.current.url).toBe('/b/1');
      expect(result.browserHistory.current.id).toBe(5);
      expect(result.browserHistory.forward.length).toBe(0);
      expect(result.browserHistory.current.container.initialUrl).toBe('/b');
      expect(result.lastId).toBe(5);
    });

    it('goes back N pages in history', () => {

    });

    it('goes forward N pages in history', () => {

    });

    it('correctly updates history from popstate', () => {
      const result = perform({type: POPSTATE, id: 5})
      expect(result.browserHistory.back.length).toBe(3);
      expect(result.browserHistory.back[0].url).toBe('/a');
      expect(result.browserHistory.back[1].url).toBe('/a/1');
      expect(result.browserHistory.back[2].url).toBe('/b');
      expect(result.browserHistory.current.url).toBe('/b/1');
      expect(result.browserHistory.current.id).toBe(5);
      expect(result.browserHistory.forward.length).toBe(0);
      expect(result.browserHistory.current.container.initialUrl).toBe('/b');
      expect(result.lastId).toBe(5);
    });
  });

  it('switches container, goes back, switches container back', () => {
    const state = [
      {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'},
      {type: PUSH, url: '/a/1'},
      {type: SWITCH_TO_CONTAINER, container: containers[1]},
      {type: SWITCH_TO_CONTAINER, container: containers[0]},
      {type: BACK},
      {type: SWITCH_TO_CONTAINER, container: containers[1]},
      {type: SWITCH_TO_CONTAINER, container: containers[0]}
    ];
    const result = deriveState(state);
    expect(result.browserHistory.back.length).toBe(0);
    expect(result.browserHistory.current.url).toBe('/a');
    expect(result.browserHistory.current.id).toBe(1);
    expect(result.browserHistory.forward.length).toBe(1);
    expect(result.browserHistory.forward[0].url).toBe('/a/1');
    expect(result.browserHistory.forward[0].id).toBe(4);
    expect(result.browserHistory.current.container.initialUrl).toBe('/a');
    expect(result.lastId).toBe(5);
  });
});