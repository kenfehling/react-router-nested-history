import State from '../../../src/model/State'
import Group from '../../../src/model/Group'
import Page from '../../../src/model/Page'
import HistoryStack from '../../../src/model/HistoryStack'
import * as fixtures from '../fixtures'
import IContainer from '../../../src/model/IContainer'
import {expect} from 'chai'
import Load from '../../../src/model/actions/Load'
import {List} from 'immutable'
import Container from '../../../src/model/Container'
import {
  createContainers1, createContainers2, createContainers3,
  createCreateContainers, createGroup1,
  createGroup2,
  createGroup3, createSubGroup1,
  createSubGroup2, createSubGroup3
} from '../fixtures'
import Action from '../../../src/model/BaseAction'
import VisitedPage from '../../../src/model/VistedPage'
import SetZeroPage from '../../../src/model/actions/SetZeroPage'
import {deriveState} from '../../../src/store/store'
declare const describe:any
declare const it:any

describe('State', () => {
  const zero:VisitedPage = State.createZeroPage('/zero')
  const baseActions:Action[] = [
    new SetZeroPage({
      url: zero.url,
      time: 1000
    })
  ]

  const originalSimpleActionsWithoutLoad:Action[] = [
    ...baseActions,
    createGroup1,
    ...createContainers1,
    createGroup2,
    ...createContainers2,
    createGroup3,
    ...createContainers3
  ]

  const originalSimpleActions:Action[] = [
    ...originalSimpleActionsWithoutLoad,
    new Load({
      url: '/a',
      time: 1250
    })
  ]

  const originalNestedActions:Action[] = [
    ...baseActions,
    createGroup1,
    createSubGroup1,
    createSubGroup2,
    createSubGroup3,
    ...createCreateContainers({
      time: 1000,
      group: createSubGroup1.name,
      initialUrls: ['/a', '/b', '/c'],
      useDefault: true,
      name_suffix: 'A'
    }),
    ...createCreateContainers({
      time: 1000,
      group: createSubGroup2.name,
      initialUrls: ['/e', '/f'],
      name_suffix: 'B'
    }),
    ...createCreateContainers({
      time: 1000,
      group: createSubGroup3.name,
      initialUrls: ['/g', '/h'],
      useDefault: true,
      name_suffix: 'C'
    }),
    new Load({
      url: '/a',
      time: 1250
    })
  ]

  describe('simple group', () => {
    const state:State = deriveState(originalSimpleActions, new State())

    describe('replaceContainer', () => {
      it('creates a new group if needed', () => {
        const newState:State = state.replaceContainer(new Group({
          name: 'Group X'
        }))
        expect(newState.groups.size).to.equal(state.groups.size + 1)
      })

      it('replaces an existing group', () => {
        const group:Group = state.groups.toArray()[0]
        const newState:State = state.push({
          page: new Page({
            url: '/a/1',
            params: {id: '1'},
            group: 'Group 1',
            container: 'Container 1A'
          }),
          time: 5000
        })
        expect(newState.groups.size).to.equal(state.groups.size)
        expect(newState.groups.toArray()[0].name).to.equal(group.name)
        expect(newState.activeUrl).to.equal('/a/1')
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          group: 'Group 2',
          container: 'Container 2B'
        })
        const s:State = state.push({page, time: 4000})
        expect(s.activeGroupName).to.equal('Group 2')
        expect(s.getGroupActiveContainerName('Group 2')).to.equal('Container 2B')
        expect(s.activeContainerName).to.equal('Container 2B')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          group: 'Group 1',
          container: 'Container 1A'
        })
        const h:HistoryStack = state.push({page, time: 5000}).history
        expect(h.back.length).to.equal(2)
        expect(h.current.url).to.equal('/d')
        expect(h.forward.length).to.equal(0)
      })

      it('works after pushing multiple pages', () => {
        const push = (s:State, url:string, time:number) => s.push({
          page: new Page({
            url,
            params: {},
            group: 'Group 1',
            container: 'Container 1A'
          }),
          time
        })
        const s = push(push(push(state, '/d', 5000), '/d/1', 6000), '/d/1/1', 7000)
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(4)
        expect(h.back[0].url).to.equal('/zero')
        expect(h.back[1].url).to.equal('/a')
        expect(h.back[2].url).to.equal('/d')
        expect(h.back[3].url).to.equal('/d/1')
        expect(h.current.url).to.equal('/d/1/1')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('go', () => {
      it('goes back 1 to zero page', () => {
        const newState:State = state.go({n: -1, time: 1000})
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
          group: 'Group 1',
          container: 'Container 1A'
        })
        const newState:State = state.push({page: forward, time: 5000})
        const amount:number = newState.getShiftAmount(current)
        expect(amount).to.equal(-1)
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: State, name: string) => s.isContainerAtTopPage(name)

      it('is at first', () => {
        expect(f(state, 'Container 1A')).to.be.true
      })

      describe('after push', () => {
        const pushedState: State = state.push({
          page: new Page({
            url: '/a/2',
            params: {id: '2'},
            group: 'Group 1',
            container: 'Container 1A'
          }),
          time: 4444
        })

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1A')).to.be.false
        })

        describe('after switch', () => {
          const switchedState: State = pushedState.switchToContainer({
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
        const order:List<Group> = state.groupStackOrder
        const item1:Group = order.first()
        const c = state.getGroupActiveContainer(item1.name) as Container
        expect(c.initialUrl).to.equal('/a')
        expect(state.getLastContainerVisit(item1.name).time).to.equal(1250)
      })

      it('gets correct order after a non-default load', () => {
        const state = deriveState(originalSimpleActionsWithoutLoad, new State())
        const s = new Load({url: '/e', time: 1250}).reduce(state)
        const order:List<Group> = s.groupStackOrder
        const item1:Group = order.first()
        const c = s.getGroupActiveContainer(item1.name) as Container
        expect(c.initialUrl).to.equal('/e')
        expect(s.getLastContainerVisit(item1.name).time).to.equal(1250)
      })
    })
  })

  describe('nested group', () => {
    const state:State = deriveState(originalNestedActions, new State())
    const group:Group = state.groups.get('Group 1')
    const nestedGroup1:Group = state.groups.get('SubGroup 1') as Group

    describe('replaceGroup', () => {
      it('creates a new group if needed', () => {
        const newState:State = state.replaceContainer(new Group({
          name: 'Group X'
        }))
        expect(newState.groups.size).to.equal(state.groups.size + 1)
      })

      it('replaces an existing group', () => {
        const container = state.containers.get('Container 1A')
        const newState:State = state.push({
          page: new Page({
            url: '/a/1',
            params: {id: '1'},
            group: nestedGroup1.name,
            container: container.name
          }),
          time: 4444
        })
        expect(newState.groups.size).to.equal(state.groups.size)
        expect(newState.activeUrl).to.equal('/a/1')
      })

      it('does a switch', () => {
        const subGroup:Group = state.groups.get('SubGroup 3') as Group
        const newState:State = state.switchToGroup({
          name: subGroup.name,
          time: 4444
        })
        expect(newState.activeUrl).to.equal('/g')
        expect(newState.getLastContainerVisit(group.name).time).to.equal(4444)
      })
    })

    describe('push', () => {
      it('switches group when pushing in non-active group', () => {
        const page:Page = new Page({
          url: '/f/1',
          params: {id: '1'},
          group: 'SubGroup 2',
          container: 'Container 2B'
        })
        const newState:State = state.push({page, time: 5000})
        expect(newState.getGroupActiveContainerName('Group 1')).to.equal('SubGroup 2')
        expect(newState.getGroupActiveContainerName('SubGroup 2')).to.equal('Container 2B')
        expect(newState.getGroupActiveLeafContainerName('Group 1')).to.equal('Container 2B')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          group: 'Group 1',
          container: 'Container 1A'
        })
        const h:HistoryStack = state.push({page, time: 5000}).history
        expect(h.back.length).to.equal(2)
        expect(h.current.url).to.equal('/d')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('go', () => {
      it('goes back 1 to zero page', () => {
        const newState:State = state.go({n: -1, time: 5000})
        const h:HistoryStack = newState.history
        expect(h.back.length).to.equal(0)
        expect(h.current).to.deep.equal(newState.getZeroPage())
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a')
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: State, name: string) => s.isContainerAtTopPage(name)

      it('is at first', () => {
        expect(f(state, 'Container 1A')).to.be.true
      })

      describe('after push', () => {
        const pushedState: State = state.push({
          page: new Page({
            url: '/a/2',
            params: {id: '2'},
            group: 'Group 1',
            container: 'Container 1A'
          }),
          time: 5000
        })

        it('is not after a push', () => {
          expect(f(pushedState, 'Container 1A')).to.be.false
        })

        describe('after switch', () => {
          const switchedState: State = pushedState.switchToContainer({
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
    const s1:State = deriveState(originalNestedActions, new State())
    const group = s1.getGroupContainers('Group 1').get(2) as Group
    const state:State = s1.switchToGroup({
      name: group.name,
      time: 1500
    })

    it('has allow inter-container history turned on', () => {
      expect(group.allowInterContainerHistory).to.be.true
    })

    describe('after switching from default', () => {
      const switchedState:State = state.switchToContainer({
        name: 'Container 2C',
        time: 1700,
      })

      it('keeps default tab in back history', () => {
        const groupHistory:HistoryStack = switchedState.getGroupHistory(group.name)
        expect(groupHistory.back.length).to.equal(1)
        expect(groupHistory.back[0].url).to.equal('/g')
        expect(groupHistory.current.url).to.equal('/h')
        expect(groupHistory.forward.length).to.equal(0)
      })

      it('Removes forward history after going back to default', () => {
        const page:Page = new Page({
          url: '/h/1',
          params: {id: '1'},
          group: 'SubGroup 3',
          container: 'Container 2C'
        })
        const newState:State = switchedState
          .push({page, time: 2000})
          .back({n: 1, time: 3000})
          .back({n: 1, time: 4000})
        const groupHistory = newState.getGroupHistory(group.name)
        expect(groupHistory.back.length).to.equal(0)
        expect(groupHistory.current.url).to.equal('/g')
        expect(groupHistory.forward.length).to.equal(0)
      })
    })
  })
})