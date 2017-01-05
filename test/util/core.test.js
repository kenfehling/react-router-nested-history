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
import {getBackPage} from "../../src/util/core"
import {_resetHistory} from "../../src/browserFunctions";

describe('core utils', () => {

  beforeEach(_resetHistory)

  const performAll = (actions: Action[]): InitializedState =>
      deriveInitializedState(actions, zeroPage)

  it.only('gets back page', () => {
    const state:InitializedState = performAll([
      ...createContainers,
      loadAction('/a'),
      pushAction('/a/1', '/a/:id', 0, 0),
      pushAction('/a/2', '/a/:id', 0, 0)
    ])
    const page:?Page = getBackPage(state)
    expect(page).toBeDefined()
    if (page) {
      expect(page.url).toBe('/a/1')
      expect(page.params).toEqual({id: '1'})
    }
  })
  
})