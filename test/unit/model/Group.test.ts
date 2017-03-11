import Group from '../../../src/model/Group'
import Container from '../../../src/model/Container'
import {HistoryStack} from '../../../src/model/Pages'
import Page from '../../../src/model/Page'
import IContainer from '../../../src/model/IContainer'
import * as fixtures from '../fixtures'
import IGroupContainer from '../../../src/model/IGroupContainer'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('Group', () => {
  const containers:Map<string, Container> = new Map<string, Container>()

  describe('simple group', () => {
    const group = fixtures.loadedSimpleState.groups[0]

    describe('replaceContainer', () => {
      it('creates a new container if needed', () => {
        const newGroup:Group = group.replaceContainer(new Container({
          name: 'Container X',
          groupName: group.name,
          initialUrl: '/x',
          patterns: ['/x', '/x/:id'],
          time: 10000
        }))
        expect(newGroup.containers.length).to.equal(group.containers.length + 1)
      })

      it('replaces an existing container', () => {
        const container:IGroupContainer = group.containers[0]
        const newContainer = container.push(new Page({
          url: '/x/1',
          params: {id: '1'},
          groupName: group.name,
          containerName: container.name
        }), 10000)
        const newGroup:Group =
            group.replaceContainer(newContainer as IGroupContainer)
        expect(newGroup.containers.length).to.equal(group.containers.length)
        expect(newGroup.containers[0].name).to.equal(container.name)
        expect(newGroup.containers[0].activePage.url).to.equal('/x/1')
      })
    })

    describe('containerStackOrder', () => {
      const newGroup:Group = group.activateContainer('Container 3', 7000)

      it('gets containers in latest active order', () => {
        const newOrder:IContainer[] = newGroup.containerStackOrder
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
        const newGroup:Group = group.activateContainer('Container 3', 2000)
        const h:HistoryStack = newGroup.history
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
        const g = group.activateContainer('Container 3', 2000).back(1, 3000)
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
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const container2page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          groupName: 'Group 1',
          containerName: 'Container 2'
        })
        const g:Group = group
          .push(container1page, 5000)
          .activateContainer('Container 2', 7500)
          .push(container2page, 10000)
          .back(1, 15000)
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
        const g:Group = group.activateContainer('Container 3', 2000)
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/a')
        expect(h.current.url).to.equal('/c')
        expect(h.forward.length).to.equal(0)
      })

      it('switches to a container', () => {
        const g:Group = group.activateContainer('Container 3', 2000)
        expect(g.activeContainerName).to.equal('Container 3')
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
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const g:Group = group.push(page, 6000).go(-1, 7000)
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(1)
        expect(h.forward[0].url).to.equal('/a/1')
      })

      it('switches container when the current one runs out', () => {
        const g:Group = group.activateContainer('Container 3', 2000).go(-1, 3000)
        const h:HistoryStack = g.history
        expect(h.back.length).to.equal(0)
        expect(h.current.url).to.equal('/a')
        expect(h.forward.length).to.equal(0)
      })

      it('throws an error if you try to go past the history', () => {
        expect(() => group.go(-1, 2000)).to.throw
      })
    })

    describe('push', () => {
      it('switches container when pushing in non-active container', () => {
        const page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          groupName: 'Group 1',
          containerName: 'Container 2'
        })
        expect(group.push(page, 5000).activeContainerName).to.equal('Container 2')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1',
        })
        const h:HistoryStack = group.push(page, 5000).history
        expect(h.back.length).to.equal(1)
        expect(h.back[0].url).to.equal('/a')
        expect(h.current.url).to.equal('/d')
        expect(h.forward.length).to.equal(0)
      })

      it('works after pushing multiple pages', () => {
        const push = (g:Group, url:string, time:number) => g.push(new Page({
          url,
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1'
        }), time)
        const g:Group = push(push(push(group, '/d', 5000), '/d/1', 6000), '/d/1/1', 7000)
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
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const g:Group = group.push(page, 6000).top(7000)
        const history:HistoryStack = g.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(1)
        expect(history.forward[0].url).to.equal('/a/1')
      })
    })
  })

  describe('nested group', () => {
    const group = fixtures.loadedNestedState.groups[0]
    const nestedGroup1:Group = group.containers[0] as Group
    const nestedGroup2:Group = group.containers[1] as Group
    const nestedGroup3:Group = group.containers[2] as Group

    describe('replaceContainer', () => {
      it('creates a new container if needed', () => {
        const newGroup:Group = group.replaceContainer(new Container({
          name: 'Container X',
          groupName: group.name,
          initialUrl: '/x',
          patterns: ['/x', '/x/:id'],
          time: 10000
        }))
        expect(newGroup.containers.length).to.equal(group.containers.length + 1)
      })

      it('replaces an existing container', () => {
        const container:IGroupContainer = nestedGroup1.containers[0]
        const newContainer = container.push(new Page({
          url: '/x/1',
          params: {id: '1'},
          groupName: nestedGroup1.name,
          containerName: container.name
        }), 10000)
        const newGroup:Group =
            nestedGroup1.replaceContainer(newContainer as IGroupContainer)
        expect(newGroup.containers.length).to.equal(group.containers.length)
        expect(newGroup.containers[0].name).to.equal(container.name)
        expect(newGroup.containers[0].activePage.url).to.equal('/x/1')
      })
    })

    describe('stack orders', () => {
      const newGroup:Group = group.activateContainer('Group 2', 2000)

      it('gets containers in latest active order', () => {
        const newOrder:IContainer[] = newGroup.containerStackOrder
        expect(newOrder[0].initialUrl).to.equal('/e')
        expect(newOrder[0].lastVisit.time).to.equal(2001)
        expect(newOrder[1].initialUrl).to.equal('/a')
      })
    })


    describe('history', () => {
      it('returns history based on container history', () => {
        const history:HistoryStack = group.history
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
          groupName: 'Group 1',
          containerName: 'Container 1'
        })
        const newGroup:Group = group.push(page, 6000).go(-1, 7000)
        const history:HistoryStack = newGroup.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/a')
        expect(history.forward.length).to.equal(1)
        expect(history.forward[0].url).to.equal('/a/1')
      })

      it('cannot go back to Group 2 because history doesn\'t cross its boundary', () => {
        const g:Group = group.activateContainer('Group 2', 2000)
                             .activateContainer('Group 3', 3000)
        const history:HistoryStack = g.history
        expect(history.back.length).to.equal(0)
        expect(history.current.url).to.equal('/g')
        expect(history.forward.length).to.equal(0)
      })

      it('throws an error if you try to go past the history', () => {
        expect(() => group.go(-1, 2000)).to.throw
      })
    })

    describe('push', () => {
      it('switches container when pushing in non-active container', () => {
        const page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          groupName: nestedGroup2.name,
          containerName: nestedGroup2.containers[1].name,
        })
        const newGroup = group.push(page, 5000)
        expect(newGroup.activeContainerName).to.equal(nestedGroup2.name)
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/x',
          params: {},
          groupName: nestedGroup1.name,
          containerName: nestedGroup1.containers[0].name
        })
        const newGroup = group.push(page, 5000)
        expect(newGroup.history.back.length).to.equal(1)
        expect(newGroup.history.current.url).to.equal('/x')
        expect(newGroup.history.forward.length).to.equal(0)
      })
    })

    describe('top', () => {
      it('goes to top of current container', () => {
        const page:Page = new Page({
          url: '/a/1',
          params: {id: '1'},
          groupName: nestedGroup1.name,
          containerName: nestedGroup1.containers[0].name
        })
        const newGroup = group.push(page, 6000).top(7000)
        expect(newGroup.history.back.length).to.equal(0)
        expect(newGroup.history.current.url).to.equal('/a')
        expect(newGroup.history.forward.length).to.equal(1)
        expect(newGroup.history.forward[0].url).to.equal('/a/1')
      })
    })
  })

  describe('inter-container history (mobile)', () => {
    const group = fixtures.nestedState.groups[0].containers[2] as Group
    it('Crosses the container boundary', () => {
      const newGroup:Group = group.activateContainer('Container 2', 2000)
      const history:HistoryStack = newGroup.history
      expect(history.back.length).to.equal(1)
      expect(history.back[0].url).to.equal('/g')
      expect(history.current.url).to.equal('/h')
      expect(history.forward.length).to.equal(0)
    })
  })
})