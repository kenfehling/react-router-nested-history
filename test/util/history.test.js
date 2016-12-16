// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import * as util from '../../src/util/history'
import { push, back, forward, go } from '../../src/browserFunctions'
import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD } from "../../src/constants/ActionTypes"
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
  const originalState:State = util.deriveState(createContainers)
  const group = originalState.groups[0]
  const containers = group.containers

  it('reduces a bunch of actions', () => {
    expect(util.reduceAll(null, createContainers)).toEqual(
        _.omit(originalState, ['previousState', 'lastAction']))

    const state = util.reduceAll(null, [
      ...createContainers,
      {type: PUSH, url: '/a/1'}
    ])
    expect(state.groups[0].history.current.url).toEqual('/a/1')
    expect(state.groups[0].history.back.length).toEqual(1)
    expect(state.groups[0].history.back[0].url).toEqual('/a')
  })

  describe('loads initial state', () => {
    const perform = (action): State => util.reducer(null, action)
    const performAll = (actions): State => util.reduceAll(null, actions)

    it('loads 2 groups with the proper starting URL', () => {
      const state = performAll([
        ...createContainers,
        ...createContainers2,
        {type: LOAD_FROM_URL, url: '/e'}
      ])
      expect(state.groups[0].history.current.url).toEqual('/a')
      expect(state.groups[1].history.current.url).toEqual('/e')
    })
  })

  describe('handles existing state', () => {
    const perform = (action): State => util.reducer(originalState, action)
    const performAll = (actions): State => util.reduceAll(originalState, actions)

    it('diffs old state and new state for push', () => {
      const state = perform({type: PUSH, url: '/a/1'})
      const steps = util.diffStateToSteps(originalState, state)
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [state.groups[0].history.back[0]]},
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('diffs old state and new state for back', () => {
      const state = performAll([{type: PUSH, url: '/a/1'}, {type: BACK}])
      const steps = util.diffStateToSteps(originalState, state)
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [state.groups[0].history.current]},
        {fn: push, args: [state.groups[0].history.forward[0]]},
        {fn: back, args: [1]}
      ])
    })

    it('gets history shift amount', () => {
      const state = perform({type: PUSH, url: '/a/1'})
      expect(util.getHistoryShiftAmount(state, 1)).toEqual(-1)
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
  })

  describe('createSteps', () => {
    const perform = (action) : State => util.deriveState([action])
    const performAll = (actions) : State => util.deriveState(actions)

    it('creates steps to init (default)', () => {
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

    it('creates steps to init (non-default)', () => {
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

    it('creates steps to init (non-default) 2', () => {
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

    it('creates steps for switching a tab', () => {
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
  })
})