import IState from '../../../src/model/IState'
import Group from '../../../src/model/Group'
import Page from '../../../src/model/Page'
import HistoryStack from '../../../src/model/HistoryStack'
import * as fixtures from '../fixtures'
import IContainer from '../../../src/model/interfaces/IContainer'
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
        expect(newState.activeGroupName).toBe('Group 2')
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

    describe('shiftTo', () => {
      it('makes old current the new forward', () => {
        const current:Page = state.activePage
        const forward:Page = new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const newState = state.push(forward).shiftTo(current, 1000)
        expect(newState.browserHistory.current.url).toEqual(current.url)
        expect(newState.browserHistory.forward.length).toBe(1)
        expect(newState.browserHistory.forward[0]).toEqual(forward)
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
        expect(newState.activeGroupName).toBe(group.name)
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
  })
})