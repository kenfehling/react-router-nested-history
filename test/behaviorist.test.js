// @flow
/* globals describe, it, expect */
declare var describe:any;
declare var it:any;
declare var expect:any;
import { deriveState } from '../src/util/history';
import reducer from '../src/reducers/index';
import { switchContainer} from '../src/behaviorist';
import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH } from "../src/constants/ActionTypes";
import type { State, Container, ContainerConfig } from '../src/types';

describe('behaviorist', () => {

  it('does a simple switch', () => {
    const containerConfigs : ContainerConfig[] = [
      {initialUrl: '/a', urlPatterns: ['/a', '/a/*']},
      {initialUrl: '/b', urlPatterns: ['/b', '/b/*']},
      {initialUrl: '/c', urlPatterns: ['/c', '/c/*']}
    ];

    const tempState:State = deriveState(reducer([],
        {type: SET_CONTAINERS, containers: containerConfigs, currentUrl: '/a'}));
    const group = tempState.groups[0];
    const containers:Container[] = group.containers;

    expect(switchContainer(containers[0], containers[1], containers[0])).toEqual({
      back: [{url: '/a', id: 1, containerIndex: 0}],
      current: {url: '/b', id: 2, containerIndex: 1},
      forward: []
    });
  });

  it('keeps forward history when going to non-default tab', () => {
    const containers = [{
      history: {
        back: [{url: '/a', id: 1, containerIndex: 0}],
        current: {url: '/a/1', id: 4, containerIndex: 0},
        forward: [{url: '/a/2', id: 5, containerIndex: 0}],
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      groupIndex: 0,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2, containerIndex: 1},
        forward: [{url: '/b/1', id: 6, containerIndex: 1}]
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      groupIndex: 0,
      index: 1
    }];
    expect(switchContainer(containers[0], containers[1], containers[0])).toEqual({
      back: [
        {url: '/a', id: 1, containerIndex: 0},
        {url: '/a/1', id: 4, containerIndex: 0}
      ],
      current: {url: '/b', id: 2, containerIndex: 1},
      forward: [{url: '/b/1', id: 6, containerIndex: 1}]
    });
  });

  it('keeps forward and back history when going to default tab', () => {
    const containers = [{
      history: {
        back: [{url: '/a', id: 1, containerIndex: 0}],
        current: {url: '/a/1', id: 4, containerIndex: 0},
        forward: [{url: '/a/2', id: 5, containerIndex: 0}]
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      groupIndex: 0,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2, containerIndex: 1},
        forward: []
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      groupIndex: 0,
      index: 1
    }];
    expect(switchContainer(containers[1], containers[0], containers[0])).toEqual({
      back: [{url: '/a', id: 1, containerIndex: 0}],
      current: {url: '/a/1', id: 4, containerIndex: 0},
      forward: [{url: '/a/2', id: 5, containerIndex: 0}]
    });
  });

  it('has default tab as back history', () => {
    const containers = [{
      history: {
        back: [],
        current: {url: '/a', id: 1, containerIndex: 0},
        forward: []
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      groupIndex: 0,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2, containerIndex: 1},
        forward: []
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      groupIndex: 0,
      index: 1
    }, {
      history: {
        back: [],
        current: {url: '/c', id: 3, containerIndex: 2},
        forward: []
      },
      initialUrl: '/c',
      urlPatterns: ['/c', '/c/*'],
      isDefault: false,
      groupIndex: 0,
      index: 2
    }];
    expect(switchContainer(containers[0], containers[2], containers[0])).toEqual({
      back: [{url: '/a', id: 1, containerIndex: 0}],
      current: {url: '/c', id: 3, containerIndex: 2},
      forward: []
    });
  });

  it('has default tab and its back history as back history', () => {
    const containers = [{
      history: {
        back: [{url: '/a', id: 1, containerIndex: 0}],
        current: {url: '/a/1', id: 4, containerIndex: 0},
        forward: [{url: '/a/2', id: 5, containerIndex: 0}]
      },
      initialUrl: '/a',
      urlPatterns: ['/a', '/a/*'],
      isDefault: true,
      groupIndex: 0,
      index: 0
    }, {
      history: {
        back: [],
        current: {url: '/b', id: 2, containerIndex: 1},
        forward: []
      },
      initialUrl: '/b',
      urlPatterns: ['/b', '/b/*'],
      isDefault: false,
      groupIndex: 0,
      index: 1
    }, {
      history: {
        back: [],
        current: {url: '/c', id: 3, containerIndex: 2},
        forward: []
      },
      initialUrl: '/c',
      urlPatterns: ['/c', '/c/*'],
      isDefault: false,
      groupIndex: 0,
      index: 2
    }];
    expect(switchContainer(containers[0], containers[2], containers[0])).toEqual({
      back: [
        {url: '/a', id: 1, containerIndex: 0},
        {url: '/a/1', id: 4, containerIndex: 0}
      ],
      current: {url: '/c', id: 3, containerIndex: 2},
      forward: []
    });
  })
});