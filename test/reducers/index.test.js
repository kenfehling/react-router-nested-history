// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import reducer from '../../src/reducers/index';
import { deriveState } from '../../src/util/history';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../../src/constants/ActionTypes";
import type { ContainerConfig, State, StateSnapshot } from '../../src/types';

const containers : ContainerConfig[] = [
  {initialUrl: '/a', urlPatterns: ['/a/*']},
  {initialUrl: '/b', urlPatterns: ['/b/*']},
  {initialUrl: '/c', urlPatterns: ['/c/*']}
];

describe('main', () => {
  const state = [
    {type: SET_CONTAINERS, containers, currentUrl: '/a'},
    {type: PUSH, url: '/a/1'},
    {type: SWITCH_TO_CONTAINER, container: 1}
  ];

  it.only('loads correctly (default container)', () => {
    const action = {type: SET_CONTAINERS, containers, currentUrl: '/a'};
    const result:StateSnapshot = deriveState(reducer([], action));
    expect(result.browserHistory.current.url).toBe('/a');
    expect(result.containers.length).toBe(3);
    expect(result.containers[0].history.current.url).toBe('/a');
    expect(result.containers[1].history.current.url).toBe('/b');
    expect(result.containers[2].history.current.url).toBe('/c');
    expect(result.currentContainer.initialUrl).toBe('/a');
    expect(result.lastId).toBe(3);
  });

  it('loads correctly (non-default container)', () => {
    const action = {type: SET_CONTAINERS, containers, currentUrl: '/b'};
    const result:StateSnapshot = deriveState(reducer([], action));
    expect(result.browserHistory.back.length).toBe(1);
    expect(result.browserHistory.back[0].url).toBe('/a');
    expect(result.browserHistory.current.url).toBe('/b');
    expect(result.currentContainer.initialUrl).toBe('/b');
  });

  it('loads correctly (non-initial page on default container)', () => {
    expect(deriveAndStripState(reducer(undefined, {type: SET_CONTAINERS, containers, currentUrl: '/a/1'}))).toEqual({
      browserHistory: {
        back: [{url: '/a', container: 0, id: 1}],
        current: {url: '/a/1', container: 0, id: 4},
        forward: []
      },
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', container: 1, id: 2},
          forward: []
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        },
      ],
      currentContainer: 0,
      lastId: 4
    });
  });

  it('loads correctly (non-initial page on non-default container)', () => {
    expect(deriveAndStripState(reducer(undefined, {type: SET_CONTAINERS, containers, currentUrl: '/b/1'}))).toEqual({
      browserHistory: {
        back: [{url: '/a', container: 0, id: 1}, {url: '/b', container: 1, id: 2}],
        current: {url: '/b/1', container: 1, id: 4},
        forward: []
      },
      containerHistories: [
        {
          back: [],
          current: {url: '/a', container: 0, id: 1},
          forward: []
        }, {
          back: [{url: '/b', container: 1, id: 2}],
          current: {url: '/b/1', container: 1, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        },
      ],
      currentContainer: 1,
      lastId: 4
    });
  });

  it('switches container', () => {
    expect(deriveAndStripState(reducer(state, {type: SWITCH_TO_CONTAINER, container: 2}))).toEqual({
      browserHistory: {
        back: [{url: '/a', container: 0, id: 1}, {url: '/a/1', container: 0, id: 4}],
        current: {url: '/c', container: 2, id: 3},
        forward: []
      },
      currentContainer: 2,
      lastId: 5,
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', container: 1, id: 2},
          forward: [{url: '/b/1', container: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('switches container(2)', () => {
    expect(deriveAndStripState(reducer(state, {type: SWITCH_TO_CONTAINER, container: 2}))).toEqual({
      browserHistory: {
        back: [{url: '/a', container: 0, id: 1}, {url: '/a/1', container: 0, id: 4}],
        current: {url: '/c', container: 2, id: 3},
        forward: []
      },
      currentContainer: 2,
      lastId: 5,
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', container: 1, id: 2},
          forward: [{url: '/b/1', container: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('pushes page', () => {
    expect(deriveAndStripState(reducer(state, {type: PUSH, url: '/b/2'}))).toEqual({
      browserHistory: {
        back: [
          {url: '/a', container: 0, id: 1},
          {url: '/a/1', container: 0, id: 4},
          {url: '/b', container: 1, id: 2}
        ],
        current: {url: '/b/2', container: 1, id: 6},
        forward: []
      },
      currentContainer: 1,
      lastId: 6,
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [{url: '/b', container: 1, id: 2}],
          current: {url: '/b/2', container: 1, id: 6},
          forward: []
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('goes back in history', () => {
    expect(deriveAndStripState(reducer(state, {type: BACK}))).toEqual({
      browserHistory: {
        back: [{url: '/a', container: 0, id: 1}],
        current: {url: '/a/1', container: 0, id: 4},
        forward: [{url: '/b', container: 1, id: 2}, {url: '/b/1', container: 1, id: 5}]
      },
      currentContainer: 0,
      lastId: 5,
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', container: 1, id: 2},
          forward: [{url: '/b/1', container: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('goes forward in history', () => {
    expect(deriveAndStripState(reducer(state, {type: FORWARD}))).toEqual({
      browserHistory: {
        back: [
          {url: '/a', container: 0, id: 1},
          {url: '/a/1', container: 0, id: 4},
          {url: '/b', container: 1, id: 2}
        ],
        current: {url: '/b/1', container: 1, id: 5},
        forward: []
      },
      currentContainer: 1,
      lastId: 5,
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [{url: '/b', container: 1, id: 2}],
          current: {url: '/b/1', container: 1, id: 5},
          forward: []
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('goes back N pages in history', () => {

  });

  it('goes forward N pages in history', () => {

  });

  it('correctly updates history from popstate', () => {
    expect(deriveAndStripState(reducer(state, {type: POPSTATE, id: 5}))).toEqual({
      browserHistory: {
        back: [
          {url: '/a', container: 0, id: 1},
          {url: '/a/1', container: 0, id: 4},
          {url: '/b', container: 1, id: 2}
        ],
        current: {url: '/b/1', container: 1, id: 5},
        forward: []
      },
      currentContainer: 1,
      lastId: 5,
      containerHistories: [
        {
          back: [{url: '/a', container: 0, id: 1}],
          current: {url: '/a/1', container: 0, id: 4},
          forward: []
        }, {
          back: [{url: '/b', container: 1, id: 2}],
          current: {url: '/b/1', container: 1, id: 5},
          forward: []
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        },
      ]
    });
  });

  it('switches container, goes back, switches container back', () => {
    let newState = reducer(state, {type: SWITCH_TO_CONTAINER, container: 0});
    newState = reducer(newState, {type: BACK});
    newState = reducer(newState, {type: SWITCH_TO_CONTAINER, container: 1});
    newState = reducer(newState, {type: SWITCH_TO_CONTAINER, container: 0});
    expect(deriveAndStripState(newState)).toEqual({
      browserHistory: {
        back: [],
        current: {url: '/a', container: 0, id: 1},
        forward: [{url: '/a/1', container: 0, id: 4}]
      },
      currentContainer: 0,
      lastId: 5,
      containerHistories: [
        {
          back: [],
          current: {url: '/a', container: 0, id: 1},
          forward: [{url: '/a/1', container: 0, id: 4}]
        }, {
          back: [],
          current: {url: '/b', container: 1, id: 2},
          forward: [{url: '/b/1', container: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', container: 2, id: 3},
          forward: []
        },
      ]
    });
  });
});