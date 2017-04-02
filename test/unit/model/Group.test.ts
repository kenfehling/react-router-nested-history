import Group from '../../../src/model/Group'
import Container from '../../../src/model/Container'
import {HistoryStack} from '../../../src/model/Pages'
import Page from '../../../src/model/Page'
import * as fixtures from '../fixtures'
import IContainer from '../../../src/model/IContainer'
import {Map} from 'immutable'
import {expect} from 'chai'
import State from '../../../src/model/State'
declare const describe:any
declare const it:any

describe('Group', () => {
  const containers:Map<string, Container> = {} as Map<string, Container>

  describe('simple group', () => {
    const group = fixtures.loadedSimpleState.groups.toArray()[0]

    describe('replaceContainer', () => {
      it('creates a new container if needed', () => {
        const newGroup:Group = group.replaceContainer(new Container({
          name: 'Container X',
          group: group.name,
          initialUrl: '/x',
          patterns: ['/x', '/x/:id'],
          time: 10000
        }))
        expect(newGroup.containers.size).to.equal(group.containers.size + 1)
      })

      it('replaces an existing container', () => {
        const container:IContainer = group.containers.toArray()[0]
        const newContainer = container.push({
          page: new Page({
            url: '/x/1',
            params: {id: '1'},
            container: container.name
          }),
          time: 10000
        })
        const newGroup:Group =
            group.replaceContainer(newContainer as IContainer)
        expect(newGroup.containers.size).to.equal(group.containers.size)
        expect(newGroup.containers.toArray()[0].name).to.equal(container.name)
        expect(newGroup.containers.toArray()[0].activePage.url).to.equal('/x/1')
      })
    })

    describe('containerStackOrder', () => {
      const g = group.activateContainer({name: 'Container 3A', time: 7000})

      it('gets containers in latest active order', () => {
        const newOrder:IContainer[] = g.containerStackOrder
        expect(newOrder[0].initialUrl).to.equal('/c')
        expect(newOrder[0].lastVisit.time).to.equal(7001)
      })
    })

    describe('history', () => {
      it('returns history based on container history 1', () => {
        const h:HistoryStack = group.history
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('returns history based on container history 2', () => {
        const g = group.activateContainer({name: 'Container 3A', time: 2000})
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('history with forward history maintained', () => {
      it('does not include containers that never were visited', () => {
        const h:HistoryStack = group.historyWithFwdMaintained
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('includes forward history', () => {
        const g = group
                    .activateContainer({name: 'Container 3A', time: 2000})
                    .back({n: 1, time: 3000})
        const h:HistoryStack = g.historyWithFwdMaintained
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/c')
      })

      it('does not repeat pages', () => {
        const container1page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          container: 'Container 1A'
        })
        const container2page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          container: 'Container 2A'
        })
        const g:Group = group
          .push({page: container1page, time: 5000})
          .activateContainer({name: 'Container 2A', time: 7500})
          .push({page: container2page, time: 10000})
          .back({n: 1, time: 15000})
        const h:HistoryStack = g.historyWithFwdMaintained
        expect(h.back.length).to.equal(2)
        expect(h.back[0].url).to.equal('/a')
        expect(h.back[1].url).to.equal('/a/1')
        expect(h.current.url).to.equal('/b')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/b/1')
      })
    })

    describe('activateContainer', () => {
      it('switches the current container', () => {
        const g:Group = group.activateContainer({name: 'Container 3A', time: 2000})
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })

      it('switches to a container', () => {
        const g:Group = group.activateContainer({name: 'Container 3A', time: 2000})
        expect(g.activeContainer).to.equal('Container 3A')
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('go', () => {
      it('causes the current container to go', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          container: 'Container 1A'
        })
        const g:Group = group.push({page, time: 6000}).go({n: -1, time: 7000})
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a/1')
      })

      it('switches container when the current one runs out', () => {
        const g:Group = group
                          .activateContainer({name: 'Container 3A', time: 2000})
                          .go({n: -1, time: 3000})
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('throws an error if you try to go past the history', () => {
        expect(() => group.go({n: -1, time: 2000})).to.throw
      })
    })

    describe('push', () => {
      it('switches container when pushing in non-active container', () => {
        const page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          container: 'Container 2A'
        })
        const g:Group = group.push({page, time: 5000})
        expect(g.activeContainer).to.equal('Container 2A')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          container: 'Container 1A',
        })
        const h:HistoryStack = group.push({page, time: 5000}).history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/a')
        expect(h.current.url).to.equal('/d')
        expect(h.forward.length).to.equal(0)
      })

      it('works after pushing multiple pages', () => {
        const push = (g:Group, url:string, time:number) => g.push({
          page: new Page({
            url,
            params: {},
            container: 'Container 1A'
          }),
          time
        })
        const g = push(push(push(group, '/d', 5000), '/d/1', 6000), '/d/1/1', 7000)
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(3)
        expect(h.back[0].url).to.equal('/a')
        expect(h.back[1].url).to.equal('/d')
        expect(h.back[2].url).to.equal('/d/1')
        expect(h.current.url).to.equal('/d/1/1')
        expect(h.forward.length).to.equal(0)
      })
    })

    describe('top', () => {
      it('goes to top of current container', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          container: 'Container 1A'
        })
        const g:Group = group.push({page, time: 6000}).top({time: 7000})
        const history:HistoryStack = g.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(1)
        expect(history.forward[0].url).to.equal('/a/1')
      })
    })

    describe('loadFromUrl', () => {
      it('loads initialUrl into history when a page below it is loaded', () => {
        const g:Group = group.load({url: '/b/1', time: 5000})
        const history:HistoryStack = g.history
        expect(history.back.length).to.equal(2)
        expect(history.back[0].url).to.equal('/a')
        expect(history.back[1].url).to.equal('/b')
        expect(history.current.url).to.equal('/b/1')
        expect(history.forward.length).to.equal(0)
      })
    })
  })

  describe('nested group', () => {
    const getParentGroup = (s:State):Group => s.groups.toArray()[0]

    const state:State = fixtures.loadedNestedState
    const parentGroup = getParentGroup(state)
    const nestedGroup1:Group = parentGroup.containers.toArray()[0] as Group
    const nestedGroup2:Group = parentGroup.containers.toArray()[1] as Group
    const nestedGroup3:Group = parentGroup.containers.toArray()[2] as Group

    describe('replaceContainer', () => {
      it('creates a new container if needed', () => {
        const newGroup:Group = parentGroup.replaceContainer(new Container({
          name: 'Container X',
          group: parentGroup.name,
          initialUrl: '/x',
          patterns: ['/x', '/x/:id'],
          time: 10000
        }))
        expect(newGroup.containers.size).to.equal(parentGroup.containers.size + 1)
      })

      it('replaces an existing container', () => {
        const container:IContainer = nestedGroup1.containers.toArray()[0]
        const newContainer = container.push({
          page: new Page({
            url: '/x/1',
            params: {id: '1'},
            container: container.name
          }),
          time: 10000
        })
        const newGroup:Group =
            nestedGroup1.replaceContainer(newContainer as IContainer)
        expect(newGroup.containers.size).to.equal(parentGroup.containers.size)
        expect(newGroup.containers.toArray()[0].name).to.equal(container.name)
        expect(newGroup.containers.toArray()[0].activePage.url).to.equal('/x/1')
      })
    })

    describe('stack orders', () => {
      const g = parentGroup.activateContainer({name: 'Group 2', time: 2000})

      it('gets containers in latest active order', () => {
        const newOrder:IContainer[] = g.containerStackOrder
        expect(newOrder[0].initialUrl).to.equal('/e')
        expect(newOrder[0].lastVisit.time).to.equal(2001)
        expect(newOrder[1].initialUrl).to.equal('/a')
      })
    })


    describe('history', () => {
      it('returns history based on container history', () => {
        const history:HistoryStack = parentGroup.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(0)
      })
    })

    describe('go', () => {
      it('causes the current container to go', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          container: 'Container 1A'
        })
        const g = parentGroup.push({page, time: 6000}).go({n: -1, time: 7000})
        const history:HistoryStack = g.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(1)
        expect(history.forward[0].url).to.equal('/a/1')
      })

      it('cannot go back to Group 2 because history doesn\'t cross its boundary', () => {
        const g:Group = parentGroup
                          .activateContainer({name: 'Group 2', time: 2000})
                          .activateContainer({name: 'Group 3', time: 3000})
        const history:HistoryStack = g.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/g')
        expect(history.forward.length).to.equal(0)
      })

      it('throws an error if you try to go past the history', () => {
        expect(() => parentGroup.go({n: -1, time: 2000})).to.throw
      })
    })

    describe('push', () => {
      const page:Page = new Page({
        url: '/x',
        params: {},
        container: nestedGroup2.containers.toArray()[1].name,
      })
      const newState:State = state.push({page, time: 5000})
      const newGroup:Group = getParentGroup(newState)

      it('switches container when pushing in non-active container', () => {
        expect(newGroup.activeContainer).to.equal(nestedGroup2.name)
      })

      it('correctly sets the new page as active', () => {
        const h:HistoryStack = newGroup.history
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/x')
        expect(h.forward.length).to.equal(0)
      })

      it('hides first group history when pushing another group', () => {
        const h:HistoryStack = newState.history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].isZeroPage).to.be.true
      })
    })

    describe('top', () => {
      it('goes to top of current container', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          container: nestedGroup1.containers.toArray()[0].name
        })
        const newGroup = parentGroup.push({page, time: 6000}).top({time: 7000})
        expect(newGroup.history.back.length).to.equal(0)
        expect(newGroup.history.current.url).to.equal('/a')
        expect(newGroup.history.forward.length).to.equal(1)
        expect(newGroup.history.forward[0].url).to.equal('/a/1')
      })
    })
  })

  describe('inter-container history (mobile)', () => {
    const group = fixtures.nestedState.groups.toArray()[0].containers.toArray()[2] as Group
    it('crosses the container boundary', () => {
      const g = group.activateContainer({name: 'Container 2C', time: 2000})
      const history:HistoryStack = g.history
      expect(history.back.length).to.equal(1)
      expect(history.back[0].url).to.equal('/g')
      expect(history.current.url).to.equal('/h')
      expect(history.forward.length).to.equal(0)
    })
  })
})