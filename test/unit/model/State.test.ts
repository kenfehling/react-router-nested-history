import IState from '../../../src/model/IState'
import Group from '../../../src/model/Group'
import Page from '../../../src/model/Page'
import HistoryStack from '../../../src/model/HistoryStack'
import * as fixtures from '../fixtures'
import IContainer from '../../../src/model/interfaces/IContainer'
import InitializedState from '../../../src/model/InitializedState'
import {push} from '../../../src/util/browserFunctions'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('IState', () => {

  describe('simple group', () => {
    const state:IState = fixtures.loadedSimpleState

    describe('replaceGroup', () => {
      it('creates a new group if needed', () => {
        const newState:IState = state.replaceGroup(new Group({
          name: 'Group X'
        }))
        expect(newState.groups.length).toEqual(state.groups.length + 1)
      })

      it('replaces an existing group', () => {
        const group:Group = state.groups[0]
        const newGroup:Group = group.push(new Page({
          url: '/a/1',
          params: {id: '1'},
          groupName: group.name,
          containerName: group.containers[0].name
        }))
        const newState:IState = state.replaceGroup(newGroup)
        expect(newState.groups.length).toEqual(state.groups.length)
        expect(newState.groups[0].name).toBe(group.name)
        expect(newState.groups[0].history.activePage.url).toBe('/a/1')
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          groupName: 'Group 2',
          containerName: 'Container 2',
          lastVisited: 2000
        })
        const newState:IState = state.push(page)
        expect(newState.getActiveContainerNameInGroup('Group 2')).toBe('Container 2')
        expect(newState.activeGroup.activeContainerName).toBe('Container 2')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const h:HistoryStack = state.push(page).browserHistory
        expect(h.back.length).toBe(2)
        expect(h.current.url).toBe('/d')
        expect(h.forward.length).toBe(0)
      })

      it('works after pushing multiple pages', () => {
        const push = (s:IState, url:string) => s.push(new Page({
          url,
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1'
        }))
        const newState:IState = push(push(push(state, '/d'), '/d/1'), '/d/1/1')
        const h:HistoryStack = newState.browserHistory
        expect(h.back.length).toBe(4)
        expect(h.back[0].url).toBe('/a')
        expect(h.back[1].url).toBe('/a')
        expect(h.back[2].url).toBe('/d')
        expect(h.back[3].url).toBe('/d/1')
        expect(h.current.url).toBe('/d/1/1')
        expect(h.forward.length).toBe(0)
      })
    })

    describe('go', () => {
      it('goes back 1 to zero page', () => {
        const newState:IState = state.go(-1, 1000)
        expect(newState.browserHistory.back.length).toBe(0)
        expect(newState.browserHistory.current).toEqual(newState.getZeroPage())
        expect(newState.browserHistory.forward.length).toBe(1)
        expect(newState.browserHistory.forward[0].url).toBe('/a')
      })
    })

    describe('getShiftAmount', () => {
      it('gets distance to popped page', () => {
        const current:Page = state.activePage
        const forward:Page = new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const amount:number = state.push(forward).getShiftAmount(current)
        expect(amount).toEqual(-1)
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: IState, name: string) => s.isContainerAtTopPage('Group 1', name)

      it('is at first', () => {
        expect(f(state, 'Container 1')).toBeTruthy()
      })

      describe('after push', () => {
        const pushedState: IState = state.push(new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName: 'Group 1',
          containerName: 'Container 1'
        }))

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1')).toBeFalsy()
        })

        describe('after switch', () => {
          const switchedState: IState = pushedState.switchToContainer({
            groupName: 'Group 1',
            name: 'Container 2',
            time: 3000
          })

          it('is not after switch, but new container is', () => {
            expect(f(switchedState, 'Container 1')).toBeFalsy()
            expect(f(switchedState, 'Container 2')).toBeTruthy()
          })
        })
      })
    })
  })

  describe('nested group', () => {
    const state:IState = fixtures.loadedNestedState
    const group = fixtures.nestedState.groups[0]
    const nestedGroup1:Group = group.containers[0] as Group
    const nestedGroup2:Group = group.containers[1] as Group

    describe('replaceGroup', () => {
      it('creates a new group if needed', () => {
        const newState:IState = state.replaceGroup(new Group({
          name: 'Group X'
        }))
        expect(newState.groups.length).toEqual(state.groups.length + 1)
      })

      it('replaces an existing group', () => {
        const group:Group = state.groups[0]
        const container:IContainer = nestedGroup1.containers[0]
        const newState:IState = state.push(new Page({
          url: '/a/1',
          params: {id: '1'},
          groupName: nestedGroup1.name,
          containerName: container.name
        }))
        expect(newState.groups.length).toEqual(state.groups.length)
        expect(newState.groups[0].name).toBe(group.name)
        expect(newState.groups[0].history.activePage.url).toBe('/a/1')
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          groupName: 'Group 2',
          containerName: 'Container 2',
          lastVisited: 2000
        })
        const newState:IState = state.push(page)
        expect(newState.getActiveContainerNameInGroup('Group 2')).toBe('Container 2')
        expect(newState.activeGroup.activeContainerName).toBe(group.containers[1].name)
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const h:HistoryStack = state.push(page).browserHistory
        expect(h.back.length).toBe(2)
        expect(h.current.url).toBe('/d')
        expect(h.forward.length).toBe(0)
      })
    })

    describe('go', () => {
      it('goes back 1 to zero page', () => {
        const newState:IState = state.go(-1, 1000)
        expect(newState.browserHistory.back.length).toBe(0)
        expect(newState.browserHistory.current).toEqual(newState.getZeroPage())
        expect(newState.browserHistory.forward.length).toBe(1)
        expect(newState.browserHistory.forward[0].url).toBe('/a')
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: IState, name: string) =>
          s.isContainerAtTopPage(nestedGroup1.name, name)

      it('is at first', () => {
        expect(f(state, 'Container 1')).toBeTruthy()
      })

      describe('after push', () => {
        const pushedState: IState = state.push(new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName:nestedGroup1.name,
          containerName: 'Container 1'
        }))

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1')).toBeFalsy()
        })

        describe('after switch', () => {
          const switchedState: IState = pushedState.switchToContainer({
            groupName: nestedGroup1.name,
            name: 'Container 2',
            time: 3000
          })

          it('is not after switch, but new container is', () => {
            expect(f(switchedState, 'Container 1')).toBeFalsy()
            expect(f(switchedState, 'Container 2')).toBeTruthy()
          })
        })
      })
    })
  })
})