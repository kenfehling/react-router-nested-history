import Action from '../../src/model/Action'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach:any
declare const afterEach:any
import {runSteps} from '../../src/main'
import {push, back, _history, _resetHistory} from '../../src/browserFunctions'
import {
  createContainers, createContainers3, createGroup1,
  createGroup3
} from './fixtures'
import store from '../../src/store'
import LoadFromUrl from '../../src/model/actions/LoadFromUrl'
import Push from '../../src/model/actions/Push'
import Page from '../../src/model/Page'
import IState from '../../src/model/IState'
import Step from '../../src/model/interfaces/Step'
import {MemoryHistory} from 'history'
import * as R from 'ramda'
import SwitchToContainer from '../../src/model/actions/SwitchToContainer'
import Back from '../../src/model/actions/Back'
import Top from '../../src/model/actions/Top'
import PopState from '../../src/model/actions/PopState'
import UpdateBrowser from '../../src/model/actions/UpdateBrowser'
import {createStepsSince} from '../../src/util/actions'
import Startup from '../../src/model/actions/Startup'
import ClearActions from '../../src/model/actions/ClearActions'

describe('main', () => {
  afterEach(() => store.dispatch(new ClearActions()))

  const dispatchAll = (actions: Action[]) =>
      actions.forEach(store.dispatch.bind(store))

  describe('function tests', () => {

    it('cleans history when reloading', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a'
        }),
        new Push({
          page: new Page({
            url: '/a/1',
            params: {index: '1'},
            groupName: 'Group 1',
            containerName: 'Container 1'
          })
        }),
        new Push({
          page: new Page({
            url: '/a/2',
            params: {index: '1'},
            groupName: 'Group 1',
            containerName: 'Container 1'
          })
        }),
        new Startup()
      ])
      expect(store.getActions().length).toBe(1)
    })

    it('loads to a non-default page', () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a/1',
          time: 1
        })
      ])

      const state:IState = store.getState()
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).toBe(1);
      expect(group.containers[0].history.back[0].url).toBe('/a');
      expect(group.containers[0].history.current.url).toBe('/a/1');
      expect(group.containers[0].history.forward.length).toBe(0)

      expect(group.history.back.length).toBe(1);
      expect(group.history.back[0].url).toBe('/a');
      expect(group.history.current.url).toBe('/a/1');
      expect(group.history.forward.length).toBe(0)

      expect(state.browserHistory.back.length).toBe(2);
      expect(state.browserHistory.current.url).toBe('/a/1');
      expect(state.browserHistory.forward.length).toBe(0)
    })

    it('switches to container', async () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a/1',
          time: 1000
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          containerName: 'Container 2',
          time: 2000
        })
      ])

      const state:IState = store.getState()
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).toBe(1);
      expect(group.containers[0].history.back[0].url).toBe('/a');
      expect(group.containers[0].history.current.url).toBe('/a/1');
      expect(group.containers[0].history.forward.length).toBe(0)

      expect(group.containers[1].history.back.length).toBe(0);
      expect(group.containers[1].history.current.url).toBe('/b');
      expect(group.containers[1].history.forward.length).toBe(0)

      expect(group.history.back.length).toBe(2);
      expect(group.history.back[0].url).toBe('/a');
      expect(group.history.back[1].url).toBe('/a/1');
      expect(group.history.current.url).toBe('/b');
      expect(group.history.forward.length).toBe(0)

      expect(state.browserHistory.back.length).toBe(3);
      expect(state.browserHistory.back[0].url).toBe('/a');
      expect(state.browserHistory.back[1].url).toBe('/a');
      expect(state.browserHistory.back[2].url).toBe('/a/1');
      expect(state.browserHistory.current.url).toBe('/b');
      expect(state.browserHistory.forward.length).toBe(0)
    })

    it('switches to container with resetOnLeave', async () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup3,
        ...createContainers3,
        new LoadFromUrl({
          url: '/j',
          time: 1000
        }),
        new Push({
          page: new Page({
            url: '/j/1/cat',
            params: {id: '1', name: 'cat'},
            groupName: 'Group 3',
            containerName: 'Container 1',
            firstVisited: 2000
          }),
        }),
        new Push({
          page: new Page({
            url: '/j/2/dog',
            params: {id: '2', containerName: 'dog'},
            groupName: 'Group 3',
            containerName: 'Container 1',
            firstVisited: 3000
          })
        }),
        new SwitchToContainer({
          groupName: 'Group 3',
          containerName: 'Container 2',
          time: 4000
        })
      ])

      const state:IState = store.getState()
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).toBe(0);
      expect(group.containers[0].history.current.url).toBe('/j');
      expect(group.containers[0].history.forward.length).toBe(0)

      expect(group.containers[1].history.back.length).toBe(0);
      expect(group.containers[1].history.current.url).toBe('/k');
      expect(group.containers[1].history.forward.length).toBe(0)

      expect(group.history.back.length).toBe(1);
      expect(group.history.back[0].url).toBe('/j');
      expect(group.history.current.url).toBe('/k');
      expect(group.history.forward.length).toBe(0)

      expect(state.browserHistory.back.length).toBe(2);
      expect(state.browserHistory.current.url).toBe('/k');
      expect(state.browserHistory.forward.length).toBe(0)
    })

    it('handles popstate after container switch', async () => {
      dispatchAll([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a/1',
          time: 1000
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          containerName: 'Container 2',
          time: 2000
        }),
        new PopState({
          page: new Page({
            url: '/a/1',
            params: {id: '1'},
            groupName: 'Group 1',
            containerName: 'Container 1',
            firstVisited: 1000
          }),
          time: 3000
        })
      ])

      const state:IState = store.getState()
      const group = state.groups[0]

      expect(group.containers[0].history.back.length).toBe(1);
      expect(group.containers[0].history.back[0].url).toBe('/a');
      expect(group.containers[0].history.current.url).toBe('/a/1');
      expect(group.containers[0].history.forward.length).toBe(0)

      expect(group.containers[1].history.back.length).toBe(0);
      expect(group.containers[1].history.current.url).toBe('/b');
      expect(group.containers[1].history.forward.length).toBe(0)

      expect(group.history.back.length).toBe(1);
      expect(group.history.back[0].url).toBe('/a');
      expect(group.history.current.url).toBe('/a/1');
      expect(group.history.forward.length).toBe(0)

      expect(state.browserHistory.back.length).toBe(2);
      expect(state.browserHistory.back[0].url).toBe('/a');
      expect(state.browserHistory.back[1].url).toBe('/a');
      expect(state.browserHistory.current.url).toBe('/a/1');
      expect(state.browserHistory.forward.length).toBe(0)
    })
  })

  /**
   * Using memoryHistory we can examine the history entries
   */
  describe('memoryHistory tests', () => {
    afterEach(() => _resetHistory())

    const run = (actions:Action[]):Promise<MemoryHistory> => {
      dispatchAll(actions)
      const steps:Step[] = createStepsSince(actions, store.getLastUpdate())
      return runSteps(steps).then(() => {
        const h: MemoryHistory = _history as MemoryHistory
        return Promise.resolve(
          h.entries.length === 0 || h.entries[0].state ? h : {
            entries: R.tail(h.entries),  // remove '/' at beginning
            index: h.index - 1
          })
        }
      )
    }

    it('loads the initial page', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a',
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(2)
        expect(entries[0].pathname).toBe('/a')  // zero page
        expect(entries[1].pathname).toBe('/a')
        expect(index).toBe(1)
      })
    })

    it('reloads the initial page', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new LoadFromUrl({
          url: '/a',
          time: 2000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(2)
        expect(index).toBe(1)
        expect(entries[0].pathname).toBe('/a')  // zero page
        expect(entries[1].pathname).toBe('/a')
      })
    })

    it('reloads the initial page (from refresh)', async () => {
      await run([
        new Startup({
          time: 1000
        }),
        createGroup1,
        ...createContainers,
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
        expect(entries.length).toBe(0)
      })
    })

    it('push', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new Push({
          page: new Page({
            url: '/a/1',
            params: {id: '1'},
            groupName: 'Group 1',
            containerName: 'Container 1',
            firstVisited: 2000
          })
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe('/a')  // zero page
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(index).toBe(2)
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
          page: new Page({
            url: '/a/1',
            params: {id: '1'},
            groupName: 'Group 1',
            containerName: 'Container 1',
            firstVisited: 2
          }),
          time: 4
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe('/a')  // zero page
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(index).toBe(2)
      })
    })
    */

    it('pushes to different container', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new SwitchToContainer({
          groupName: 'Group 1',
          containerName: 'Container 2',
          time: 2000
        }),
        new Push({
          page: new Page({
            url: '/b/1',
            params: {id: '1'},
            groupName: 'Group 1',
            containerName: 'Container 2',
            firstVisited: 3000
          })
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(4)
        expect(entries[0].pathname).toBe('/a')  // zero page
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/b')
        expect(entries[3].pathname).toBe('/b/1')
        expect(index).toBe(3)
      })
    })

    it('goes back', async () => {
      await run([
        new Startup({time: 0}),
        createGroup1,
        ...createContainers,
        new LoadFromUrl({
          url: '/a',
          time: 1000
        }),
        new Push({
          page: new Page({
            url: '/a/1',
            params: {id: '1'},
            groupName: 'Group 1',
            containerName: 'Container 1',
            firstVisited: 2000
          })
        }),
        new Push({
          page: new Page({
            url: '/a/2',
            params: {id: '2'},
            groupName: 'Group 1',
            containerName: 'Container 1',
            firstVisited: 3000
          })
        }),
        new Back({
          time: 4000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(4)
        expect(entries[0].pathname).toBe('/a')  // zero page
        expect(entries[1].pathname).toBe('/a')
        expect(entries[2].pathname).toBe('/a/1')
        expect(entries[3].pathname).toBe('/a/2')
        expect(index).toBe(2)
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
        new Push({
          page: new Page({
            url: '/j/1/cat',
            params: {id: '1', containerName: 'cat'},
            groupName: 'Group 3',
            containerName: 'Container 1',
            firstVisited: 2000
          })
        }),
        new Push({
          page: new Page({
            url: '/j/2/dog',
            params: {id: '2', containerName: 'dog'},
            groupName: 'Group 3',
            containerName: 'Container 1',
            firstVisited: 3000
          })
        }),
        new Top({
          groupName: 'Group 3',
          time: 4000
        }),
        new SwitchToContainer({
          groupName: 'Group 3',
          containerName: 'Container 2',
          time: 5000
        })
      ]).then(({entries, index}) => {
        expect(entries.length).toBe(3)
        expect(entries[0].pathname).toBe('/j')  // zero page
        expect(entries[1].pathname).toBe('/j')
        expect(entries[2].pathname).toBe('/k')
        expect(index).toBe(2)
      })
    })

    describe('UpdateBrowser action', () => {
      it('prevents running old actions', async () => {
        await run([
          new Startup({time: 0}),
          createGroup1,
          ...createContainers,
          new LoadFromUrl({
            url: '/a',
            time: 1000
          }),
          new Push({
            page: new Page({
              url: '/a/1',
              params: {id: '1'},
              groupName: 'Group 1',
              containerName: 'Container 1',
              firstVisited: 2000
            }),
            time: 2000
          }),
          new UpdateBrowser({
            time: 3000
          }),
          new Push({
            page: new Page({
              url: '/a/2',
              params: {id: '2'},
              groupName: 'Group 1',
              containerName: 'Container 1',
              firstVisited: 4000
            })
          })
        ]).then(({entries, index}) => {
          expect(entries.length).toBe(1)
          expect(entries[0].pathname).toBe('/a/2')
          expect(index).toBe(0)
        })
      })
    })

    describe('while on zero page', () => {
      it('does a double push', async () => {
        await run([
          new Startup({time: 0}),
          createGroup1,
          ...createContainers,
          new LoadFromUrl({
            url: '/a',
            time: 1000
          }),
          new PopState({  // User popped back to zero page
            page: Page.createZeroPage('/a'),
            time: 2000
          }),
          new Push({
            page: new Page({
              url: '/a/1',
              params: {id: '1'},
              groupName: 'Group 1',
              containerName: 'Container 1',
              firstVisited: 3000
            })
          })
        ]).then(({entries, index}) => {
          expect(entries.length).toBe(3)
          expect(entries[0].pathname).toBe('/a')  // zero page
          expect(entries[1].pathname).toBe('/a')
          expect(entries[2].pathname).toBe('/a/1')
          expect(index).toBe(2)
        })
      })

      it('does a push before a switch', async () => {
        await run([
          new Startup({time: 0}),
          createGroup1,
          ...createContainers,
          new LoadFromUrl({
            url: '/a',
            time: 1000
          }),
          new PopState({  // User popped back to zero page
            page: Page.createZeroPage('/a'),
            time: 2000
          }),
          new SwitchToContainer({
            groupName: 'Group 1',
            containerName: 'Container 2',
            time: 3000
          })
        ]).then(({entries, index}) => {
          expect(entries.length).toBe(3)
          expect(entries[0].pathname).toBe('/a')  // zero page
          expect(entries[1].pathname).toBe('/a')
          expect(entries[2].pathname).toBe('/b')
          expect(index).toBe(2)
        })
      })
    })
  })
})