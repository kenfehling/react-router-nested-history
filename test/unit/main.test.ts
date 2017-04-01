import Action from '../../src/model/BaseAction'
import {_history, _resetHistory} from '../../src/util/browserFunctions'
import {
  createContainers1, createContainers3, createGroup1,
  createGroup3, createGroup2, createContainers2
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
import PopState from '../../src/model/actions/OnPopState'
import UpdateBrowser from '../../src/model/actions/UpdateBrowser'
import ClearActions from '../../src/store/actions/ClearActions'
import {runSteps} from '../../src/util/stepRunner'
import InitializedState from '../../src/model/InitializedState'
import {expect} from 'chai'
import UninitializedState from '../../src/model/UninitializedState'
import {createSteps} from '../../src/util/reconciler'
import {USER} from '../../src/model/BaseAction'
declare const describe:any
declare const it:any
declare const beforeEach:any
declare const afterEach:any

const makeNewStore = () => createStore({
  loadFromPersist: false
})

describe('main', () => {
  let store:Store

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
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a'
        }),
        new Push({
          url: '/a/1',
          containerName: 'Container 1A'
        }),
        new Push({
          url: '/a/2',
          containerName: 'Container 1A'
        })
      ])
      store = makeNewStore()
      expect(store.getRawState()).to.be.an.instanceof(UninitializedState)
    })

    it('loads to a non-default page', () => {
      dispatchAll([
        createGroup1,
        ...createContainers1,
        new Load({
          url: '/a/1',
          time: 2000
        })
      ])

      const state:State = store.getRawState()
      const group = state.groups.toArray()[0]

      expect(group.containers.toArray()[0].history.back.length).to.equal(1);
      expect(group.containers.toArray()[0].history.back[0].url).to.equal('/a');
      expect(group.containers.toArray()[0].history.current.url).to.equal('/a/1');
      expect(group.containers.toArray()[0].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(1);
      expect(group.history.back[0].url).to.equal('/a');
      expect(group.history.current.url).to.equal('/a/1');
      expect(group.history.forward.length).to.equal(0)

      expect(state.history.back.length).to.equal(2);
      expect(state.history.current.url).to.equal('/a/1');
      expect(state.history.forward.length).to.equal(0)
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
      const group = state.groups.toArray()[0]

      expect(group.containers.toArray()[0].history.back.length).to.equal(1);
      expect(group.containers.toArray()[0].history.back[0].url).to.equal('/a');
      expect(group.containers.toArray()[0].history.current.url).to.equal('/a/1');
      expect(group.containers.toArray()[0].history.forward.length).to.equal(0)

      expect(group.containers.toArray()[1].history.back.length).to.equal(0);
      expect(group.containers.toArray()[1].history.current.url).to.equal('/b');
      expect(group.containers.toArray()[1].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(2);
      expect(group.history.back[0].url).to.equal('/a');
      expect(group.history.back[1].url).to.equal('/a/1');
      expect(group.history.current.url).to.equal('/b');
      expect(group.history.forward.length).to.equal(0)

      expect(state.history.back.length).to.equal(3);
      expect(state.history.back[0].url).to.equal('/a');
      expect(state.history.back[1].url).to.equal('/a');
      expect(state.history.back[2].url).to.equal('/a/1');
      expect(state.history.current.url).to.equal('/b');
      expect(state.history.forward.length).to.equal(0)
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
          containerName: 'Container 1C',
          time: 3000
        }),
        new Push({
          url: '/g/2',
          containerName: 'Container 1C',
          time: 4000
        }),
        new SwitchToContainer({
          name: 'Container 2C',
          time: 5000
        })
      ])

      const state:State = store.getRawState()
      const group = state.groups.toArray()[0]

      expect(group.containers.toArray()[0].history.back.length).to.equal(0);
      expect(group.containers.toArray()[0].history.current.url).to.equal('/g');
      expect(group.containers.toArray()[0].history.forward.length).to.equal(0)

      expect(group.containers.toArray()[1].history.back.length).to.equal(0);
      expect(group.containers.toArray()[1].history.current.url).to.equal('/h');
      expect(group.containers.toArray()[1].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(1);
      expect(group.history.back[0].url).to.equal('/g');
      expect(group.history.current.url).to.equal('/h');
      expect(group.history.forward.length).to.equal(0)

      expect(state.history.back.length).to.equal(2);
      expect(state.history.current.url).to.equal('/h');
      expect(state.history.forward.length).to.equal(0)
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
        containerName: 'Container 1B',
        url: '/e/1',  // TODO: Is this realistic?
        time: 3000    // TODO: Wouldn't there be a SWITCH first?
      }))

      const state:State = store.getRawState()
      const groups = state.groups

      const g00 = groups.toArray()[0].containers.toArray()[0].history
      expect(g00.back.length).to.equal(0);
      expect(g00.current.url).to.equal('/a');
      expect(g00.forward.length).to.equal(0)

      const g10 = groups.toArray()[1].containers.toArray()[0].history
      expect(g10.back.length).to.equal(1);
      expect(g10.back[0].url).to.equal('/e');
      expect(g10.current.url).to.equal('/e/1');
      expect(g10.forward.length).to.equal(0)

      const g1 = groups.toArray()[1].history
      expect(g1.back.length).to.equal(1);
      expect(g1.back[0].url).to.equal('/e');
      expect(g1.current.url).to.equal('/e/1');
      expect(g1.forward.length).to.equal(0)

      expect(state.history.back.length).to.equal(2);
      expect(state.history.current.url).to.equal('/e/1');
      expect(state.history.forward.length).to.equal(0)
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
      const group = state.groups.toArray()[0]

      expect(group.containers.toArray()[0].history.back.length).to.equal(1);
      expect(group.containers.toArray()[0].history.back[0].url).to.equal('/a');
      expect(group.containers.toArray()[0].history.current.url).to.equal('/a/1');
      expect(group.containers.toArray()[0].history.forward.length).to.equal(0)

      expect(group.containers.toArray()[1].history.back.length).to.equal(0);
      expect(group.containers.toArray()[1].history.current.url).to.equal('/b');
      expect(group.containers.toArray()[1].history.forward.length).to.equal(0)

      expect(group.history.back.length).to.equal(1);
      expect(group.history.back[0].url).to.equal('/a');
      expect(group.history.current.url).to.equal('/a/1');
      expect(group.history.forward.length).to.equal(0)

      expect(state.history.back.length).to.equal(2);
      expect(state.history.back[0].url).to.equal('/a');
      expect(state.history.back[1].url).to.equal('/a');
      expect(state.history.current.url).to.equal('/a/1');
      expect(state.history.forward.length).to.equal(0)
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
        createGroup1,
        ...createContainers1,
        new Load({
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
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
      })
    })

    it('reloads the initial page (from refresh)', async () => {
      await run([
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
          containerName: 'Container 1A',
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

    // TODO: This is a bad test because PopState here can't capture
    // TODO: the fact that the browser history has already changed
    /*
    it('handles popstate after container switch', async () => {
     await run([
        createGroup,
        ...createContainers,
        new Load({
          url: '/a/1',
          time: 2000
        }),
        new SwitchToContainer({
          containerName: 'Container 2A',
          time: 3000
        }),
        new PopState({
          url: '/a/1',
          containerName: 'Container 1A',
          time: 4000
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
          containerName: 'Container 2A',
          time: 4000
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

    it('hides first group history when pushing another group', async () => {
      await run([
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
          containerName: 'Container 1B',
          time: 4000
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
          containerName: 'Container 1A',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3100
        }),
        new Push({
          url: '/a/2',
          containerName: 'Container 1A',
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
        expect(entries[0].pathname).to.equal('/a')  // zero page
        expect(entries[1].pathname).to.equal('/a')
        expect(entries[2].pathname).to.equal('/a/1')
        expect(entries[3].pathname).to.equal('/a/2')
        expect(index).to.equal(2)
      })
    })

    it('switches to container with resetOnLeave', async () => {
      await run([
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
          containerName: 'Container 1C',
          time: 3000
        }),
        new UpdateBrowser({
          time: 3100
        }),
        new Push({
          url: '/g/2/dog',
          containerName: 'Container 1C',
          time: 4000
        }),
        new UpdateBrowser({
          time: 4100
        }),
        new Top({
          containerName: 'Container 1C',
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
        expect(entries[0].pathname).to.equal('/g')  // zero page
        expect(entries[1].pathname).to.equal('/g')
        expect(entries[2].pathname).to.equal('/h')
        expect(index).to.equal(2)
      })
    })

    /*
    describe('UpdateBrowser action', () => {
      it('prevents running old actions', async() => {
        await run([
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
            containerName: 'Container 1A',
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
            containerName: 'Container 1A',
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
            containerName: 'Container 1A',
            time: 4000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).to.equal(3)
          expect(entries[0].pathname).to.equal('/a')  // zero page
          expect(entries[1].pathname).to.equal('/a')
          expect(entries[2].pathname).to.equal('/a/1')
          expect(index).to.equal(2)
        })
      })

      it('does a push before a switch', async() => {
        await run([
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
          expect(entries[0].pathname).to.equal('/a')  // zero page
          expect(entries[1].pathname).to.equal('/a')
          expect(entries[2].pathname).to.equal('/b')
          expect(index).to.equal(2)
        })
      })
    })
  })
})