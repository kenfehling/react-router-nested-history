import Group from '../../../src/model/Group'
import Container from '../../../src/model/Container'
import HistoryStack from '../../../src/model/HistoryStack'
import Page from '../../../src/model/Page'
import IContainer from '../../../src/model/interfaces/IContainer'
import * as fixtures from '../fixtures'
import IGroupContainer from '../../../src/model/interfaces/IGroupContainer'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('Group', () => {
  const now:number = new Date().getTime()
  const later:number = now + 1000
  const containers:Map<string, Container> = new Map<string, Container>()

  describe('simple group', () => {
    const group = fixtures.simpleState.groups[0]

    describe('replaceContainer', () => {
      it('creates a new container if needed', () => {
        const newGroup:Group = group.replaceContainer(new Container({
          name: 'Container X',
          groupName: group.name,
          initialUrl: '/x',
          patterns: ['/x', '/x/:id']
        }))
        expect(newGroup.containers.length).toEqual(group.containers.length + 1)
      })

      it('replaces an existing container', () => {
        const container:IGroupContainer = group.containers[0]
        const newContainer:IGroupContainer = container.push(new Page({
          url: '/x/1',
          params: {id: '1'},
          groupName: group.name,
          containerName: container.name
        }))
        const newGroup:Group = group.replaceContainer(newContainer)
        expect(newGroup.containers.length).toEqual(group.containers.length)
        expect(newGroup.containers[0].name).toBe(container.name)
        expect(newGroup.containers[0].history.activePage.url).toBe('/x/1')
      })
    })

    describe('stack orders', () => {
      const newGroup:Group = group.activateContainer('Container 3', now + 1)

      describe('containerStackOrder', () => {
        it('returns the original order if all else is equal', () => {
          expect(group.containerStackOrder).toEqual(group.containers)
        })

        it('gets containers in latest active order', () => {
          const newOrder:IContainer[] = newGroup.containerStackOrder
          expect(newOrder[0].initialUrl).toEqual('/c')
          expect(newOrder[0].lastVisited).toEqual(now + 2)
          expect(newOrder[1].initialUrl).toEqual('/a')
        })
      })

      describe('indexedContainerStackOrder', () => {
        it('returns the original order if all else is equal', () => {
          expect(group.indexedContainerStackOrder).toEqual([0, 1, 2])
        })

        it('gets containers in latest active order', () => {
          expect(newGroup.indexedContainerStackOrder).toEqual([1, 2, 0])
        })
      })
    })

    describe('history', () => {
      it('returns history based on container history 1', () => {
        const history:HistoryStack = group.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(0)
      })

      it('returns history based on container history 2', () => {
        const newGroup:Group = group.activateContainer('Container 3', later)
        const history:HistoryStack = newGroup.history
        expect(history.back.length).toBe(1)
        expect(history.back[0].url).toBe('/a')
        expect(history.current.url).toBe('/c')
        expect(history.forward.length).toBe(0)
      })
    })

    describe('history with forward history maintained', () => {
      it('does not show history of containers that have never been visited', () => {
        const history:HistoryStack = group.historyWithFwdMaintained
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(0)
      })
    })

    describe('activateContainer', () => {
      it('switches the current container', () => {
        const history:HistoryStack = group.activateContainer('Container 3', later).history
        expect(history.back.length).toBe(1)
        expect(history.back[0].url).toBe('/a')
        expect(history.current.url).toBe('/c')
        expect(history.forward.length).toBe(0)
      })

      it('switches to a container', () => {
        const g:Group = group.activateContainer('Container 3', later)
        expect(g.activeContainerName).toBe('Container 3')
        const history:HistoryStack = g.history
        expect(history.back.length).toBe(1)
        expect(history.back[0].url).toBe('/a')
        expect(history.current.url).toBe('/c')
        expect(history.forward.length).toBe(0)
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
        const g:Group = group.push(page).go(-1, later)
        const history:HistoryStack = g.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(1)
        expect(history.forward[0].url).toBe('/a/1')
      })

      it('switches container when the current one runs out', () => {
        const g:Group = group.activateContainer('Container 3', later).go(-1, later)
        const history:HistoryStack = g.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(0)
      })

      it('throws an error if you try to go past the history', () => {
        expect(() => group.go(-1, later)).toThrow()
      })
    })

    describe('push', () => {
      it('switches container when pushing in non-active container', () => {
        const page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          groupName: 'Group 1',
          containerName: 'Container 2',
          lastVisited: later
        })
        expect(group.push(page).activeContainerName).toBe('Container 2')
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/d',
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1',
        })
        const h:HistoryStack = group.push(page).history
        expect(h.back.length).toBe(1)
        expect(h.back[0].url).toBe('/a')
        expect(h.current.url).toBe('/d')
        expect(h.forward.length).toBe(0)
      })

      it('works after pushing multiple pages', () => {
        const push = (g:Group, url:string) => g.push(new Page({
          url,
          params: {},
          groupName: 'Group 1',
          containerName: 'Container 1'
        }))
        const g:Group = push(push(push(group, '/d'), '/d/1'), '/d/1/1')
        const h:HistoryStack = g.history
        expect(h.back.length).toBe(3)
        expect(h.back[0].url).toBe('/a')
        expect(h.back[1].url).toBe('/d')
        expect(h.back[2].url).toBe('/d/1')
        expect(h.current.url).toBe('/d/1/1')
        expect(h.forward.length).toBe(0)
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
        const g:Group = group.push(page).top(later)
        const history:HistoryStack = g.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(1)
        expect(history.forward[0].url).toBe('/a/1')
      })
    })
  })

  describe('nested group', () => {
    const group = fixtures.nestedState.groups[0]
    const nestedGroup1:Group = group.containers[0] as Group
    const nestedGroup2:Group = group.containers[1] as Group

    describe('replaceContainer', () => {
      it('creates a new container if needed', () => {
        const newGroup:Group = group.replaceContainer(new Container({
          name: 'Container X',
          groupName: group.name,
          initialUrl: '/x',
          patterns: ['/x', '/x/:id']
        }))
        expect(newGroup.containers.length).toEqual(group.containers.length + 1)
      })

      it('replaces an existing container', () => {
        const newGroup:Group = group.push(new Page({
          url: '/x/1',
          params: {id: '1'},
          groupName: nestedGroup1.name,
          containerName: nestedGroup1.containers[0].name
        }))
        expect(newGroup.containers.length).toEqual(group.containers.length)
        expect(newGroup.containers[0].name).toBe(nestedGroup1.name)
        expect(newGroup.containers[0].history.activePage.url).toBe('/x/1')
      })
    })

    describe('stack orders', () => {
      const newGroup:Group = group.activateContainer('Group 2', now + 1)

      describe('containerStackOrder', () => {
        it('returns the original order if all else is equal', () => {
          expect(group.containerStackOrder).toEqual(group.containers)
        })

        it('gets containers in latest active order', () => {
          const newOrder:IContainer[] = newGroup.containerStackOrder
          expect(newOrder[0].initialUrl).toEqual('/e')
          expect(newOrder[0].lastVisited).toEqual(now + 2)
          expect(newOrder[1].initialUrl).toEqual('/a')
        })
      })

      describe('indexedContainerStackOrder', () => {
        it('returns the original order if all else is equal', () => {
          expect(group.indexedContainerStackOrder).toEqual([0, 1])
          expect((group.containers[0] as Group)
              .indexedContainerStackOrder).toEqual([0, 1, 2])
        })

        it('gets containers in latest active order', () => {
          expect(newGroup.indexedContainerStackOrder).toEqual([1, 0])
          expect((group.containers[0] as Group)
            .indexedContainerStackOrder).toEqual([0, 1, 2])
        })
      })
    })

    describe('history', () => {
      it('returns history based on container history', () => {
        const history:HistoryStack = group.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(0)
      })

      it('doesn\'t cross the Group boundary', () => {
        const newGroup:Group = group.activateContainer('Group 2', later)
        const history:HistoryStack = newGroup.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/e')
        expect(history.forward.length).toBe(0)
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
        const newGroup:Group = group.push(page).go(-1, later)
        const history:HistoryStack = newGroup.history
        expect(history.back.length).toBe(0)
        expect(history.current.url).toBe('/a')
        expect(history.forward.length).toBe(1)
        expect(history.forward[0].url).toBe('/a/1')
      })

      it('cannot go back to Group because history doesn\'t cross its boundary', () => {
        const g:Group = group.activateContainer('Group 2', later)
        const history:HistoryStack = g.history
        expect(history.canGoBack()).toBeFalsy()
      })

      it('throws an error if you try to go past the history', () => {
        expect(() => group.go(-1, later)).toThrow()
      })
    })

    describe('push', () => {
      it('switches container when pushing in non-active container', () => {
        const page:Page = new Page({
          url: '/b/1',
          params: {id: '1'},
          groupName: nestedGroup2.name,
          containerName: nestedGroup2.containers[1].name,
          lastVisited: later
        })
        const newGroup = group.push(page)
        expect(newGroup.activeContainerName).toBe(nestedGroup2.name)
      })

      it('correctly sets the new page as active', () => {
        const page:Page = new Page({
          url: '/x',
          params: {},
          groupName: nestedGroup1.name,
          containerName: nestedGroup1.containers[0].name
        })
        const newGroup = group.push(page)
        expect(newGroup.history.back.length).toBe(1)
        expect(newGroup.history.current.url).toBe('/x')
        expect(newGroup.history.forward.length).toBe(0)
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
        const newGroup = group.push(page).top(later)
        expect(newGroup.history.back.length).toBe(0)
        expect(newGroup.history.current.url).toBe('/a')
        expect(newGroup.history.forward.length).toBe(1)
        expect(newGroup.history.forward[0].url).toBe('/a/1')
      })
    })
  })
})