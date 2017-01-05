// @flow
/* globals describe, it, expect, beforeEach */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import * as util from '../../src/util/history'
import { push, back, forward, go, replace,
  _resetHistory } from '../../src/browserFunctions'
import { LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD,
  POPSTATE } from "../../src/constants/ActionTypes"
import type { Step, Action} from '../../src/types'
import { State, InitializedState, UninitializedState } from '../../src/types'
import fp from 'lodash/fp'
import { createContainers, createContainers2, zeroPage} from "../fixtures"
import {getShiftAmountForId} from "../../src/util/core";
import {loadAction, pushAction, switchAction, backAction, forwardAction} from "../helpers"

describe('history utils', () => {

  beforeEach(_resetHistory)

  const performAll = (actions:Action[]): InitializedState =>
      util.deriveInitializedState(actions, zeroPage)
  const getContainerStackOrder = (actions:Action[], groupIndex:number) =>
      util.getContainerStackOrder(actions, groupIndex, zeroPage)
  const getIndexedContainerStackOrder = (actions:Action[], groupIndex:number) =>
      util.getIndexedContainerStackOrder(actions, groupIndex, zeroPage)
  const state:UninitializedState =
      util.deriveUninitializedState(createContainers, zeroPage)
  const group = state.groups[0]
  const containers = group.containers
  
  it('loads 2 groups with the proper starting URL', () => {
    const state = performAll([
      ...createContainers,
      ...createContainers2,
      loadAction('/e')
    ])
    expect(state.groups[0].history.current.url).toEqual('/a')
    expect(state.groups[1].history.current.url).toEqual('/e')
    expect(state.activeGroupIndex).toEqual(1)
  })

  it('gets history shift amount', () => {
    const state = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1', {id: 1}, 0, 0)
    ])
    expect(getShiftAmountForId(state, 1)).toEqual(-1)
  })

  it('gets container stack order (default)', () => {
    const actions = createContainers
    expect(getContainerStackOrder(actions, 0)).toEqual(containers)
  })

  it('gets container stack order (default) 2', () => {
    const actions = [
      ...createContainers,
      loadAction('/a'),
      switchAction(0, 1),
      switchAction(0, 2),
    ]
    expect(getContainerStackOrder(actions, 0)).toEqual(fp.reverse(containers))
  })

  it('gets container stack order (default) b', () => {
    const actions = [
      ...createContainers,
      loadAction('/b')
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
      loadAction('/b')
    ]
    expect(getIndexedContainerStackOrder(actions, 0)).toEqual([1, 0, 2])
  })

  it('pushes page', () => {
    const result : InitializedState = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1', {id: 1}, 0, 0)
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
      loadAction('/a'),
      switchAction(0, 2),
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
      loadAction('/a'),
      switchAction(0, 1),
      pushAction('/b/1', {id: 1}, 0, 1),
      backAction(2)
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
      loadAction('/a'),
      switchAction(0, 1),
      pushAction('/b/1', {id: 1}, 0, 1),
      backAction(2),
      forwardAction()
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
      loadAction('/a'),
      switchAction(0, 1),
      backAction()
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
      loadAction('/a'),
      switchAction(0, 1),
      backAction(),
      forwardAction()
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
      loadAction('/a'),
      switchAction(0, 1),
      pushAction('/b/1', {id: 1}, 0, 1),
      backAction(2),
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
        loadAction('/a'),
        switchAction(0, 1),
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
        loadAction('/a'),
        pushAction('/a/1', {id: 1}, 0, 0),
        switchAction(0, 1),
        switchAction(0, 0),
        backAction(),
        switchAction(0, 1),
        switchAction(0, 0),
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

    it('switches container when pushing in non-active container', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        loadAction('/a'),
        pushAction('/b/1', {id: 1}, 0, 1)
      ])
      expect(result.groups[0].history.back.length).toBe(2)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.back[1].url).toBe('/b')
      expect(result.groups[0].history.current.url).toBe('/b/1')
    })

    it('switches group when pushing in non-active group', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        ...createContainers2,
        loadAction('/a'),
        pushAction('/e/1', {id: 1}, 1, 0)
      ])
      expect(result.groups[1].history.back.length).toBe(1)
      expect(result.groups[1].history.back[0].url).toBe('/e')
      expect(result.groups[1].history.current.url).toBe('/e/1')
    })

    it('switches group without affecting other group', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        ...createContainers2,
        loadAction('/a'),
        switchAction(0, 2),
        switchAction(1, 1),
      ])
      expect(result.activeGroupIndex).toBe(1)
      expect(result.groups[0].history.current.containerIndex).toBe(2)
      expect(result.groups[1].history.current.containerIndex).toBe(1)
    })

    it('loads group without affecting other group', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        ...createContainers2,
        loadAction('/b')
      ])
      expect(result.activeGroupIndex).toBe(0)
      expect(result.groups[0].history.current.containerIndex).toBe(1)
      expect(result.groups[1].history.current.containerIndex).toBe(0)
      expect(result.groups[1].history.current.url).toBe('/e')
    })

    it('reloads a previous page', () => {
      const result : InitializedState = performAll([
        ...createContainers,
        loadAction('/a'),
        switchAction(0, 1),
        loadAction('/a')
      ])
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.groups[0].history.current.url).toBe('/a')
      expect(result.groups[0].history.forward.length).toBe(0)
    })
  })

  describe('creates steps', () => {
    const createSteps = (actions:Action[], lastUpdate:number=-1) : Step[] =>
        util.createStepsSinceUpdate(actions, zeroPage, new Date(lastUpdate))

    it('for init (default)', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/a', 2),
      ])
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
      ])
    })

    it('for init (non-default)', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/b')
      ])
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
        {fn: push, args: ['/b', 2]}
      ])
    })

    it('for init (non-default) 2', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/b/1'),
      ])
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
        {fn: push, args: ['/b', 2]},
        {fn: push, args: ['/b/1', 4]}
      ])
    })

    it('for switching a tab', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/a'),
        switchAction(0, 1),
      ])
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
        {fn: push, args: ['/b', 2]}
      ])
    })

    it('for push', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/a'),
        pushAction('/a/1', {id: 1}, 0, 0)
      ])
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
        {fn: push, args: ['/a/1', 4]}
      ])
    })

    it('for back', () => {
      const actions = [
        ...createContainers,
        loadAction('/a'),
        pushAction('/a/1', {id: 1}, 0, 0),
        backAction()
      ]
      const steps = createSteps(actions)
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
        {fn: push, args: ['/a/1', 4]},
        {fn: back, args: [1]}
      ])
    })

    it('for pop back', () => {
      const actions = [
        ...createContainers,
        loadAction('/a'),
        switchAction(0, 1),
        {type: POPSTATE, time: new Date(2), data: {id: 1}}
      ]
      const steps = createSteps(actions, 1)
      expect(steps).toEqual([])
    })

    it('for pop back, then other stuff', () => {
      const actions = [
        ...createContainers,
        loadAction('/a'),
        switchAction(0, 1),
        {type: POPSTATE, time: new Date(2), data: {id: 1}},
        pushAction('/a/1', {id: 1}, 0, 0, 2),
      ]
      const steps = createSteps(actions, 1)
      expect(steps).toEqual([
        {fn: push, args: ['/a/1', 4]}
      ])
    })

    it('for reloading the initial page', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/a'),
        loadAction('/a', 2),
      ], 1)
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
      ])
    })

    it('for reloading a previous page', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/a'),
        switchAction(0, 1),
        loadAction('/a', 2)
      ], 1)
      expect(steps).toEqual([
        {fn: replace, args: [zeroPage, 0]},
        {fn: push, args: ['/a', 1]},
      ])
    })

    it('for reloading the initial page (from refresh)', () => {
      const steps = createSteps([
        ...createContainers,
        loadAction('/a'),
        loadAction('/a', 2, true),
      ], 1)
      expect(steps).toEqual([])
    })
  })
})