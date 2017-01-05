// @flow
/* globals describe, it, expect, beforeEach */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import { createContainers, createContainers2, zeroPage} from "../fixtures"
import {loadAction, pushAction, switchAction, backAction, forwardAction} from "../helpers"
import {deriveInitializedState} from "../../src/util/history"
import {InitializedState} from "../../src/types"
import type {Page, Action} from '../../src/types'
import {getBackPage, parseParamsFromPatterns} from "../../src/util/core"
import {_resetHistory} from "../../src/browserFunctions";

describe('core utils', () => {

  beforeEach(_resetHistory)

  const performAll = (actions: Action[]): InitializedState =>
      deriveInitializedState(actions, zeroPage)

  it('parses params from patterns', () => {
    const patterns = ['/a', '/a/:id', '/a/:id/:name']
    expect(parseParamsFromPatterns(patterns, '/a/1/cat')).toEqual({id: '1', name: 'cat'})
  })

  it('gets back page', () => {
    const state:InitializedState = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1/cat', '/a/:id/:name', 0, 0),
      pushAction('/a/2/dog', '/a/:id/:name', 0, 0)
    ])
    const page:?Page = getBackPage(state)
    expect(page).toBeDefined()
    if (page) {
      expect(page.url).toBe('/a/1/cat')
      expect(page.params).toEqual({id: '1', name: 'cat'})
    }
  })
  
})