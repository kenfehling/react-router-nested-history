// @flow
/* globals describe, it, expect, beforeEach, afterEach, Promise */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
declare var afterEach:any
import { runSteps, getBackPage, switchToContainer, getInitializedState,
  getActions
} from '../src/main'
import * as actionUtil from '../src/util/actions'
import { push, back, forward, go, _history, _resetHistory } from '../src/browserFunctions'
import { createContainers, zeroPage, createContainers3} from "./fixtures"
import type { Step, Page, Action } from "../src/types"
import { InitializedState } from '../src/types'
import * as _ from "lodash"
import { loadAction, switchAction, pushAction, backAction, topAction } from "./helpers";
import store from '../src/store'
import {_clearActions} from "../src/actions/HistoryActions";

describe('main', () => {

  afterEach(() => store.dispatch(_clearActions()))

  describe('function tests', () => {
    const performAll = (actions: Action[]) => actions.forEach(store.dispatch)

    it('cleans history when reloading', () => {
      performAll([
        ...createContainers,
        loadAction('/a'),
        pushAction('/a/1'),
        pushAction('/a/2'),
        loadAction('/a')
      ])
      expect(getActions().length).toBe(4)
    })

    it('still has initialized state after clean', () => {
      performAll([
        ...createContainers,
        loadAction('/a'),
        pushAction('/a/1'),
        pushAction('/a/2'),
        loadAction('/a')
      ])

    })

    it('switches to container with keepHistory=false', async () => {
      performAll([
        ...createContainers3,
        loadAction('/j'),
        pushAction('/j/1/cat', {id: 1, name: 'cat'}, 0, 0),
        pushAction('/j/2/dog', {id: 2, name: 'dog'}, 0, 0)
      ])

      await switchToContainer(0, 1).then(() => {
        const state:InitializedState = getInitializedState()
        expect(state.groups[0].containers[0].history.back.length).toBe(0);
        expect(state.groups[0].containers[0].history.current.url).toBe('/j');
        expect(state.groups[0].containers[0].history.current.id).toBe(1);
        expect(state.groups[0].containers[0].history.forward.length).toBe(0)

        expect(state.groups[0].history.back.length).toBe(1);
        expect(state.groups[0].history.back[0].url).toBe('/j');
        expect(state.groups[0].history.current.url).toBe('/k');
        expect(state.groups[0].history.current.id).toBe(2);
        expect(state.groups[0].history.forward.length).toBe(0)

        expect(state.browserHistory.back.length).toBe(2);
        expect(state.browserHistory.current.url).toBe('/k');
        expect(state.browserHistory.current.id).toBe(2);
        expect(state.browserHistory.forward.length).toBe(0)
      })
    })
  })

  /**
   * Using memoryHistory we can examine the history entries
   */
  describe('memoryHistory tests', () => {

    afterEach(_resetHistory)

    const run = (actions:Action[], lastUpdate:number=-1) : Promise => {
      return runSteps(actionUtil.createStepsSinceUpdate(
          actions,
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
        ...createContainers,
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
        ...createContainers,
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
        ...createContainers,
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
        ...createContainers,
        loadAction('/a'),
        loadAction('/a', 2, true)
      ], 1).then(({entries}) => {
        expect(entries.length).toBe(0)
      })
    })

    it('push', async () => {
      await run([
        ...createContainers,
        loadAction('/a'),
        pushAction('/a/1', {id: 1}, 0, 0)
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
        ...createContainers,
        loadAction('/a'),
        pushAction('/b/1', {id: 1}, 0, 1)
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
        ...createContainers,
        loadAction('/a'),
        pushAction('/a/1', {id: 1}, 0, 0),
        pushAction('/a/2', {id: 2}, 0, 0),
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

    it('switches to container with keepHistory=false', async () => {
      await run([
        ...createContainers3,
        loadAction('/j'),
        pushAction('/j/1/cat', {id: 1, name: 'cat'}, 0, 0),
        pushAction('/j/2/dog', {id: 2, name: 'dog'}, 0, 0),
        topAction(0, 0),
        switchAction(0, 1)
      ]).then(({entries, index}) => {

        //console.log(entries)

        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe(zeroPage)
        expect(entries[1].pathname).toBe('/j')
        expect(entries[2].pathname).toBe('/k')
        expect(index).toBe(2)
      })
    })

    it('reacts to being on the zero page', async () => {
      await run([
        ...createContainers,
        loadAction('/a'),
        backAction(),
        pushAction('/a/1', {id: 1}, 0, 0)
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
        ...createContainers,
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