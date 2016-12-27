// @flow
/* globals describe, it, expect, beforeEach */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import * as util from '../../src/util/history'
import { push, back, forward, go, replace, _resetHistory } from '../../src/browserFunctions'
import { LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../../src/constants/ActionTypes"
import type { Step, Action} from '../../src/types'
import { State, InitializedState, UninitialzedState } from '../../src/types'
import * as _ from 'lodash'
import fp from 'lodash/fp'
import { createContainers, createContainers2, zeroPage} from "../fixtures"

describe('history utils', () => {

  beforeEach(_resetHistory)

  const performAll = (actions:Action[]): InitializedState =>
      util.deriveInitializedState(actions, zeroPage)
  const getContainerStackOrder = (actions:Action[], groupIndex:number) =>
      util.getContainerStackOrder(actions, groupIndex, zeroPage)
  const getIndexedContainerStackOrder = (actions:Action[], groupIndex:number) =>
      util.getIndexedContainerStackOrder(actions, groupIndex, zeroPage)
  const state:UninitialzedState =
      util.deriveUninitializedState(createContainers, zeroPage)
  const group = state.groups[0]
  const containers = group.containers
  
  it('loads 2 groups with the proper starting URL', () => {
    const state = performAll([
      ...createContainers,
      ...createContainers2,
      {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/e'}}
    ])
    expect(state.groups[0].history.current.url).toEqual('/a')
    expect(state.groups[1].history.current.url).toEqual('/e')
    expect(state.activeGroupIndex).toEqual(1)
  })

  it('gets history shift amount', () => {
    const state = performAll([
      ...createContainers,
      {type: PUSH, time: new Date(0), data: {url: '/a/1'}}
    ])
    expect(util.getHistoryShiftAmountForId(state, 1)).toEqual(-1)
  })

  it('gets container stack order (default)', () => {
    const actions = createContainers
    expect(getContainerStackOrder(actions, 0)).toEqual(containers)
  })

  it('gets container stack order (default) 2', () => {
    const actions = [
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 2}},
    ]
    expect(getContainerStackOrder(actions, 0)).toEqual(fp.reverse(containers))
  })

  it('gets container stack order (default) b', () => {
    const actions = [
      ...createContainers,
      {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/b'}}
    ]
    expect(getContainerStackOrder(actions, 0)).toEqual([
        containers[1],
        containers[0],
        containers[2]
    ])
  })

  it('gets indexed container stack order (default)', () => {
    const actions = createContainers
    expect(getIndexedContainerStackOrder(actions, 0)).toEqual([0, 1, 2])
  })

  it('gets indexed container stack order (non-default)', () => {
    const actions = [
      ...createContainers,
      {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/b'}}
    ]
    expect(getIndexedContainerStackOrder(actions, 0)).toEqual([1, 0, 2])
  })

  it('pushes page', () => {
    const result : InitializedState = performAll([
      ...createContainers,
      {type: PUSH, time: new Date(0), data: {url: '/a/1'}}
    ])
    expect(result.groups[0].history.back.length).toBe(1)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.current.url).toBe('/a/1')
    expect(result.groups[0].history.current.id).toBe(4)
    expect(result.groups[0].history.current.containerIndex).toBe(0)
    expect(result.lastPageId).toBe(4)
  })

  it('switches container', () => {
    const result : InitializedState = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 2}}
    ])
    expect(result.groups[0].history.back.length).toBe(1)
    expect(result.groups[0].history.back[0].url).toBe('/a')
    expect(result.groups[0].history.current.url).toBe('/c')
    expect(result.groups[0].history.current.id).toBe(3)
    expect(result.groups[0].history.current.containerIndex).toBe(2)
    expect(result.lastPageId).toBe(3)
  })

  it('goes back in history', () => {
    const result : InitializedState = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
      {type: PUSH, time: new Date(0), data: {url: '/b/1'}},
      {type: BACK, time: new Date(0), data: {n: 2}}
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
    const result : InitializedState = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
      {type: PUSH, time: new Date(0), data: {url: '/b/1'}},
      {type: BACK, time: new Date(0), data: {n: 2}},
      {type: FORWARD, time: new Date(0), data: {n: 1}}
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
    const result : InitializedState = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
      {type: BACK, time: new Date(0), data: {n: 1}}
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
    const result : InitializedState = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
      {type: BACK, time: new Date(0), data: {n: 1}},
      {type: FORWARD, time: new Date(0), data: {n: 1}}
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
    const result : InitializedState = performAll([
      ...createContainers,
      {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
      {type: PUSH, time: new Date(0), data: {url: '/b/1'}},
      {type: BACK, time: new Date(0), data: {n: 2}},
      {type: POPSTATE, time: new Date(0), data: {id: 4}}
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
    it('switches tab, then pop back', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: POPSTATE, time: new Date(0), data: {id: 1}}
      ])
      expect(result.groups[0].history.back.length).toBe(0)
      expect(result.groups[0].history.current.url).toBe('/a')
      expect(result.groups[0].history.current.id).toBe(1)
      expect(result.groups[0].history.forward.length).toBe(1)
      expect(result.groups[0].history.forward[0].url).toBe('/b')
      expect(result.groups[0].history.forward[0].id).toBe(2)
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.lastPageId).toBe(3)
    })

    it('switches container, goes back, switches container back', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        {type: PUSH, time: new Date(0), data: {url: '/a/1'}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 0}},
        {type: BACK, time: new Date(0), data: {n: 1}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 0}}
      ])
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
      const result : InitializedState = performAll([
        ...createContainers,
        ...createContainers2,
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 2}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 1, containerIndex: 1}}
      ])
      expect(result.activeGroupIndex).toBe(1)
      expect(result.groups[0].history.current.containerIndex).toBe(2)
      expect(result.groups[1].history.current.containerIndex).toBe(1)
    })

    it('reloads a previous page', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}}
      ])
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.groups[0].history.current.url).toBe('/a')
      expect(result.groups[0].history.forward.length).toBe(0)
    })
  })

  describe('creates steps', () => {
    const createSteps = (actions:Action[], lastUpdate:number=-1) : Step[] =>
        util.createStepsSinceLastUpdate(actions, zeroPage, new Date(lastUpdate))

    it('for init (default)', () => {
      const steps = createSteps([
        ...createContainers,
        {type: LOAD_FROM_URL, time: new Date(2), data: {url: '/a'}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
      ])
    })

    it('for init (non-default)', () => {
      const steps = createSteps([
        ...createContainers,
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/b'}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
        {fn: push, args: [{url: '/b', id: 2, containerIndex: 1}]}
      ])
    })

    it('for init (non-default) 2', () => {
      const steps = createSteps([
        ...createContainers,
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/b/1'}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
        {fn: push, args: [{url: '/b', id: 2, containerIndex: 1}]},
        {fn: push, args: [{url: '/b/1', id: 4, containerIndex: 1}]}
      ])
    })

    it('for switching a tab', () => {
      const steps = createSteps([
        ...createContainers,
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
        {fn: push, args: [{url: '/b', id: 2, containerIndex: 1}]}
      ])
    })

    it('for push', () => {
      const steps = createSteps([
        ...createContainers,
        {type: PUSH, time: new Date(0), data: {url: '/a/1'}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
        {fn: push, args: [{url: '/a/1', id: 4, containerIndex: 0}]}
      ])
    })

    it('for back', () => {
      const actions = [
        ...createContainers,
        {type: PUSH, time: new Date(0), data: {url: '/a/1'}},
        {type: BACK, time: new Date(0), data: {n: 1}}
      ]
      const steps = createSteps(actions)
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
        {fn: push, args: [{url: '/a/1', id: 4, containerIndex: 0}]},
        {fn: back, args: [1]}
      ])
    })

    it('for pop back', () => {
      const actions = [
        ...createContainers,
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: POPSTATE, time: new Date(2), data: {id: 1}}
      ]
      const steps = createSteps(actions, 1)
      expect(steps).toEqual([])
    })

    it('for pop back, then other stuff', () => {
      const actions = [
        ...createContainers,
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: POPSTATE, time: new Date(2), data: {id: 1}},
        {type: PUSH, time: new Date(2), data: {url: '/a/1'}},
      ]
      const steps = createSteps(actions, 1)
      expect(steps).toEqual([
        {fn: push, args: [{url: '/a/1', id: 4, containerIndex: 0}]}
      ])
    })

    it('for reloading the initial page', () => {
      const steps = createSteps([
        ...createContainers,
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: LOAD_FROM_URL, time: new Date(2), data: {url: '/a'}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
      ])
    })

    it('for reloading a previous page', () => {
      const steps = createSteps([
        ...createContainers,
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}}
      ])
      expect(steps).toEqual([
        {fn: replace, args: [{url: zeroPage, id: 0, containerIndex: 0}]},
        {fn: push, args: [{url: '/a', id: 1, containerIndex: 0}]},
      ])
    })
  })
})