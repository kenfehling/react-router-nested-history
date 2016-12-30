// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import { deriveUninitializedState } from '../src/util/history'
import { switchContainer, loadFromUrl } from '../src/behaviorist'
import type {Group, Container } from '../src/types'
import { State, InitializedState, UninitialzedState } from '../src/types'
import { createContainers, createContainers2, zeroPage } from './fixtures'

describe('behaviorist', () => {
  const originalState:UninitialzedState =
      deriveUninitializedState([...createContainers, ...createContainers2], zeroPage)
  const group:Group = originalState.groups[0]

  it('does a simple switch', () => {
    const containers:Container[] = group.containers

    expect(switchContainer(containers[0], containers[1], containers[0])).toEqual({
      back: [{url: '/a', id: 1, containerIndex: 0}],
      current: {url: '/b', id: 2, containerIndex: 1},
      forward: []
    })
  })

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
    }]
    expect(switchContainer(containers[0], containers[1], containers[0])).toEqual({
      back: [
        {url: '/a', id: 1, containerIndex: 0},
        {url: '/a/1', id: 4, containerIndex: 0}
      ],
      current: {url: '/b', id: 2, containerIndex: 1},
      forward: [{url: '/b/1', id: 6, containerIndex: 1}]
    })
  })

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
    }]
    expect(switchContainer(containers[1], containers[0], containers[0])).toEqual({
      back: [{url: '/a', id: 1, containerIndex: 0}],
      current: {url: '/a/1', id: 4, containerIndex: 0},
      forward: [{url: '/a/2', id: 5, containerIndex: 0}]
    })
  })

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
    }]
    expect(switchContainer(containers[0], containers[2], containers[0])).toEqual({
      back: [{url: '/a', id: 1, containerIndex: 0}],
      current: {url: '/c', id: 3, containerIndex: 2},
      forward: []
    })
  })

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
    }]
    expect(switchContainer(containers[0], containers[2], containers[0])).toEqual({
      back: [
        {url: '/a', id: 1, containerIndex: 0},
        {url: '/a/1', id: 4, containerIndex: 0}
      ],
      current: {url: '/c', id: 3, containerIndex: 2},
      forward: []
    })
  })

  it('loads from URL /a', () => {
    const state = loadFromUrl(originalState, '/a', zeroPage)
    expect(state.browserHistory.back.length).toBe(1)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.current.url).toBe('/a')
    expect(state.browserHistory.forward.length).toBe(0)
    expect(state.activeGroupIndex).toBe(0)
  })

  it('loads from URL /a/1', () => {
    const state = loadFromUrl(originalState, '/a/1', zeroPage)
    expect(state.browserHistory.back.length).toBe(2)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.back[1].url).toBe('/a')
    expect(state.browserHistory.current.url).toBe('/a/1')
    expect(state.browserHistory.forward.length).toBe(0)

  })

  it('loads from URL /b (with default)', () => {
    const state = loadFromUrl(originalState, '/b', zeroPage)
    expect(state.browserHistory.back.length).toBe(2)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.back[1].url).toBe('/a')
    expect(state.browserHistory.current.url).toBe('/b')
    expect(state.browserHistory.forward.length).toBe(0)
  })

  it('loads from URL /b/1 (with default)', () => {
    const state = loadFromUrl(originalState, '/b/1', zeroPage)
    expect(state.browserHistory.back.length).toBe(3)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.back[1].url).toBe('/a')
    expect(state.browserHistory.back[2].url).toBe('/b')
    expect(state.browserHistory.current.url).toBe('/b/1')
    expect(state.browserHistory.forward.length).toBe(0)
  })

  it('loads from URL /f (with no default)', () => {
    const state = loadFromUrl(originalState, '/f', zeroPage)
    expect(state.browserHistory.back.length).toBe(1)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.current.url).toBe('/f')
    expect(state.browserHistory.forward.length).toBe(0)
  })

  it('loads from URL /f/1 (with no default)', () => {
    const state = loadFromUrl(originalState, '/f/1', zeroPage)
    expect(state.browserHistory.back.length).toBe(2)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.back[1].url).toBe('/f')
    expect(state.browserHistory.current.url).toBe('/f/1')
    expect(state.browserHistory.forward.length).toBe(0)
  })

  it('reloads from URL /a', () => {
    const state = loadFromUrl(loadFromUrl(originalState, '/a', zeroPage), '/a', zeroPage)
    expect(state.browserHistory.back.length).toBe(1)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.current.url).toBe('/a')
    expect(state.browserHistory.forward.length).toBe(0)
    expect(state.activeGroupIndex).toBe(0)
  })

  it('reloads from URL /b (from /a)', () => {
    const state = loadFromUrl(loadFromUrl(originalState, '/a', zeroPage), '/b', zeroPage)
    expect(state.browserHistory.back.length).toBe(2)
    expect(state.browserHistory.back[0].url).toBe(zeroPage)
    expect(state.browserHistory.back[1].url).toBe('/a')
    expect(state.browserHistory.current.url).toBe('/b')
    expect(state.browserHistory.forward.length).toBe(0)
  })
})