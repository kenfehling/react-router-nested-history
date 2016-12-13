// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import * as util from '../../src/util/history'
import { push, back, forward, go } from '../../src/browserFunctions'
import { CREATE_CONTAINER, INIT_GROUP, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD } from "../../src/constants/ActionTypes"
import type { State } from '../../src/types'
import * as _ from 'lodash'
import fp from 'lodash/fp'

const createContainers = (currentUrl='/a') => [
  {type: CREATE_CONTAINER, initialUrl: '/a', urlPatterns: ['/a', '/a/*']},
  {type: CREATE_CONTAINER, initialUrl: '/b', urlPatterns: ['/b', '/b/*']},
  {type: CREATE_CONTAINER, initialUrl: '/c', urlPatterns: ['/c', '/c/*']},
  {type: INIT_GROUP, groupIndex: 0, currentUrl}
]

describe('history utils', () => {
  const originalState:State = util.deriveState(createContainers())
  const group = originalState.groups[0]
  const containers = group.containers

  const a = {url: '/a', id: 1, container: containers[0]}
  const b = {url: '/b', id: 2, container: containers[1]}
  const a1 = {url: '/a/1', id: 3, container: containers[0]}

  it('reduces a bunch of actions', () => {
    expect(util.reduceAll(null, createContainers())).toEqual(
        _.omit(originalState, ['previousState', 'lastAction']))

    const newState = util.reduceAll(null, [
      ...createContainers(),
      {type: PUSH, url: '/a/1'}
    ])
    expect(newState.groups[0].history.current.url).toEqual('/a/1')
    expect(newState.groups[0].history.back.length).toEqual(1)
    expect(newState.groups[0].history.back[0].url).toEqual('/a')
  })

  describe('handles existing state', () => {
    const perform = (action): State => util.reducer(originalState, action)
    const performAll = (actions): State => util.reduceAll(originalState, actions)

    it('diffs old state and new state for push', () => {
      const newState = perform({type: PUSH, url: '/a/1'})
      const steps = util.diffStateToSteps(originalState, newState)
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [newState.groups[0].history.back[0]]},
        {fn: push, args: [newState.groups[0].history.current]}
      ])
    })

    it('diffs old state and new state for back', () => {
      const newState = performAll([{type: PUSH, url: '/a/1'}, {type: BACK}])
      const steps = util.diffStateToSteps(originalState, newState)
      expect(steps).toEqual([
        {fn: back, args: [1]},
        {fn: push, args: [newState.groups[0].history.current]},
        {fn: push, args: [newState.groups[0].history.forward[0]]},
        {fn: back, args: [1]}
      ])
    })

    it('gets history shift amount', () => {
      const newState = perform({type: PUSH, url: '/a/1'})
      expect(util.getHistoryShiftAmount(newState, 1)).toEqual(-1)
    })

    it('gets container stack order (default)', () => {
      const actions = createContainers()
      expect(util.getContainerStackOrder(actions, 0)).toEqual(containers)
    })

    it('gets container stack order (default) 2', () => {
      const actions = [
        ...createContainers(),
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1},
        {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2},
      ]
      expect(util.getContainerStackOrder(actions, 0)).toEqual(fp.reverse(containers))
    })

    it('gets container stack order (default) b', () => {
      const actions = createContainers('/b')
      expect(util.getContainerStackOrder(actions, 0)).toEqual([
          containers[1],
          containers[0],
          containers[2]
      ])
    })

    it('gets indexed container stack order (default)', () => {
      const actions = createContainers()
      expect(util.getIndexedContainerStackOrder(actions, 0)).toEqual([0, 1, 2])
    })

    it('gets indexed container stack order (non-default)', () => {
      const actions = createContainers('/b')
      expect(util.getIndexedContainerStackOrder(actions, 0)).toEqual([1, 0, 2])
    })
  })

  describe('createSteps', () => {
    const perform = (action) : State => util.deriveState([action])
    const performAll = (actions) : State => util.deriveState(actions)

    it('creates steps to init (default)', () => {
      const actions = createContainers()
      const state = performAll(actions)
      const steps = util.createSteps(actions)
      expect(state.groups[0].history.back.length).toBe(0)
      expect(steps.length).toBe(1)
      expect(steps).toEqual([
        {fn: push, args: [state.groups[0].history.current]}
      ])
    })

    it('creates steps to init (non-default)', () => {
      const actions = createContainers('/b')
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
      const actions = createContainers('/b/1')
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
        ...createContainers(),
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