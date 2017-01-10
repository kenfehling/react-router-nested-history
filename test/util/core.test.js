// @flow
/* globals describe, it, expect, beforeEach */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import { createContainers, createContainers2, createContainers3,
  zeroPage } from "../fixtures"
import {loadAction, pushAction, topAction, switchAction, backAction, forwardAction} from "../helpers"
import {deriveInitializedState} from "../../src/util/actions"
import {InitializedState} from "../../src/types"
import type {Page, Action} from '../../src/types'
import {getBackPage} from "../../src/util/core"
import {_resetHistory} from "../../src/browserFunctions";

describe('core utils', () => {

  beforeEach(_resetHistory)

  const performAll = (actions: Action[]): InitializedState =>
      deriveInitializedState(actions, zeroPage)

  it('gets back page', () => {
    const state:InitializedState = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1/cat', {id: 1, name: 'cat'}, 0, 0),
      pushAction('/a/2/dog', {id: 2, name: 'dog'}, 0, 0)
    ])
    const page:?Page = getBackPage(state)
    expect(page).toBeDefined()
    if (page) {
      expect(page.url).toBe('/a/1/cat')
      expect(page.params).toEqual({id: 1, name: 'cat'})
    }
  })

  it('goes to top', () => {
    const state:InitializedState = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1/cat', {id: 1, name: 'cat'}, 0, 0),
      pushAction('/a/2/dog', {id: 2, name: 'dog'}, 0, 0),
      topAction(0, 0)
    ])

    expect(state.groups[0].containers[0].history.back.length).toBe(0);
    expect(state.groups[0].containers[0].history.current.url).toBe('/a');
    expect(state.groups[0].containers[0].history.current.id).toBe(1);
    expect(state.groups[0].containers[0].history.forward.length).toBe(0)

    expect(state.groups[0].history.back.length).toBe(0);
    expect(state.groups[0].history.current.url).toBe('/a');
    expect(state.groups[0].history.current.id).toBe(1);
    expect(state.groups[0].history.forward.length).toBe(0)

    expect(state.browserHistory.back.length).toBe(1);
    expect(state.browserHistory.back[0].url).toBe(zeroPage);
    expect(state.browserHistory.current.url).toBe('/a');
    expect(state.browserHistory.current.id).toBe(1);
    expect(state.browserHistory.forward.length).toBe(0)
  })

  it('switches to container', () => {
    const state:InitializedState = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1/cat', {id: 1, name: 'cat'}, 0, 0),
      switchAction(0, 1)
    ])

    expect(state.groups[0].containers[0].history.back.length).toBe(1);
    expect(state.groups[0].containers[0].history.current.url).toBe('/a/1/cat');
    expect(state.groups[0].containers[0].history.current.id).toBe(4);
    expect(state.groups[0].containers[0].history.forward.length).toBe(0)

    expect(state.groups[0].history.back.length).toBe(2);
    expect(state.groups[0].history.current.url).toBe('/b');
    expect(state.groups[0].history.current.id).toBe(2);
    expect(state.groups[0].history.forward.length).toBe(0)

    expect(state.browserHistory.back.length).toBe(3);
    expect(state.browserHistory.current.url).toBe('/b');
    expect(state.browserHistory.current.id).toBe(2);
    expect(state.browserHistory.forward.length).toBe(0)
  })
})