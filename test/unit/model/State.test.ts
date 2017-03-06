import IState from '../../../src/model/IState'
import Group from '../../../src/model/Group'
import Page from '../../../src/model/Page'
import HistoryStack from '../../../src/model/HistoryStack'
import * as fixtures from '../fixtures'
import IContainer from '../../../src/model/interfaces/IContainer'
declare const describe:any
declare const it:any
declare const expect:any

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
        }), 5000)
        const newState:IState = state.replaceGroup(newGroup)
        expect(newState.groups.length).toEqual(state.groups.length)
        expect(newState.groups[0].name).toBe(group.name)
        expect(newState.groups[0].pages.activePage.url).toBe('/a/1')
      })
    })

    describe('push', () => {
      it.only('switches group when pushing in non-active group', () => {
        /*
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          groupName: 'Group 2',
          containerName: 'Container 2'
        })

        const newState:IState = state.push(page, 4000)
        expect(newState.getActiveContainerNameInGroup('Group 2')).toBe('Container 2')
        expect(newState.activeGroup.activeContainerName).toBe('Container 2')
        */
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const h:HistoryStack = state.push(page, 5000).browserHistory
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
        }), 5000)
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
        const amount:number = state.push(forward, 5000).getShiftAmount(current)
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
        }), 4000)

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1')).toBeFalsy()
        })

        describe('after switch', () => {
          const switchedState: IState = pushedState.switchToContainer({
            groupName: 'Group 1',
            name: 'Container 2',
            time: 6000
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
    const group:Group = fixtures.nestedState.groups[0]
    const nestedGroup1:Group = group.containers[0] as Group

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
        }), 4444)
        expect(newState.groups.length).toEqual(state.groups.length)
        expect(newState.groups[0].name).toBe(group.name)
        expect(newState.groups[0].pages.activePage.url).toBe('/a/1')
        expect(newState.groups[0].lastVisited).toBe(4444)
      })

      it('does a switch', () => {
        const group:Group = state.groups[0]
        const newState:IState = state.switchToGroup({
          groupName: group.containers[2].name,
          time: 4444
        })
        expect(newState.groups[0].pages.activePage.url).toBe('/g')
        expect(newState.groups[0].lastVisited).toBe(4444)
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          groupName: 'Group 2',
          containerName: 'Container 2'
        })
        const newState:IState = state.push(page, 5000)
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
        const h:HistoryStack = state.push(page, 5000).browserHistory
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
        }), 5000)

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

  describe('inter-container history (mobile)', () => {
    const getGroup = (s:IState) => s.groups[0].containers[2] as Group

    const group:Group = getGroup(fixtures.nestedState)
    const state:IState = fixtures.loadedNestedState.switchToGroup({
      groupName: group.name,
      time: 1500
    })

    it('has allow inter-container history turned on', () => {
      expect(group.allowInterContainerHistory).toBeTruthy()
    })

    describe('after switching from default', () => {
      const switchedState:IState = state.switchToContainer({
        groupName: group.name,
        name: 'Container 2',
        time: 1700,
      })

      it('keeps default tab in back history', () => {
        const groupHistory:HistoryStack = getGroup(switchedState).history
        expect(groupHistory.back.length).toBe(1)
        expect(groupHistory.back[0].url).toBe('/g')
        expect(groupHistory.current.url).toEqual('/h')
        expect(groupHistory.forward.length).toBe(0)
      })

      it('Removes forward history after going back to default', () => {
        const newState:IState = switchedState
          .push(new Page({
            url: '/h/1',
            params: {id: '1'},
            groupName: group.name,
            containerName: 'Container 1'
          }), 2000)
          .goBack(1, 3000)
          .goBack(1, 4000)
          .goBack(1, 5000)
        const groupHistory = getGroup(newState).history
        expect(groupHistory.back.length).toBe(0)
        expect(groupHistory.current.url).toEqual('/g')
        expect(groupHistory.forward.length).toBe(0)
      })
    })
  })
})