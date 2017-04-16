import Action from '../../src/model/Action'
import {_history, _resetHistory} from '../../src/util/browserFunctions'
import {
  createContainers1, createContainers3, createGroup1,
  createGroup3, createGroup2, createContainers2,
  originalSimpleActionsWithoutLoad, baseActions
} from './fixtures'
import {createStore, Store} from '../../src/store'
import Load from '../../src/model/actions/Load'
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
import ClearActions from '../../src/store/actions/ClearActions'
import {runSteps} from '../../src/util/stepRunner'
import {expect} from 'chai'
import {createSteps} from '../../src/util/reconciler'
import {USER} from '../../src/model/Action'
declare const describe:any
declare const it:any
declare const beforeEach:any
declare const afterEach:any

const makeNewStore = () => createStore({
  loadFromPersist: false
})

describe('main', () => {
  let store:Store
  let dispatch

  beforeEach(() => {
    store = makeNewStore()
    dispatch = store.dispatch.bind(store)
  })

  afterEach(() => {
    store.dispatch(new ClearActions())
  })

  const dispatchAll = (actions: Action[]) =>
      actions.forEach(dispatch)

  describe('function tests', () => {

    it('loads to a non-default page', () => {
      dispatchAll([
        ...originalSimpleActionsWithoutLoad,
        new Load({
          url: '/a/1',
          time: 2000
        })
      ])

      const state:State = store.getRawState()
      const stateHistory = state.history
      const groupHistory =  state.getGroupHistory('Group 1')
      const containerHistory = state.getContainerHistory('Container 1A')

      expect(containerHistory.back.length).to.equal(1);
      expect(containerHistory.back[0].url).to.equal('/a');
      expect(containerHistory.current.url).to.equal('/a/1');
      expect(containerHistory.forward.length).to.equal(0)

      expect(groupHistory.back.length).to.equal(1);
      expect(groupHistory.back[0].url).to.equal('/a');
      expect(groupHistory.current.url).to.equal('/a/1');
      expect(groupHistory.forward.length).to.equal(0)

      expect(stateHistory.back.length).to.equal(2);
      expect(stateHistory.current.url).to.equal('/a/1');
      expect(stateHistory.forward.length).to.equal(0)
    })

    it('switches to container', () => {
      dispatchAll([
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a/1',
          time: 2000
        }),
        new SwitchToContainer({
          name: 'Container 2A',
          time: 3000
        })
      ])

      const state:State = store.getRawState()
      const stateHistory = state.history
      const groupHistory =  state.getGroupHistory('Group 1')
      const containerHistory1 = state.getContainerHistory('Container 1A')
      const containerHistory2 = state.getContainerHistory('Container 2A')

      expect(containerHistory1.back.length).to.equal(1);
      expect(containerHistory1.back[0].url).to.equal('/a');
      expect(containerHistory1.current.url).to.equal('/a/1');
      expect(containerHistory1.forward.length).to.equal(0)

      expect(containerHistory2.back.length).to.equal(0);
      expect(containerHistory2.current.url).to.equal('/b');
      expect(containerHistory2.forward.length).to.equal(0)

      expect(groupHistory.back.length).to.equal(2);
      expect(groupHistory.back[0].url).to.equal('/a');
      expect(groupHistory.back[1].url).to.equal('/a/1');
      expect(groupHistory.current.url).to.equal('/b');
      expect(groupHistory.forward.length).to.equal(0)

      expect(stateHistory.back.length).to.equal(3);
      expect(stateHistory.back[0].url).to.equal('/a');
      expect(stateHistory.back[1].url).to.equal('/a');
      expect(stateHistory.back[2].url).to.equal('/a/1');
      expect(stateHistory.current.url).to.equal('/b');
      expect(stateHistory.forward.length).to.equal(0)
    })

    it('switches to container with resetOnLeave', () => {
      dispatchAll([
        createGroup3,
        ...createContainers3,
        new Load({
          url: '/g',
          time: 2000
        }),
        new Push({
          url: '/g/1',
          container: 'Container 1C',
          time: 3000
        }),
        new Push({
          url: '/g/2',
          container: 'Container 1C',
          time: 4000
        }),
        new SwitchToContainer({
          name: 'Container 2C',
          time: 5000
        })
      ])

      const state:State = store.getRawState()
      const stateHistory = state.history
      const groupHistory =  state.getGroupHistory('Group 3')
      const containerHistory1 = state.getContainerHistory('Container 1C')
      const containerHistory2 = state.getContainerHistory('Container 2C')

      expect(containerHistory1.back.length).to.equal(0);
      expect(containerHistory1.current.url).to.equal('/g');
      expect(containerHistory1.forward.length).to.equal(0)

      expect(containerHistory2.back.length).to.equal(0);
      expect(containerHistory2.current.url).to.equal('/h');
      expect(containerHistory2.forward.length).to.equal(0)

      expect(groupHistory.back.length).to.equal(1);
      expect(groupHistory.back[0].url).to.equal('/g');
      expect(groupHistory.current.url).to.equal('/h');
      expect(groupHistory.forward.length).to.equal(0)

      expect(stateHistory.back.length).to.equal(2);
      expect(stateHistory.current.url).to.equal('/h');
      expect(stateHistory.forward.length).to.equal(0)
    })

    it('pushes in a different group', () => {
      dispatchAll([
        createGroup1,
        createGroup2,
        ...createContainers1,
        ...createContainers2,
        new Load({
          url: '/a',
          time: 2000
        })
      ])
      store.dispatch(new Push({
        container: 'Container 1B',
        url: '/e/1',  // TODO: Is this realistic?
        time: 3000    // TODO: Wouldn't there be a SWITCH first?
      }))

      const state:State = store.getRawState()

      const g00 = state.getContainerHistory('Container 1A')
      expect(g00.back.length).to.equal(0);
      expect(g00.current.url).to.equal('/a');
      expect(g00.forward.length).to.equal(0)

      const g10 = state.getContainerHistory('Container 1B')
      expect(g10.back.length).to.equal(1);
      expect(g10.back[0].url).to.equal('/e');
      expect(g10.current.url).to.equal('/e/1');
      expect(g10.forward.length).to.equal(0)

      const g1 = state.getGroupHistory('Group 2')
      expect(g1.back.length).to.equal(1);
      expect(g1.back[0].url).to.equal('/e');
      expect(g1.current.url).to.equal('/e/1');
      expect(g1.forward.length).to.equal(0)

      const stateHistory = state.history
      expect(stateHistory.back.length).to.equal(2);
      expect(stateHistory.current.url).to.equal('/e/1');
      expect(stateHistory.forward.length).to.equal(0)
    })

    it('handles popstate after container switch', () => {
      dispatchAll([
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a/1',
          time: 2000
        }),
        new SwitchToContainer({
          name: 'Container 2A',
          time: 3000
        }),
        new PopState({
          n: -1,
          time: 4000
        })
      ])

      const state:State = store.getRawState()
      const stateHistory = state.history
      const groupHistory =  state.getGroupHistory('Group 1')
      const containerHistory1 = state.getContainerHistory('Container 1A')
      const containerHistory2 = state.getContainerHistory('Container 2A')

      expect(containerHistory1.back.length).to.equal(1);
      expect(containerHistory1.back[0].url).to.equal('/a');
      expect(containerHistory1.current.url).to.equal('/a/1');
      expect(containerHistory1.forward.length).to.equal(0)

      expect(containerHistory2.back.length).to.equal(0);
      expect(containerHistory2.current.url).to.equal('/b');
      expect(containerHistory2.forward.length).to.equal(0)

      expect(groupHistory.back.length).to.equal(1);
      expect(groupHistory.back[0].url).to.equal('/a');
      expect(groupHistory.current.url).to.equal('/a/1');
      expect(groupHistory.forward.length).to.equal(0)

      expect(stateHistory.back.length).to.equal(2);
      expect(stateHistory.back[0].url).to.equal('/a');
      expect(stateHistory.back[1].url).to.equal('/a');
      expect(stateHistory.current.url).to.equal('/a/1');
      expect(stateHistory.forward.length).to.equal(0)
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
          const oldState:State = store.getState().oldState
          const newActions:Action[] = store.getState().newActions as Action[]
          const steps:Step[] = createSteps(oldState, newActions)
          if (steps.length > 0) {
            return runSteps(steps).then(resolve)
          }
          return resolve()
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
        ...baseActions,
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a',
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(2)
        expect(entries[0].pathname).to.equal('/zero') 
        expect(entries[1].pathname).to.equal('/a')
        expect(index).to.equal(1)
      })
    })

    /*
    it('reloads the initial page', async () => {
      await run([
        ...baseActions,
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a',
          time: 1000
        }),
        new Load({
          url: '/a',
          time: 2000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(2)
        expect(index).to.equal(1)
        expect(entries[0].pathname).to.equal('/zero')
        expect(entries[1].pathname).to.equal('/a')
      })
    })

    it('reloads the initial page (from refresh)', async () => {
      await run([
        ...baseActions,
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a',
          time: 2000
        }),
        new Load({
          url: '/a',
          time: 2000
        }),
      ]).then(({entries}) => {
        expect(entries.length).to.equal(0)
      })
    })
    */

    it('push', async () => {
      await run([
        ...baseActions,
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2100
        }),
        new Push({
          url: '/a/1',
          container: 'Container 1A',
          time: 3000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/zero')
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
        ...baseActions,
        createGroup,
        ...createContainers,
        new Load({
          url: '/a/1',
          time: 2000
        }),
        new SwitchToContainer({
          container: 'Container 2A',
          time: 3000
        }),
        new PopState({
          url: '/a/1',
          container: 'Container 1A',
          time: 4000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/zero')
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/a/1')
        expect(index).to.equal(2)
      })
    })
    */

    it('pushes to different container', async () => {
      await run([
        ...baseActions,
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2100
        }),
        new SwitchToContainer({
          name: 'Container 2A',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3100
        }),
        new Push({
          url: '/b/1',
          container: 'Container 2A',
          time: 4000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(4)
        expect(entries[0].pathname).to.equal('/zero')
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/b')
        expect(entries[3].pathname).to.equal('/b/1')
        expect(index).to.equal(3)
      })
    })

    it('hides first group history when pushing another group', async () => {
      await run([
        ...baseActions,
        createGroup1,
        createGroup2,
        ...createContainers1,
        ...createContainers2,
        new Load({
          url: '/a',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2100
        }),
        new SwitchToContainer({
          name: 'Container 1B',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3100
        }),
        new Push({
          url: '/e/1',
          container: 'Container 1B',
          time: 4000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/zero')
        expect(entries[1].pathname).to.equal('/e')
        expect(entries[2].pathname).to.equal('/e/1')
        expect(index).to.equal(2)
      })
    })

    it('goes back', async () => {
      await run([
        ...baseActions,
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2100
        }),
        new Push({
          url: '/a/1',
          container: 'Container 1A',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3100
        }),
        new Push({
          url: '/a/2',
          container: 'Container 1A',
          time: 4000
        }),
        new UpdateBrowser({
          time: 4100
        }),
        new Back({
          time: 5000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(4)
        expect(entries[0].pathname).to.equal('/zero')
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/a/1')
        expect(entries[3].pathname).to.equal('/a/2')
        expect(index).to.equal(2)
      })
    })

    it('switches to container with resetOnLeave', async () => {
      await run([
        ...baseActions,
        createGroup3,
        ...createContainers3,
        new Load({
          url: '/g',
          time: 2000
        }),
        new UpdateBrowser({
          time: 2100
        }),
        new Push({
          url: '/g/1/cat',
          container: 'Container 1C',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3100
        }),
        new Push({
          url: '/g/2/dog',
          container: 'Container 1C',
          time: 4000
        }),
        new UpdateBrowser({
          time: 4100
        }),
        new Top({
          container: 'Container 1C',
          time: 5000,
          origin: USER
        }),
        new UpdateBrowser({
          time: 5100
        }),
        new SwitchToContainer({
          name: 'Container 2C',
          time: 6000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).to.equal(3)
        expect(entries[0].pathname).to.equal('/zero')
        expect(entries[1].pathname).to.equal('/g')
        expect(entries[2].pathname).to.equal('/h')
        expect(index).to.equal(2)
      })
    })

    /*
    describe('UpdateBrowser action', () => {
      it('prevents running old actions', async() => {
        await run([
          ...baseActions,
          createGroup1,
          ...createContainers1,
          new Load({
            url: '/a',
            time: 2000
          }),
          new UpdateBrowser({
            time: 2100
          }),
          new Push({
            url: '/a/1',
            container: 'Container 1A',
            time: 3000
          }),
          new UpdateBrowser({
            time: 3100
          }),
          new UpdateBrowser({
            time: 3200
          }),
          new UpdateBrowser({
            time: 3300
          }),
          new Push({
            url: '/a/2',
            container: 'Container 1A',
            time: 4000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(1)
          expect(entries[0].pathname).to.equal('/a/2')
          expect(index).to.equal(0)
        })
      })
    })
    */

    describe('while on zero page', () => {
      it('does a double push', async () => {
        await run([
          ...baseActions,
          createGroup1,
          ...createContainers1,
          new Load({
            url: '/a',
            time: 2000
          }),
          new UpdateBrowser({
            time: 2100
          }),
          new PopState({  // User popped back to zero page
            n: -1,
            time: 3000
          }),
          new UpdateBrowser({
            time: 3100
          }),
          new Push({
            url: '/a/1',
            container: 'Container 1A',
            time: 4000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(3)
          expect(entries[0].pathname).to.equal('/zero')
          expect(entries[1].pathname).to.equal('/a')
          expect(entries[2].pathname).to.equal('/a/1')
          expect(index).to.equal(2)
        })
      })

      it('does a push before a switch', async() => {
        await run([
          ...baseActions,
          createGroup1,
          ...createContainers1,
          new Load({
            url: '/a',
            time: 2000
          }),
          new UpdateBrowser({
            time: 2100
          }),
          new PopState({  // User popped back to zero page
            n: -1,
            time: 3000
          }),
          new UpdateBrowser({
            time: 3100
          }),
          new SwitchToContainer({
            name: 'Container 2A',
            time: 4000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(3)
          expect(entries[0].pathname).to.equal('/zero')
          expect(entries[1].pathname).to.equal('/a')
          expect(entries[2].pathname).to.equal('/b')
          expect(index).to.equal(2)
        })
      })
    })
  })
})