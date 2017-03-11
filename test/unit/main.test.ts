import Action from '../../src/model/BaseAction'
import {_history, _resetHistory} from '../../src/util/browserFunctions'
import {
  createContainers1, createContainers3, createGroup1,
  createGroup3, createGroup2, createContainers2
} from './fixtures'
import {createStore, Store} from '../../src/store/store'
import LoadFromUrl from '../../src/model/actions/LoadFromUrl'
import Push from '../../src/model/actions/Push'
import State from '../../src/model/State'
import Step from '../../src/model/Step'
import {MemoryHistory} from 'history'
import * as R from 'ramda'
import SwitchToContainer from '../../src/model/actions/SwitchToContainer'
import Back from '../../src/model/actions/Back'
import Top from '../../src/model/actions/Top'
import PopState from '../../src/model/actions/PopState'
import UpdateBrowser from '../../src/model/actions/UpdateBrowser'
import Startup from '../../src/model/actions/Startup'
import ClearActions from '../../src/store/actions/ClearActions'
import SwitchToGroup from '../../src/model/actions/SwitchToGroup'
import {runSteps} from '../../src/util/stepRunner'
import InitializedState from '../../src/model/InitializedState'
import {expect} from 'chai'
import UninitializedState from '../../src/model/UninitializedState'
import BaseAction from '../../src/model/BaseAction'
import {createStepsSince} from '../../src/util/reconciler'
declare const describe:any
declare const it:any
declare const beforeEach:any
declare const afterEach:any

const makeNewStore = () => createStore<State, BaseAction>({
  persist: false,
  initialState: new UninitializedState()
})

describe('main', () => {
  let store:Store<State, BaseAction>

  beforeEach(() => {
    store = makeNewStore()
  })

  afterEach(() => {
    store.dispatch(new ClearActions())
  })

  const dispatchAll = (actions: Action[]) =>
      actions.forEach(store.dispatch.bind(store))

  describe('function tests', () => {

    it('cleans history when reloading', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a'
        }),
        new Push({
          url: '/a/1',
          groupName: 'Group 1',
          containerName: 'Container 1'
        }),
        new Push({
          url: '/a/2',
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
      ])
      store = makeNewStore()
      expect(store.getState().actions.length).to.equal(0)
    })

    it('loads to a non-default page', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a/1',
          time: 1000
        })
      ])

      const state:State = store.getState().state
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).to.equal(1);
      expect(group.containers[0].history.back[0].url).to.equal('/a');
      expect(group.containers[0].history.current.url).to.equal('/a/1');
      expect(group.containers[0].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(1);
      expect(group.history.back[0].url).to.equal('/a');
      expect(group.history.current.url).to.equal('/a/1');
      expect(group.history.forward.length).to.equal(0)

      expect(state.browserHistory.back.length).to.equal(2);
      expect(state.browserHistory.current.url).to.equal('/a/1');
      expect(state.browserHistory.forward.length).to.equal(0)
    })

    it('switches to container', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a/1',
          time: 1000
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          name: 'Container 2',
          time: 2000
        })
      ])

      const state:State = store.getState().state
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).to.equal(1);
      expect(group.containers[0].history.back[0].url).to.equal('/a');
      expect(group.containers[0].history.current.url).to.equal('/a/1');
      expect(group.containers[0].history.forward.length).to.equal(0)

      expect(group.containers[1].history.back.length).to.equal(0);
      expect(group.containers[1].history.current.url).to.equal('/b');
      expect(group.containers[1].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(2);
      expect(group.history.back[0].url).to.equal('/a');
      expect(group.history.back[1].url).to.equal('/a/1');
      expect(group.history.current.url).to.equal('/b');
      expect(group.history.forward.length).to.equal(0)

      expect(state.browserHistory.back.length).to.equal(3);
      expect(state.browserHistory.back[0].url).to.equal('/a');
      expect(state.browserHistory.back[1].url).to.equal('/a');
      expect(state.browserHistory.back[2].url).to.equal('/a/1');
      expect(state.browserHistory.current.url).to.equal('/b');
      expect(state.browserHistory.forward.length).to.equal(0)
    })

    it('switches to container with resetOnLeave', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup3,
        ...createContainers3,
        new LoadFromUrl({
          url: '/j',
          time: 1000
        }),
        new Push({
          url: '/j/1/cat',
          groupName: 'Group 3',
          containerName: 'Container 1',
          time: 2000
        }),
        new Push({
          url: '/j/2/dog',
          groupName: 'Group 3',
          containerName: 'Container 1',
          time: 3000
        }),
        new SwitchToContainer({
          groupName: 'Group 3',
          name: 'Container 2',
          time: 4000
        })
      ])

      const state:State = store.getState().state
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).to.equal(0);
      expect(group.containers[0].history.current.url).to.equal('/j');
      expect(group.containers[0].history.forward.length).to.equal(0)

      expect(group.containers[1].history.back.length).to.equal(0);
      expect(group.containers[1].history.current.url).to.equal('/k');
      expect(group.containers[1].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(1);
      expect(group.history.back[0].url).to.equal('/j');
      expect(group.history.current.url).to.equal('/k');
      expect(group.history.forward.length).to.equal(0)

      expect(state.browserHistory.back.length).to.equal(2);
      expect(state.browserHistory.current.url).to.equal('/k');
      expect(state.browserHistory.forward.length).to.equal(0)
    })
    
    it('pushes in a different group', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        createGroup2,
        ...createContainers1,
        ...createContainers2,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        })
      ])
      store.dispatch(new Push({
        groupName: 'Group 2',
        containerName: 'Container 1',
        url: '/e/1'
      }))

      const state:State = store.getState().state
      const groups = state.groups

      expect(groups[0].containers[0].history.back.length).to.equal(0);
      expect(groups[0].containers[0].history.current.url).to.equal('/a');
      expect(groups[0].containers[0].history.forward.length).to.equal(0)

      expect(groups[1].containers[0].history.back.length).to.equal(1);
      expect(groups[1].containers[0].history.back[0].url).to.equal('/e');
      expect(groups[1].containers[0].history.current.url).to.equal('/e/1');
      expect(groups[1].containers[0].history.forward.length).to.equal(0)

      expect(groups[1].history.back.length).to.equal(1);
      expect(groups[1].history.back[0].url).to.equal('/e');
      expect(groups[1].history.current.url).to.equal('/e/1');
      expect(groups[1].history.forward.length).to.equal(0)

      expect(state.browserHistory.back.length).to.equal(2);
      expect(state.browserHistory.current.url).to.equal('/e/1');
      expect(state.browserHistory.forward.length).to.equal(0)
    })

    it('handles popstate after container switch', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a/1',
          time: 1000
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          name: 'Container 2',
          time: 2000
        }),
        new PopState({
          n: -1,
          time: 3000
        })
      ])

      const state:State = store.getState().state
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).to.equal(1);
      expect(group.containers[0].history.back[0].url).to.equal('/a');
      expect(group.containers[0].history.current.url).to.equal('/a/1');
      expect(group.containers[0].history.forward.length).to.equal(0)

      expect(group.containers[1].history.back.length).to.equal(0);
      expect(group.containers[1].history.current.url).to.equal('/b');
      expect(group.containers[1].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(1);
      expect(group.history.back[0].url).to.equal('/a');
      expect(group.history.current.url).to.equal('/a/1');
      expect(group.history.forward.length).to.equal(0)

      expect(state.browserHistory.back.length).to.equal(2);
      expect(state.browserHistory.back[0].url).to.equal('/a');
      expect(state.browserHistory.back[1].url).to.equal('/a');
      expect(state.browserHistory.current.url).to.equal('/a/1');
      expect(state.browserHistory.forward.length).to.equal(0)
    })
  })

  /**
   * Using memoryHistory we can examine the history entries
   */
  describe('memoryHistory tests', () => {
    afterEach(() => _resetHistory())

    const run = (actions:Action[]):Promise<MemoryHistory> => {
      const ps:Promise<any> = actions.reduce((p:Promise<any>, action:Action) =>
        new Promise(resolve => {
          store.dispatch(action)
          const state:State = store.getState().state
          const actions:Action[] = store.getState().actions
          if (state instanceof InitializedState) {
            const steps:Step[] = createStepsSince(actions, state.lastUpdate)
            if (steps.length > 0) {
              return runSteps(steps).then(resolve)
            }
          }
          resolve()
        }),
        Promise.resolve()
      )
      return ps.then(() => {
        const h: MemoryHistory = _history as MemoryHistory
        return Promise.resolve(
          h.entries.length === 0 || h.entries[0].state ? h : {
              entries: R.tail(h.entries),  // remove '/' at beginning
              index: h.index - 1
            })
      })
    }

    it('loads the initial page', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a',
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(2)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
        expect(index).to.equal(1)
      })
    })

    /*
    it('reloads the initial page', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new LoadFromUrl({
          url: '/a',
          time: 2000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(2)
        expect(index).to.equal(1)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
      })
    })

    it('reloads the initial page (from refresh)', async () => {
      await run([
        new Startup({
          time: 1000
        }),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a',
          time: 2000
        }),
        new LoadFromUrl({
          url: '/a',
          time: 2000
        }),
        new Startup({
          fromRefresh: true,
          time: 3000,
        }),
      ]).then(({entries}) => {
        expect(entries.length).to.equal(0)
      })
    })
    */

    it('push', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new UpdateBrowser({
          time: 1100
        }),
        new Push({
          url: '/a/1',
          groupName: 'Group 1',
          containerName: 'Container 1',
          time: 2000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/a/1')
        expect(index).to.equal(2)
      })
    })

    // TODO: This is a bad test because PopState here can't capture
    // TODO: the fact that the browser history has already changed
    /*
    it('handles popstate after container switch', async () => {
     await run([
        new Startup({time: 0}),
        createGroup,
        ...createContainers,
        new LoadFromUrl({
          url: '/a/1',
          time: 2
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          containerName: 'Container 2',
          time: 3
        }),
        new PopState({
          url: '/a/1',
          groupName: 'Group 1',
          containerName: 'Container 1',
          time: 4
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/a/1')
        expect(index).to.equal(2)
      })
    })
    */

    it('pushes to different container', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new UpdateBrowser({
          time: 1100
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          name: 'Container 2',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2200
        }),
        new Push({
          url: '/b/1',
          groupName: 'Group 1',
          containerName: 'Container 2',
          time: 3000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(4)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/b')
        expect(entries[3].pathname).to.equal('/b/1')
        expect(index).to.equal(3)
      })
    })

    it('pushes in a different group', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        createGroup2,
        ...createContainers1,
        ...createContainers2,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new UpdateBrowser({
          time: 1100
        }),
        new SwitchToGroup({
          groupName: 'Group 2',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2200
        }),
        new Push({
          url: '/e/1',
          groupName: 'Group 2',
          containerName: 'Container 1',
          time: 3000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/e')
        expect(entries[2].pathname).to.equal('/e/1')
        expect(index).to.equal(2)
      })
    })

    it('goes back', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers1,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new UpdateBrowser({
          time: 1100
        }),
        new Push({
          url: '/a/1',
          groupName: 'Group 1',
          containerName: 'Container 1',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2200
        }),
        new Push({
          url: '/a/2',
          groupName: 'Group 1',
          containerName: 'Container 1',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3300
        }),
        new Back({
          time: 4000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(4)
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/a/1')
        expect(entries[3].pathname).to.equal('/a/2')
        expect(index).to.equal(2)
      })
    })

    it('switches to container with resetOnLeave', async () => {
      await run([
        new Startup({time: 0}),
        createGroup3,
        ...createContainers3,
        new LoadFromUrl({
          url: '/j',
          time: 1000
        }),
        new UpdateBrowser({
          time: 1100
        }),
        new Push({
          url: '/j/1/cat',
          groupName: 'Group 3',
          containerName: 'Container 1',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2200
        }),
        new Push({
          url: '/j/2/dog',
          groupName: 'Group 3',
          containerName: 'Container 1',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3300
        }),
        new Top({
          groupName: 'Group 3',
          containerName: 'Container 1',
          time: 4000
        }),
        new UpdateBrowser({
          time: 4400
        }),
        new SwitchToContainer({
          groupName: 'Group 3',
          name: 'Container 2',
          time: 5000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/j')  // zero page
        expect(entries[1].pathname).to.equal('/j')
        expect(entries[2].pathname).to.equal('/k')
        expect(index).to.equal(2)
      })
    })

    describe('UpdateBrowser action', async () => {
      await it('prevents running old actions', () => {
        run([
          new Startup({time: 0}),
          createGroup1,
          ...createContainers1,
          new LoadFromUrl({
            url: '/a',
            time: 1000
          }),
          new UpdateBrowser({
            time: 1100
          }),
          new Push({
            url: '/a/1',
            groupName: 'Group 1',
            containerName: 'Container 1',
            time: 2000
          }),
          new UpdateBrowser({
            time: 2200
          }),
          new UpdateBrowser({
            time: 3000
          }),
          new UpdateBrowser({
            time: 3300
          }),
          new Push({
            url: '/a/2',
            groupName: 'Group 1',
            containerName: 'Container 1',
            time: 4000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(1)
          expect(entries[0].pathname).to.equal('/a/2')
          expect(index).to.equal(0)
        })
      })
    })

    describe('while on zero page', async () => {
      await it('does a double push', () => {
        run([
          new Startup({time: 0}),
          createGroup1,
          ...createContainers1,
          new LoadFromUrl({
            url: '/a',
            time: 1000
          }),
          new UpdateBrowser({
            time: 1100
          }),
          new PopState({  // User popped back to zero page
            n: -1,
            time: 2000
          }),
          new UpdateBrowser({
            time: 2200
          }),
          new Push({
            url: '/a/1',
            groupName: 'Group 1',
            containerName: 'Container 1',
            time: 3000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(3)
          expect(entries[0].pathname).to.equal('/a')  // zero page
          expect(entries[1].pathname).to.equal('/a')
          expect(entries[2].pathname).to.equal('/a/1')
          expect(index).to.equal(2)
        })
      })

      it('does a push before a switch', async () => {
        await run([
          new Startup({time: 0}),
          createGroup1,
          ...createContainers1,
          new LoadFromUrl({
            url: '/a',
            time: 1000
          }),
          new UpdateBrowser({
            time: 1100
          }),
          new PopState({  // User popped back to zero page
            n: -1,
            time: 2000
          }),
          new UpdateBrowser({
            time: 2200
          }),
          new SwitchToContainer({
            groupName: 'Group 1',
            name: 'Container 2',
            time: 3000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(3)
          expect(entries[0].pathname).to.equal('/a')  // zero page
          expect(entries[1].pathname).to.equal('/a')
          expect(entries[2].pathname).to.equal('/b')
          expect(index).to.equal(2)
        })
      })
    })
  })
})