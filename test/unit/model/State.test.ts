import State from '../../../src/model/State'
import Group from '../../../src/model/Group'
import Page from '../../../src/model/Page'
import {HistoryStack} from '../../../src/model/Pages'
import * as fixtures from '../fixtures'
import IContainer from '../../../src/model/IContainer'
import {expect} from 'chai'
import UninitializedState from '../../../src/model/UninitializedState'
import InitializedState from '../../../src/model/InitializedState'
import LoadFromUrl from '../../../src/model/actions/LoadFromUrl'
declare const describe:any
declare const it:any

describe('State', () => {

  describe('simple group', () => {
    const state:State = fixtures.loadedSimpleState

    describe('replaceGroup', () => {
      it('creates a new group if needed', () => {
        const newState:State = state.replaceGroup(new Group({
          name: 'Group X'
        }))
        expect(newState.groups.size).to.equal(state.groups.size + 1)
      })

      it('replaces an existing group', () => {
        const group:Group = state.groups.toArray()[0]
        const newGroup:Group = group.push(new Page({
          url: '/a/1',
          params: {id: '1'},
          groupName: group.name,
          containerName: group.containers.toArray()[0].name
        }), 5000)
        const newState:State = state.replaceGroup(newGroup)
        expect(newState.groups.size).to.equal(state.groups.size)
        expect(newState.groups.toArray()[0].name).to.equal(group.name)
        expect(newState.groups.toArray()[0].pages.activePage.url).to.equal('/a/1')
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          groupName: 'Group 2',
          containerName: 'Container 2B'
        })

        const s:State = state.push(page, 4000)
        expect(s.activeGroup.name).to.equal('Group 2')
        expect(s.getActiveContainerNameInGroup('Group 2')).to.equal('Container 2B')
        expect(s.activeGroup.activeContainerName).to.equal('Container 2B')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1A'
        })
        const h:HistoryStack = state.push(page, 5000).history
        expect(h.back.length).to.equal(2)
        expect(h.current.url).to.equal('/d')
        expect(h.forward.length).to.equal(0)
      })

      it('works after pushing multiple pages', () => {
        const push = (s:State, url:string, time:number) => s.push(new Page({
          url,
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1A'
        }), time)
        const newState:State = push(push(push(state, '/d', 5000), '/d/1', 6000), '/d/1/1', 7000)
        const h:HistoryStack = newState.history
        expect(h.back.length).to.equal(4)
        expect(h.back[0].url).to.equal('/a')
        expect(h.back[1].url).to.equal('/a')
        expect(h.back[2].url).to.equal('/d')
        expect(h.back[3].url).to.equal('/d/1')
        expect(h.current.url).to.equal('/d/1/1')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('go', () => {
      it('goes back 1 to zero page', () => {
        const newState:State = state.go(-1, 1000)
        const h:HistoryStack = newState.history
        expect(h.back.length).to.equal(0)
        expect(h.current).to.deep.equal(newState.getZeroPage())
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a')
      })
    })

    describe('getShiftAmount', () => {
      it('gets distance to popped page', () => {
        const current:Page = state.activePage
        const forward:Page = new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName: 'Group 1',
          containerName: 'Container 1A'
        })
        const amount:number = state.push(forward, 5000).getShiftAmount(current)
        expect(amount).to.equal(-1)
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: State, name: string) => s.isContainerAtTopPage('Group 1', name)

      it('is at first', () => {
        expect(f(state, 'Container 1A')).to.be.true
      })

      describe('after push', () => {
        const pushedState: State = state.push(new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName: 'Group 1',
          containerName: 'Container 1A'
        }), 4000)

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1A')).to.be.false
        })

        describe('after switch', () => {
          const switchedState: State = pushedState.switchToContainer({
            groupName: 'Group 1',
            name: 'Container 2A',
            time: 6000
          })

          it('is not after switch, but new container is', () => {
            expect(f(switchedState, 'Container 1A')).to.be.false
            expect(f(switchedState, 'Container 2A')).to.be.true
          })
        })
      })
    })

    describe('groupStackOrder', () => {
      it('gets initial order', () => {
        const order:IContainer[] = state.groupStackOrder
        expect(order[0].initialUrl).to.equal('/a')
        expect(order[0].lastVisit.time).to.equal(1250)
      })

      it('gets correct order after a non-default load', () => {
        const unloadedState:UninitializedState = fixtures.simpleState
        const loadedState:InitializedState =
            new LoadFromUrl({url: '/e', time: 1250}).reduce(unloadedState)
        const order:IContainer[] = loadedState.groupStackOrder
        expect(order[0].initialUrl).to.equal('/e')
        expect(order[0].lastVisit.time).to.equal(1250)
      })
    })
  })

  describe('nested group', () => {
    const state:State = fixtures.loadedNestedState
    const group:Group = fixtures.nestedState.groups.toArray()[0]
    const nestedGroup1:Group = group.containers.toArray()[0] as Group

    describe('replaceGroup', () => {
      it('creates a new group if needed', () => {
        const newState:State = state.replaceGroup(new Group({
          name: 'Group X'
        }))
        expect(newState.groups.size).to.equal(state.groups.size + 1)
      })

      it('replaces an existing group', () => {
        const group:Group = state.groups.toArray()[0]
        const container:IContainer = nestedGroup1.containers.toArray()[0]
        const newState:State = state.push(new Page({
          url: '/a/1',
          params: {id: '1'},
          groupName: nestedGroup1.name,
          containerName: container.name
        }), 4444)
        const newGroup:Group = newState.groups.toArray()[0]
        expect(newState.groups.size).to.equal(state.groups.size)
        expect(newGroup.name).to.equal(group.name)
        expect(newGroup.pages.activePage.url).to.equal('/a/1')
        expect(newGroup.lastVisit.time).to.equal(4444)
      })

      it('does a switch', () => {
        const group:Group = state.groups.toArray()[0]
        const newState:State = state.switchToGroup({
          groupName: group.containers.toArray()[2].name,
          time: 4444
        })
        expect(newState.groups.toArray()[0].pages.activePage.url).to.equal('/g')
        expect(newState.groups.toArray()[0].lastVisit.time).to.equal(4444)
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          groupName: 'Group 2',
          containerName: 'Container 2B'
        })
        const newState:State = state.push(page, 5000)
        expect(newState.getActiveContainerNameInGroup('Group 2')).to.equal('Container 2B')
        expect(newState.activeGroup.activeContainerName).to.equal(group.containers.toArray()[1].name)
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1A'
        })
        const h:HistoryStack = state.push(page, 5000).history
        expect(h.back.length).to.equal(2)
        expect(h.current.url).to.equal('/d')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('go', () => {
      it('goes back 1 to zero page', () => {
        const newState:State = state.go(-1, 1000)
        expect(newState.history.back.length).to.equal(0)
        expect(newState.history.current).to.deep.equal(newState.getZeroPage())
        expect(newState.history.forward.length).to.equal(1)
        expect(newState.history.forward[0].url).to.equal('/a')
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: State, name: string) =>
          s.isContainerAtTopPage(nestedGroup1.name, name)

      it('is at first', () => {
        expect(f(state, 'Container 1A')).to.be.true
      })

      describe('after push', () => {
        const pushedState: State = state.push(new Page({
          url: '/a/2',
          params: {id: '2'},
          groupName:nestedGroup1.name,
          containerName: 'Container 1A'
        }), 5000)

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1A')).to.be.false
        })

        describe('after switch', () => {
          const switchedState: State = pushedState.switchToContainer({
            groupName: nestedGroup1.name,
            name: 'Container 2A',
            time: 3000
          })

          it('is not after switch, but new container is', () => {
            expect(f(switchedState, 'Container 1A')).to.be.false
            expect(f(switchedState, 'Container 2A')).to.be.true
          })
        })
      })
    })
  })

  describe('inter-container history (mobile)', () => {
    const getGroup = (s:State) => s.groups.toArray()[0].containers.toArray()[2] as Group

    const group:Group = getGroup(fixtures.nestedState)
    const state:State = fixtures.loadedNestedState.switchToGroup({
      groupName: group.name,
      time: 1500
    })

    it('has allow inter-container history turned on', () => {
      expect(group.allowInterContainerHistory).to.be.true
    })

    describe('after switching from default', () => {
      const switchedState:State = state.switchToContainer({
        groupName: group.name,
        name: 'Container 2C',
        time: 1700,
      })

      it('keeps default tab in back history', () => {
        const groupHistory:HistoryStack = getGroup(switchedState).history
        expect(groupHistory.back.length).to.equal(1)
        expect(groupHistory.back[0].url).to.equal('/g')
        expect(groupHistory.current.url).to.equal('/h')
        expect(groupHistory.forward.length).to.equal(0)
      })

      it('Removes forward history after going back to default', () => {
        const page:Page = new Page({
          url: '/h/1',
          params: {id: '1'},
          groupName: group.name,
          containerName: 'Container 2C'
        })
        const newState:State = switchedState
          .push(page, 2000)
          .back(1, 3000)
          .back(1, 4000)
        const groupHistory = getGroup(newState).history
        expect(groupHistory.back.length).to.equal(0)
        expect(groupHistory.current.url).to.equal('/g')
        expect(groupHistory.forward.length).to.equal(0)
      })
    })
  })
})