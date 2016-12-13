// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import { deriveState } from '../src/util/history'
import { createSteps } from '../src/main'
import { push, back, forward, go, replace } from '../src/browserFunctions'
import { CREATE_CONTAINER, SWITCH_TO_CONTAINER, INIT_GROUP } from "../src/constants/ActionTypes"
import type { State, StateSnapshot } from '../src/types'

const createContainers = (currentUrl='/a') => [
  {type: CREATE_CONTAINER, initialUrl: '/a', urlPatterns: ['/a', '/a/*']},
  {type: CREATE_CONTAINER, initialUrl: '/b', urlPatterns: ['/b', '/b/*']},
  {type: CREATE_CONTAINER, initialUrl: '/c', urlPatterns: ['/c', '/c/*']},
  {type: INIT_GROUP, groupIndex: 0, currentUrl}
]

describe('main', () => {
  const tempState:State = deriveState(createContainers())
  const group = tempState.groups[0]
  const originalContainers = group.containers

  const perform = (action) : StateSnapshot => deriveState([action])
  const performAll = (actions) : StateSnapshot => deriveState(actions)

  it.only('creates steps to init (default)', () => {
    const state = performAll(createContainers())

    console.log(state.groups[0].history)

    const steps = createSteps(state)
    expect(state.groups[0].history.back.length).toBe(0)
    expect(steps.length).toBe(1)
    expect(steps).toEqual([
      {fn: push, args: [state.groups[0].history.current]}
    ])
  })

  it('creates steps to init (non-default)', () => {
    const state = performAll(createContainers('/b'))
    const steps = createSteps(state)
    expect(state.groups[0].history.back.length).toBe(1)
    expect(steps.length).toBe(2)
    expect(steps).toEqual([
      {fn: push, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.current]}
    ])
  })

  it('creates steps to init (non-default) 2', () => {
    const state = performAll(createContainers('/b/1'))
    const steps = createSteps(state)
    expect(state.groups[0].history.back.length).toBe(2)
    expect(steps.length).toBe(3)
    expect(steps).toEqual([
      {fn: push, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.back[1]]},
      {fn: push, args: [state.groups[0].history.current]}
    ])
  })

  it('creates steps for switching a tab', () => {
    const state = deriveState([
      ...createContainers(),
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1}
    ])
    const steps = createSteps(state)
    expect(state.groups[0].history.back.length).toBe(1)
    expect(steps).toEqual([
      {fn: back, args: [1]},
      {fn: push, args: [state.groups[0].history.back[0]]},
      {fn: push, args: [state.groups[0].history.current, true]}
    ])
  })
})