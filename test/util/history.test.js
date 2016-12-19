// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import * as util from '../../src/util/history'
import { push, back, forward, go } from '../../src/browserFunctions'
import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../../src/constants/ActionTypes"
import type { State } from '../../src/types'
import * as _ from 'lodash'
import fp from 'lodash/fp'

const createContainers = [
  {type: CREATE_CONTAINER, groupIndex: 0, initialUrl: '/a', urlPatterns: ['/a', '/a/:id']},
  {type: CREATE_CONTAINER, groupIndex: 0, initialUrl: '/b', urlPatterns: ['/b', '/b/:id']},
  {type: CREATE_CONTAINER, groupIndex: 0, initialUrl: '/c', urlPatterns: ['/c', '/c/:id']}
]

const createContainers2 = [
  {type: CREATE_CONTAINER, groupIndex: 1, initialUrl: '/e', urlPatterns: ['/e', '/e/:id']},
  {type: CREATE_CONTAINER, groupIndex: 1, initialUrl: '/f', urlPatterns: ['/f', '/f/:id']}
]

describe('history utils', () => {
  const state:State = util.deriveState(createContainers)
  const group = state.groups[0]
  const containers = group.containers
  const performAll = (actions): State => util.reduceAll(null, actions)

  it('loads 2 groups with the proper starting URL', () => {
    const state = performAll([
      ...createContainers,
      ...createContainers2,
      {type: LOAD_FROM_URL, url: '/e'}
    ])
    expect(state.groups[0].history.current.url).toEqual('/a')
    expect(state.groups[1].history.current.url).toEqual('/e')
    expect(state.activeGroupIndex).toEqual(1)
  })

  it('gets history shift amount', () => {
    const state = performAll([
      ...createContainers,
      {type: PUSH, url: '/a/1'}
    ])
    expect(util.getHistoryShiftAmountForId(state, 1)).toEqual(-1)
  })

  it('gets container stack order (default)', () => {
    const actions = createContainers
    expect(util.getContainerStackOrder(actions, 0)).toEqual(containers)
  })

  it('gets container stack order (default) 2', () => {
    const actions = [
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2},
    ]
    expect(util.getContainerStackOrder(actions, 0)).toEqual(fp.reverse(containers))
  })

  it('gets container stack order (default) b', () => {
    const actions = [
      ...createContainers,
      {type: LOAD_FROM_URL, url: '/b'}
    ]
    expect(util.getContainerStackOrder(actions, 0)).toEqual([
        containers[1],
        containers[0],
        containers[2]
    ])
  })

  it('gets indexed container stack order (default)', () => {
    const actions = createContainers
    expect(util.getIndexedContainerStackOrder(actions, 0)).toEqual([0, 1, 2])
  })

  it('gets indexed container stack order (non-default)', () => {
    const actions = [
      ...createContainers,
      {type: LOAD_FROM_URL, url: '/b'}
    ]
    expect(util.getIndexedContainerStackOrder(actions, 0)).toEqual([1, 0, 2])
  })

  it('pushes page', () => {
    const result = performAll([
      ...createContainers,
      {type: PUSH, url: '/a/1'}
    ])
    expect(result.groups[0].history.back.length).toBe(1)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.current.url).toBe('/a/1')
    expect(result.groups[0].history.current.id).toBe(4)
    expect(result.groups[0].history.current.containerIndex).toBe(0)
    expect(result.lastPageId).toBe(4)
  })

  it('switches container', () => {
    const result = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2}
    ])
    expect(result.groups[0].history.back.length).toBe(1)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.current.url).toBe('/c')
    expect(result.groups[0].history.current.id).toBe(3)
    expect(result.groups[0].history.current.containerIndex).toBe(2)
    expect(result.lastPageId).toBe(3)
  })

  it('goes back in history', () => {
    const result = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: PUSH, url: '/b/1'},
      {type: BACK, n: 2}
    ])
    expect(result.groups[0].history.back.length).toBe(0)
    expect(result.groups[0].history.current.url).toBe('/a')
    expect(result.groups[0].history.current.id).toBe(1)
    expect(result.groups[0].history.forward.length).toBe(2)
    expect(result.groups[0].history.forward[0].url).toBe('/b')
    expect(result.groups[0].history.forward[1].url).toBe('/b/1')
    expect(result.groups[0].history.current.containerIndex).toBe(0)
    expect(result.lastPageId).toBe(4)
  })

  it('goes forward in history', () => {
    const result = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: PUSH, url: '/b/1'},
      {type: BACK, n: 2},
      {type: FORWARD, n: 1}
    ])
    expect(result.groups[0].history.back.length).toBe(1)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.current.url).toBe('/b')
    expect(result.groups[0].history.current.id).toBe(2)
    expect(result.groups[0].history.forward.length).toBe(1)
    expect(result.groups[0].history.forward[0].url).toBe('/b/1')
    expect(result.groups[0].history.current.containerIndex).toBe(1)
    expect(result.lastPageId).toBe(4)
  })

  it('goes back in history after switch', () => {
    const result = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: BACK, n: 1}
    ])
    expect(result.groups[0].history.back.length).toBe(0)
    expect(result.groups[0].history.current.url).toBe('/a')
    expect(result.groups[0].history.current.id).toBe(1)
    expect(result.groups[0].history.forward.length).toBe(1)
    expect(result.groups[0].history.forward[0].url).toBe('/b')
    expect(result.groups[0].history.current.containerIndex).toBe(0)
    expect(result.lastPageId).toBe(3)
  })

  it('goes forward in history after switch', () => {
    const result = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: BACK, n: 1},
      {type: FORWARD, n: 1}
    ])
    expect(result.groups[0].history.back.length).toBe(1)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.current.url).toBe('/b')
    expect(result.groups[0].history.current.id).toBe(2)
    expect(result.groups[0].history.forward.length).toBe(0)
    expect(result.groups[0].history.current.containerIndex).toBe(1)
    expect(result.lastPageId).toBe(3)
  })

  it('goes back N pages in history', () => {

  })

  it('goes forward N pages in history', () => {

  })

  it('correctly updates history from popstate', () => {
    const result = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
      {type: PUSH, url: '/b/1'},
      {type: BACK, n: 2},
      {type: POPSTATE, id: 4}
    ])
    expect(result.groups[0].history.back.length).toBe(2)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.back[1].url).toBe('/b')
    expect(result.groups[0].history.current.url).toBe('/b/1')
    expect(result.groups[0].history.current.id).toBe(4)
    expect(result.groups[0].history.forward.length).toBe(0)
    expect(result.groups[0].history.current.containerIndex).toBe(1)
    expect(result.lastPageId).toBe(4)
  })

  describe('actions', () => {
    it('switches container, goes back, switches container back', () => {
      const actions = [
        ...createContainers,
        {type: PUSH, url: '/a/1'},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 0},
        {type: BACK},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 0}
      ]
      const result = util.deriveState(actions)
      expect(result.groups[0].history.back.length).toBe(0)
      expect(result.groups[0].history.current.url).toBe('/a')
      expect(result.groups[0].history.current.id).toBe(1)
      expect(result.groups[0].history.forward.length).toBe(1)
      expect(result.groups[0].history.forward[0].url).toBe('/a/1')
      expect(result.groups[0].history.forward[0].id).toBe(4)
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.lastPageId).toBe(4)
    })

    it('switches group without affecting other group', () => {
      const actions = [
        ...createContainers,
        ...createContainers2,
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2},
        {type: SWITCH_TO_CONTAINER, groupIndex: 1, containerIndex: 1}
      ]
      const result = util.deriveState(actions)
      expect(result.activeGroupIndex).toBe(1)
      expect(result.groups[0].history.current.containerIndex).toBe(2)
      expect(result.groups[1].history.current.containerIndex).toBe(1)
    })
  })

  describe('reloading behavior', () => {
    it('reloads a previous page', () => {
      const actions = [
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/a'},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
        {type: LOAD_FROM_URL, url: '/a'}
      ]
      const result = util.deriveState(actions)
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.groups[0].history.current.url).toBe('/a')
      expect(result.groups[0].history.forward.length).toBe(1)
    })
  })

  describe('creates steps', () => {
    const performAll = (actions) : State => util.deriveState(actions)

    it('for init (default)', () => {
      const actions = [
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/a'}
      ]
      const state = performAll(actions)
      const steps = util.createSteps(actions)
      expect(state.groups[0].history.back.length).toBe(0)
      expect(steps.length).toBe(1)
      expect(steps).toEqual([
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('for init (non-default)', () => {
      const actions = [
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/b'}
      ]
      const state = performAll(actions)
      const steps = util.createSteps(actions)
      expect(state.groups[0].history.back.length).toBe(1)
      expect(steps.length).toBe(2)
      expect(steps).toEqual([
        {fn: push, args: [state.groups[0].history.back[0]]},
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('for init (non-default) 2', () => {
      const actions = [
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/b/1'}
      ]
      const state = performAll(actions)
      const steps = util.createSteps(actions)
      expect(state.groups[0].history.back.length).toBe(2)
      expect(steps.length).toBe(3)
      expect(steps).toEqual([
        {fn: push, args: [state.groups[0].history.back[0]]},
        {fn: push, args: [state.groups[0].history.back[1]]},
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('for switching a tab', () => {
      const actions = [
        ...createContainers,
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1}
      ]
      const state = performAll(actions)
      const steps = util.createSteps(actions)
      expect(state.groups[0].history.back.length).toBe(1)
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [state.groups[0].history.back[0]]},
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('for push', () => {
      const actions = [
        ...createContainers,
        {type: PUSH, url: '/a/1'}
      ]
      const state = performAll(actions)
      const steps = util.createSteps(actions)
      expect(steps).toEqual([
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('for back', () => {
      const actions = [
        ...createContainers,
        {type: PUSH, url: '/a/1'},
        {type: BACK}
      ]
      const steps = util.createSteps(actions)
      expect(steps).toEqual([
        {fn: back, args: [1]}
      ])
    })

    it.only('for reloading a previous page', () => {
      const actions = [
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/a'},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
        {type: LOAD_FROM_URL, url: '/a'}
      ]
      const steps = util.createSteps(actions)
      expect(steps).toEqual([
        {fn: go, args: [-1]}
      ])
    })
  })
})