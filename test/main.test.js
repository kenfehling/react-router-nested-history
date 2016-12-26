// @flow
/* globals describe, it, expect, beforeEach, Promise */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import { runSteps } from '../src/main'
import * as util from '../src/util/history'
import { push, back, forward, go, _history, _resetHistory } from '../src/browserFunctions'
import { LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../src/constants/ActionTypes"
import { createContainers, zeroPage } from "./fixtures"
import type { Step, Page, Action } from "../src/types"
import * as _ from "lodash"

describe('main', () => {

  /**
   * Using memoryHistory we can examine the history entries
   */
  describe('memoryHistory tests', () => {

    beforeEach(_resetHistory)
    
    const run = (actions:Object[], lastUpdate:number=-1) : Promise =>
        runSteps(util.createStepsSinceLastUpdate(
            [...createContainers, ...actions],
            zeroPage,
            new Date(lastUpdate)
        )).then(() => Promise.resolve(
          _history.entries.length === 0 || _history.entries[0].state ?
          _history : {
            entries: _.tail(_history.entries),  // remove '/' at beginning
            index: _history.index - 1
          })
        )

    it('push', async () => {
      await run([
        {type: PUSH, data: {url: '/a/1'}}
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(index).toBe(2)
      })
    })

    it('back', async () => {
      await run([
        {type: PUSH, time: new Date(0), data: {url: '/a/1'}},
        {type: PUSH, time: new Date(0), data: {url: '/a/2'}},
        {type: BACK, data: {n: 1}}
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(4)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(entries[3].pathname).toBe('/a/2')
        expect(index).toBe(2)
      })
    })

    it('loads the initial page (with "zero page")', async () => {
      await run([
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}}
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(2)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(index).toBe(1)
      })
    })

    it.only('reloads the initial page (with "zero page")', async () => {
      await run([
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: LOAD_FROM_URL, time: new Date(2), data: {url: '/a'}}
      ], 1).then(({entries, index}) => {

        console.log(entries)

        expect(entries.length).toBe(2)
        expect(index).toBe(1)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
      })
    })

    it('reloads a previous page', async () => {
      await run([
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}},
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}}
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(4)
        expect(index).toBe(3)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe(zeroPage)
        expect(entries[3].pathname).toBe('/a')
      })
    })

    it('reacts to being on the zero page', async () => {
      await run([
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: BACK, time: new Date(0), data: {n: 1}},
        {type: PUSH, time: new Date(0), data: {url: '/a/1'}}
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(index).toBe(2)
      })
    })

    it('reacts to being on the zero page during switch', async () => {
      await run([
        {type: LOAD_FROM_URL, time: new Date(0), data: {url: '/a'}},
        {type: BACK, time: new Date(0), data: {n: 1}},
        {type: SWITCH_TO_CONTAINER, time: new Date(0), data: {groupIndex: 0, containerIndex: 1}}
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/b')
        expect(index).toBe(2)
      })
    })
    
  })
})