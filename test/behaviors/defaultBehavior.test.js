// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import { deriveState } from '../../src/util/history';
import reducer from '../../src/reducers/index';
import { switchToContainer } from '../../src/behaviors/defaultBehavior';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH } from "../../src/constants/ActionTypes";
import type { State, Container, ContainerConfig } from '../../src/types';

describe('default container behavior', () => {


  it('does a simple switch', () => {
    const containerConfigs : ContainerConfig[] = [
      {initialUrl: '/a', urlPatterns: ['/a', '/a/*']},
      {initialUrl: '/b', urlPatterns: ['/b', '/b/*']},
      {initialUrl: '/c', urlPatterns: ['/c', '/c/*']}
    ];

    const tempState:State = deriveState(reducer([], {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}));
    const containers:Container[] = tempState.containers;

    expect(switchToContainer({
      browserHistory: {
        back: [],
        current: {url: '/a', id: 1, container: containers[0]},
        forward: []
      },
      containers: containers,
      lastGroup: 1,
      lastId: 3
    },
    containers[1]).browserHistory).toEqual({
      back: [{url: '/a', id: 1, container: containers[0]}],
      current: {url: '/b', id: 2, container: containers[1]},
      forward: []
    });
  });

  it('keeps forward history when going to non-default tab', () => {
    const containers = [{
      history: {
        back: [{url: '/a', id: 1}],
        current: {url: '/a/1', id: 4},
        forward: [{url: '/a/2', id: 5}],
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      group: 1,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2},
        forward: [{url: '/b/1', id: 6}]
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      group: 1,
      index: 1
    }];
    expect(switchToContainer({
          browserHistory: {
            back: [{url: '/a', id: 1, container: containers[0]}],
            current: {url: '/a/1', id: 4, container: containers[0]},
            forward: [{url: '/a/2', id: 5, container: containers[0]}]
          },
          containers: containers,
          lastGroup: 1,
          lastId: 6
        },
        containers[1]).browserHistory).toEqual({
      back: [
        {url: '/a', id: 1, container: containers[0]},
        {url: '/a/1', id: 4, container: containers[0]}
      ],
      current: {url: '/b', id: 2, container: containers[1]},
      forward: [{url: '/b/1', id: 6, container: containers[1]}]
    });
  });

  it('keeps forward and back history when going to default tab', () => {
    const containers = [{
      history: {
        back: [{url: '/a', id: 1}],
        current: {url: '/a/1', id: 4},
        forward: [{url: '/a/2', id: 5}]
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      group: 1,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2},
        forward: []
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      group: 1,
      index: 1
    }];
    expect(switchToContainer({
      browserHistory: {
        back: [],
        current: {url: '/b', id: 2, container: containers[1]},
        forward: []
      },
      containers: containers,
      lastGroup: 1,
      lastId: 5
    },
    containers[0]).browserHistory).toEqual({
      back: [{url: '/a', id: 1, container: containers[0]}],
      current: {url: '/a/1', id: 4, container: containers[0]},
      forward: [{url: '/a/2', id: 5, container: containers[0]}]
    });
  });

  it('has default tab as back history', () => {
    const containers = [{
      history: {
        back: [],
        current: {url: '/a', id: 1},
        forward: []
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      group: 1,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2},
        forward: []
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      group: 1,
      index: 1
    }, {
      history: {
        back: [],
        current: {url: '/c', id: 3},
        forward: []
      },
      initialUrl: '/c',
      urlPatterns: ['/c', '/c/*'],
      isDefault: false,
      group: 1,
      index: 2
    }];
    expect(switchToContainer({
      browserHistory: {
        back: [{url: '/a', id: 1, container: containers[0]}],
        current: {url: '/b', id: 2, container: containers[1]},
        forward: []
      },
      containers: containers,
      lastGroup: 1,
      lastId: 3
    },
    containers[2]).browserHistory).toEqual({
      back: [{url: '/a', id: 1, container: containers[0]}],
      current: {url: '/c', id: 3, container: containers[2]},
      forward: []
    });
  });

  it('has default tab and its back history as back history', () => {
    const containers = [{
      history: {
        back: [{url: '/a', id: 1}],
        current: {url: '/a/1', id: 4},
        forward: [{url: '/a/2', id: 5}]
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      group: 1,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2},
        forward: []
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      group: 1,
      index: 1
    }, {
      history: {
        back: [],
        current: {url: '/c', id: 3},
        forward: []
      },
      initialUrl: '/c',
      urlPatterns: ['/c', '/c/*'],
      isDefault: false,
      group: 1,
      index: 2
    }];
    expect(switchToContainer({
      browserHistory: {
        back: [
          {url: '/a', id: 1, container: containers[0]},
          {url: '/a/1', id: 4, container: containers[0]}
        ],
        current: {url: '/b', id: 2, container: containers[1]},
        forward: []
      },
      containers: containers,
      lastGroup: 1,
      lastId: 5
    },
    containers[2]).browserHistory).toEqual({
      back: [
        {url: '/a', id: 1, container: containers[0]},
        {url: '/a/1', id: 4, container: containers[0]}
      ],
      current: {url: '/c', id: 3, container: containers[2]},
      forward: []
    });
  })
});