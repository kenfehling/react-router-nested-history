// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import reducer from '../../src/reducers/index'
import { deriveState } from '../../src/util/history'
import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../../src/constants/ActionTypes"
import type { State } from '../../src/types'

const createContainers = [
  {type: CREATE_CONTAINER, groupIndex: 0, initialUrl: '/a', urlPatterns: ['/a', '/a/:id']},
  {type: CREATE_CONTAINER, groupIndex: 0, initialUrl: '/b', urlPatterns: ['/b', '/b/:id']},
  {type: CREATE_CONTAINER, groupIndex: 0, initialUrl: '/c', urlPatterns: ['/c', '/c/:id']}
]

const createContainers2 = [
  {type: CREATE_CONTAINER, groupIndex: 1, initialUrl: '/e', urlPatterns: ['/e', '/e/:id']},
  {type: CREATE_CONTAINER, groupIndex: 1, initialUrl: '/f', urlPatterns: ['/f', '/f/:id']}
]

describe('reducer', () => {
  const tempState = deriveState(createContainers)
  const group = tempState.groups[0]
  const containers = group.containers

  describe('with no initial state', () => {
    const perform = (action) : State => deriveState([action])
    const performAll = (actions) : State => deriveState(actions)

    it('loads with default container', () => {
      const result = performAll(createContainers)
      expect(result.groups[0].history.current.url).toBe('/a')
      expect(result.groups[0].containers.length).toBe(3)
      expect(result.groups[0].containers[0].history.current.url).toBe('/a')
      expect(result.groups[0].containers[1].history.current.url).toBe('/b')
      expect(result.groups[0].containers[2].history.current.url).toBe('/c')
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.lastPageId).toBe(3)
    })

    it('loads with non-default container', () => {
      const result = performAll([
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/b'}
      ])
      expect(result.groups[0].history.back.length).toBe(1)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.current.url).toBe('/b')
      expect(result.groups[0].history.current.containerIndex).toBe(1)
    })

    it('loads with non-initial page on default container', () => {
      const result = performAll([
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/a/1'}
      ])
      expect(result.groups[0].history.back.length).toBe(1)
      expect(result.groups[0].history.current.url).toBe('/a/1')
      expect(result.groups[0].history.current.id).toBe(4)
      expect(result.groups[0].containers[0].history.current.url).toBe('/a/1')
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.lastPageId).toBe(4)
    })

    it('loads with non-initial page on non-default container', () => {
      const result = performAll([
        ...createContainers,
        {type: LOAD_FROM_URL, url: '/b/1'}
      ])
      expect(result.groups[0].history.back.length).toBe(2)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.back[1].url).toBe('/b')
      expect(result.groups[0].history.current.url).toBe('/b/1')
      expect(result.groups[0].containers[1].history.current.url).toBe('/b/1')
      expect(result.groups[0].history.current.id).toBe(4)
      expect(result.groups[0].history.current.containerIndex).toBe(1)
      expect(result.lastPageId).toBe(4)
    })
  })

  describe('with initial state', () => {
    const state = [
      ...createContainers,
      {type: PUSH, url: '/a/1'},
      {type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 1}
    ]

    const perform = (action:Object) : State => deriveState(reducer(state, action))
    const performAll = (actions:Array<Object>) : State =>
        deriveState(actions.reduce(reducer, state))

    it('pushes page', () => {
      const result = perform({type: PUSH, url: '/b/2'})
      expect(result.groups[0].history.back.length).toBe(3)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.back[1].url).toBe('/a/1')
      expect(result.groups[0].history.back[2].url).toBe('/b')
      expect(result.groups[0].history.current.url).toBe('/b/2')
      expect(result.groups[0].history.current.id).toBe(5)
      expect(result.groups[0].history.current.containerIndex).toBe(1)
      expect(result.lastPageId).toBe(5)
    })

    it('switches container', () => {
      const derivedState = deriveState(state)
      const result = perform({type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 0})
      expect(result.groups[0].history.back.length).toBe(1)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.current.url).toBe('/a/1')
      expect(result.groups[0].history.current.id).toBe(4)
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.lastPageId).toBe(4)
    })

    it('switches container(2)', () => {
      const result = perform({type: SWITCH_TO_CONTAINER, groupIndex: 0, containerIndex: 2})
      expect(result.groups[0].history.back.length).toBe(2)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.back[1].url).toBe('/a/1')
      expect(result.groups[0].history.current.url).toBe('/c')
      expect(result.groups[0].history.current.id).toBe(3)
      expect(result.groups[0].history.current.containerIndex).toBe(2)
      expect(result.lastPageId).toBe(4)
    })

    it('goes back in history', () => {
      const result = performAll([
        {type: PUSH, url: '/b/1'},
        {type: BACK, n: 2}
      ])
      expect(result.groups[0].history.back.length).toBe(1)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.current.url).toBe('/a/1')
      expect(result.groups[0].history.current.id).toBe(4)
      expect(result.groups[0].history.forward.length).toBe(2)
      expect(result.groups[0].history.forward[0].url).toBe('/b')
      expect(result.groups[0].history.forward[1].url).toBe('/b/1')
      expect(result.groups[0].history.current.containerIndex).toBe(0)
      expect(result.lastPageId).toBe(5)
    })

    it('goes forward in history', () => {
      const result = performAll([
        {type: PUSH, url: '/b/1'},
        {type: BACK, n: 2},
        {type: FORWARD, n: 2}
      ])
      expect(result.groups[0].history.back.length).toBe(3)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.back[1].url).toBe('/a/1')
      expect(result.groups[0].history.back[2].url).toBe('/b')
      expect(result.groups[0].history.current.url).toBe('/b/1')
      expect(result.groups[0].history.current.id).toBe(5)
      expect(result.groups[0].history.forward.length).toBe(0)
      expect(result.groups[0].history.current.containerIndex).toBe(1)
      expect(result.lastPageId).toBe(5)
    })

    it('goes back N pages in history', () => {

    })

    it('goes forward N pages in history', () => {

    })

    it('correctly updates history from popstate', () => {
      const result = performAll([
        {type: PUSH, url: '/b/1'},
        {type: BACK, n: 2},
        {type: POPSTATE, id: 5}
      ])
      expect(result.groups[0].history.back.length).toBe(3)
      expect(result.groups[0].history.back[0].url).toBe('/a')
      expect(result.groups[0].history.back[1].url).toBe('/a/1')
      expect(result.groups[0].history.back[2].url).toBe('/b')
      expect(result.groups[0].history.current.url).toBe('/b/1')
      expect(result.groups[0].history.current.id).toBe(5)
      expect(result.groups[0].history.forward.length).toBe(0)
      expect(result.groups[0].history.current.containerIndex).toBe(1)
      expect(result.lastPageId).toBe(5)
    })
  })

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
    const result = deriveState(actions)
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
    const result = deriveState(actions)
    expect(result.activeGroupIndex).toBe(1)
    expect(result.groups[0].history.current.containerIndex).toBe(2)
    expect(result.groups[1].history.current.containerIndex).toBe(1)
  })
})