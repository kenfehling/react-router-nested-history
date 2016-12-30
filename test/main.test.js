// @flow
/* globals describe, it, expect, beforeEach, Promise */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import { runSteps } from '../src/main'
import * as util from '../src/util/history'
import { push, back, forward, go, _history, _resetHistory } from '../src/browserFunctions'
import { createContainers, zeroPage } from "./fixtures"
import type { Step, Page, Action } from "../src/types"
import * as _ from "lodash"
import {loadAction, switchAction, pushAction, backAction} from "./helpers";

describe('main', () => {

  /**
   * Using memoryHistory we can examine the history entries
   */
  describe('memoryHistory tests', () => {

    beforeEach(_resetHistory)
    
    const run = (actions:Action[], lastUpdate:number=-1) : Promise => {
      return runSteps(util.createStepsSinceLastUpdate(
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
    }

    it('loads the initial page', async () => {
      await run([
        loadAction('/a')
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(2)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(index).toBe(1)
      })
    })

    it('reloads the initial page', async () => {
      await run([
        loadAction('/a'),
        loadAction('/a', 2)
      ], 1).then(({entries, index}) => {
        expect(entries.length).toBe(2)
        expect(index).toBe(1)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
      })
    })

    it('reloads a previous page', async () => {
      await run([
        loadAction('/a'),
        switchAction(0, 1),
        loadAction('/a', 2)
      ], 1).then(({entries, index}) => {
        expect(entries.length).toBe(2)
        expect(index).toBe(1)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
      })
    })

    it('reloads the initial page (from refresh)', async () => {
      await run([
        loadAction('/a'),
        loadAction('/a', 2, true)
      ], 1).then(({entries}) => {
        expect(entries.length).toBe(0)
      })
    })

    it('push', async () => {
      await run([
        loadAction('/a'),
        pushAction('/a/1', 0, 0)
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(index).toBe(2)
      })
    })

    it('push to different container', async () => {
      await run([
        loadAction('/a'),
        pushAction('/b/1', 0, 1)
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(4)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/b')
        expect(entries[3].pathname).toBe('/b/1')
        expect(index).toBe(3)
      })
    })

    it('back', async () => {
      await run([
        loadAction('/a'),
        pushAction('/a/1', 0, 0),
        pushAction('/a/2', 0, 0),
        backAction()
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(4)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(entries[3].pathname).toBe('/a/2')
        expect(index).toBe(2)
      })
    })

    it('reacts to being on the zero page', async () => {
      await run([
        loadAction('/a'),
        backAction(),
        pushAction('/a/1', 0, 0)
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
        loadAction('/a'),
        backAction(),
        switchAction(0, 1)
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