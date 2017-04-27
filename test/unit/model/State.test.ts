import State from '../../../src/model/State'
import Group from '../../../src/model/Group'
import Page from '../../../src/model/Page'
import HistoryStack from '../../../src/model/HistoryStack'
import * as fixtures from '../fixtures'
import {expect} from 'chai'
import Load from '../../../src/model/actions/Load'
import {List} from 'immutable'
import Container from '../../../src/model/Container'
import {
  blankState, blankStateBeforeLoad, nestedState,
  originalSimpleActionsWithoutLoad, zero
} from '../fixtures'
import {deriveState} from '../../../src/store/store'
import VisitedPage from '../../../src/model/VisitedPage'
declare const describe:any
declare const it:any

describe('State', () => {
  describe('simple group', () => {
    const state:State = fixtures.simpleState

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

    describe('activateContainer', () => {
      it('switches to a container', () => {
        const s = state.activateContainer('Container 3A', 2000)
        expect(s.activeContainerName).to.equal('Container 3A')
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(2)
        expect(h.back[1].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })

      it('behaves correctly from zero page', () => {
        const s = state.back({time: 2000}).activateContainer('Container 3A', 3000)
        expect(s.activeContainerName).to.equal('Container 3A')
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(2)
        expect(h.back[1].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('getContainerStackOrder', () => {
      const s = state.activateContainer('Container 3A', 7000)

      it('gets containers in latest active order', () => {
        const newOrder = s.getContainerStackOrder('Group 1')
        const c1 = newOrder.first() as Container
        expect(c1.initialUrl).to.equal('/c')
        expect(s.getLastContainerVisit(c1.name).time).to.equal(7000)
      })
    })

    describe('history', () => {
      it('returns history based on container history 1', () => {
        const h:HistoryStack = state.history
        expect(h.back.length).to.equal(1)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('returns history based on container history 2', () => {
        const s = state.activateContainer('Container 3A', 2000)
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(2)
        expect(h.back[1].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('history with forward history maintained', () => {
      it('does not include containers that never were visited', () => {
        const h:HistoryStack = state.historyWithFwdMaintained
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/zero')
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('includes forward history', () => {
        const s = state
          .switchToContainer({name: 'Container 3A', time: 2000})
          .back({n: 1, time: 3000})
        const h:HistoryStack = s.historyWithFwdMaintained
        expect(h.back.length).to.equal(1)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/c')
      })

      it('does not repeat pages', () => {
        const container1page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          group: 'Group 1',
          container: 'Container 1A'
        })
        const container2page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          group: 'Group 1',
          container: 'Container 2A'
        })
        const s = state
          .push({page: container1page, time: 5000})
          .switchToContainer({name: 'Container 2A', time: 7500})
          .push({page: container2page, time: 10000})
          .back({n: 1, time: 15000})
        const h:HistoryStack = s.historyWithFwdMaintained
        expect(h.back.length).to.equal(3)
        expect(h.back[1].url).to.equal('/a')
        expect(h.back[2].url).to.equal('/a/1')
        expect(h.current.url).to.equal('/b')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/b/1')
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
        expect(h.back[1].url).to.equal('/a')
        expect(h.back[2].url).to.equal('/d')
        expect(h.back[3].url).to.equal('/d/1')
        expect(h.current.url).to.equal('/d/1/1')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('top', () => {
      it('goes to top of current container', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          group: 'Group 1',
          container: 'Container 1A'
        })
        const s = state.push({page, time: 6000}).top({time: 7000})
        const history:HistoryStack = s.history
        expect(history.back.length).to.equal(1)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(1)
        expect(history.forward[0].url).to.equal('/a/1')
      })
    })

    describe('load', () => {
      it('loads initialUrl into history when a page below it is loaded', () => {
        const s = state.load({url: '/b/1', time: 5000})
        const history:HistoryStack = s.history
        expect(history.back.length).to.equal(3)
        expect(history.back[1].url).to.equal('/a')
        expect(history.back[2].url).to.equal('/b')
        expect(history.current.url).to.equal('/b/1')
        expect(history.forward.length).to.equal(0)
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

    describe('go', () => {
      it('switches container when the current one runs out', () => {
        const s = state
          .switchToContainer({name: 'Container 3A', time: 2000})
          .go({n: -1, time: 3000})
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(1)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('goes back 1 to zero page', () => {
        const newState:State = state.go({n: -1, time: 2000})
        const h:HistoryStack = newState.history
        expect(h.back.length).to.equal(0)
        expect(h.current).to.deep.equal(newState.zeroPage)
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a')
      })

      it('records visit to zero page', () => {
        const newState:State = state.go({n: -1, time: 2000})
        const zeroPage:VisitedPage = newState.getPages().first()
        expect(zeroPage.isZeroPage).to.equal(true)
        expect(zeroPage.visits.length).to.equal(2)
        expect(zeroPage.visits[1].time).to.equal(2000)
      })

      describe('push and back', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          group: 'Group 1',
          container: 'Container 1A'
        })
        const s1 = state.push({page, time: 6000}).go({n: -1, time: 7000})

        it('causes the current container to go', () => {
          const h:HistoryStack = s1.history
          expect(h.back.length).to.equal(1)
          expect(h.current.url).to.equal('/a')
          expect(h.forward.length).to.equal(1)
          expect(h.forward[0].url).to.equal('/a/1')
        })

        describe('and switch', () => {
          const s2 = s1.switchToContainer({name: 'Container 2A', time: 8000})

          it('goes back to the page it was on, with forward history', () => {
            const s3 = s2.go({n: -1, time: 9000})
            const h:HistoryStack = s3.history
            expect(h.back.length).to.equal(1)
            expect(h.current.url).to.equal('/a')
            expect(h.forward.length).to.equal(1)
            expect(h.forward[0].url).to.equal('/a/1')
          })
        })
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: State, name: string) => s.isContainerAtTopPage(name)

      it('is at first', () => {
        expect(f(state, 'Container 1A')).to.equal(true)
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
          expect(f(pushedState, 'Container 1A')).to.equal(false)
        })

        describe('after switch', () => {
          const switchedState: State = pushedState.switchToContainer({
            name: 'Container 2A',
            time: 6000
          })

          it('is not after switch, but new container is', () => {
            expect(f(switchedState, 'Container 1A')).to.equal(false)
            expect(f(switchedState, 'Container 2A')).to.equal(true)
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

    describe('loadInContainer', () => {
      const c1:Container = state.leafContainers.get('Container 1A')
      const c2:Container = state.leafContainers.get('Container 2A')
      it('pushes if container patterns match', () => {
        const s = state.loadInContainer(c1, {url: '/a/3', time: 7500})
        expect(s.history.back.length).to.equal(2)
      })

      it('does nothing if patterns do not match', () => {
        const s = state.loadInContainer(c1, {url: '/c/1', time: 7500})
        expect(s.history.back.length).to.equal(1)
      })

      it('does nothing if already on this page', () => {
        const s = state.loadInContainer(c1, {url: '/a', time: 7500})
        expect(s.history.back.length).to.equal(1)
      })

      it('loads initialUrl into history when a page below it is loaded', () => {
        const s = state.loadInContainer(c2, {url: '/b/1', time: 7500})
        const history:HistoryStack = s.history
        expect(history.back.length).to.equal(3)
        expect(history.back[1].url).to.equal('/a')
        expect(history.back[2].url).to.equal('/b')
        expect(history.back[2].visits.length).to.equal(2)
        expect(history.back[2].visits[1].time).to.equal(7499)
        expect(history.current.url).to.equal('/b/1')
        expect(history.forward.length).to.equal(0)
      })

      it('enables a container when loading into it', () => {
        const s1 = state.addWindow({
          forName: 'Container 1A',
          visible: false
        })
        const s2 = state.loadInContainer(c1, {url: '/a/3', time: 7500})
        expect(s1.isContainerEnabled('Container 1A')).to.equal(false)
        expect(s2.isContainerEnabled('Container 1A')).to.equal(true)
      })
    })
  })

  describe('nested group', () => {
    const state:State = nestedState
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

    describe('history', () => {
      it('returns history based on container history', () => {
        const h:HistoryStack = state.history
        expect(h.back.length).to.equal(1)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
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

      describe('pushing into a non-active container', () => {
        const page:Page = new Page({
          url: '/x',
          params: {},
          group: 'SubGroup 2',
          container: 'Container 2B',
        })
        const s:State = state.push({page, time: 5000})

        it('switches container', () => {
          expect(s.activeGroupName).to.equal('Group 1')
          expect(s.activeContainerName).to.equal('Container 2B')
        })

        it('hides first group\'s history', () => {
          const h:HistoryStack = s.history
          expect(h.back.length).to.equal(1)
          expect(h.back[0].isZeroPage).to.equal(true)
        })
      })
    })

    describe('go', () => {
      it('causes the current container to go', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          group: 'Group 1',
          container: 'Container 1A'
        })
        const s = state.push({page, time: 6000}).go({n: -1, time: 7000})
        const history:HistoryStack = s.history
        expect(history.back.length).to.equal(1)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(1)
        expect(history.forward[0].url).to.equal('/a/1')
      })

      it('goes back 1 to zero page', () => {
        const newState:State = state.go({n: -1, time: 5000})
        const h:HistoryStack = newState.history
        expect(h.back.length).to.equal(0)
        expect(h.current).to.deep.equal(newState.zeroPage)
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a')
      })

      it.only('records visit to zero page', () => {
        const newState:State = state.go({n: -1, time: 5000})
        const zeroPage:VisitedPage = newState.getPages().first()
        expect(zeroPage.isZeroPage).to.equal(true)
        expect(zeroPage.visits.length).to.equal(2)
        expect(zeroPage.visits[1].time).to.equal(5000)
      })

      it('can\'t go back to Group 2, history doesn\'t cross its boundary', () => {
        const s = state
          .switchToContainer({name: 'SubGroup 2', time: 2000})
          .switchToContainer({name: 'SubGroup 3', time: 3000})
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(1)
        expect(h.current.url).to.equal('/g')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('top', () => {
      it('goes to top of current container', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          group: 'SubGroup 1',
          container: 'Container 1A'
        })
        const s = state.push({page, time: 6000}).top({time: 7000})
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(1)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a/1')
      })
    })

    describe('isContainerAtTopPage', () => {
      const f = (s: State, name: string) => s.isContainerAtTopPage(name)

      it('is at first', () => {
        expect(f(state, 'Container 1A')).to.equal(true)
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
          expect(f(pushedState, 'Container 1A')).to.equal(false)
        })

        describe('after switch', () => {
          const switchedState: State = pushedState.switchToContainer({
            name: 'Container 2A',
            time: 3000
          })

          it('is not after switch, but new container is', () => {
            expect(f(switchedState, 'Container 1A')).to.equal(false)
            expect(f(switchedState, 'Container 2A')).to.equal(true)
          })
        })
      })
    })
  })

  describe('inter-container history (mobile)', () => {
    const s1:State = nestedState
    const group = s1.containers.get('SubGroup 3') as Group
    const state:State = s1.switchToGroup({
      name: group.name,
      time: 1500
    })

    it('has allow inter-container history turned on', () => {
      expect(group.allowInterContainerHistory).to.equal(true)
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

      it('crosses the container boundary', () => {
        const s = state.switchToContainer({name: 'Container 2C', time: 2000})
        const history:HistoryStack = s.history
        expect(history.back.length).to.equal(2)
        expect(history.back[1].url).to.equal('/g')
        expect(history.current.url).to.equal('/h')
        expect(history.forward.length).to.equal(0)
      })
    })
  })

  describe('blank group', () => {
    describe('before load', () => {
      const state:State = blankStateBeforeLoad

      it('has all containers disabled', () => {
        expect(state.hasEnabledContainers('Group 2')).to.equal(false)
      })
    })

    describe('after load', () => {
      const state:State = blankState

      it('resides on the zero page when all containers are disabled', () => {
        const history:HistoryStack = state.history
        expect(history.back.length).to.equal(0)
        expect(history.current).to.deep.equal(zero)
        expect(history.forward.length).to.equal(0)
      })

      it('switches to a container', () => {
        const s = state.activateContainer('Container 2B', 2000)
        expect(s.activeContainerName).to.equal('Container 2B')
        const h:HistoryStack = s.history
        expect(h.back.length).to.equal(1)
        expect(h.back[0]).to.deep.equal(zero)
        expect(h.current.url).to.equal('/f')
        expect(h.forward.length).to.equal(0)
      })
    })
  })
})