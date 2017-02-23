import History from '../../../src/model/HistoryStack'
import Container from '../../../src/model/Container'
import {createPage} from '../fixtures'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('Container', () => {
  const backPage = createPage('/back')
  const currentPage = createPage('/a')
  const forwardPage = createPage('/forward')
  const now:number = 1000
  const container:Container = new Container({
    name: 'Container 1',
    groupName: 'Group 1',
    initialUrl: '/a',
    patterns: ['/a', '/a/:id'],
    isDefault: true,
    history: new History({
      back: [backPage],
      current: currentPage,
      forward: [forwardPage]
    })
  })

  describe('patternsMatch', () => {
    it('returns true if one of the patterns match', () => {
      expect(container.patternsMatch('/a')).toBe(true)
      expect(container.patternsMatch('/a/1')).toBe(true)
    })

    it('returns false if none of the patterns match', () => {
      expect(container.patternsMatch('/a/1/1')).toBe(false)
      expect(container.patternsMatch('/c')).toBe(false)
    })
  })

  describe('pushUrl', () => {
    let newContainer:Container

    beforeEach(() => {
      newContainer = container.pushUrl('/a/1', now)
    })

    it('pushes to the container history', () => {
      expect(newContainer.history.current.url).toBe('/a/1')
      expect(newContainer.history.back.length).toBe(2)
      expect(newContainer.history.back[0].url).toBe('/back')
      expect(newContainer.history.back[1].url).toBe('/a')
      expect(newContainer.history.forward.length).toBe(0)
    })

    it('parses params', () => {
      expect(newContainer.history.current.params).toEqual({id: '1'})
    })

    it('works after pushing multiple pages', () => {
      const c:Container =
          newContainer.pushUrl('/a/2', now + 1).pushUrl('/a/3', now + 2)
      expect(c.history.current.url).toBe('/a/3')
      expect(c.history.back.length).toBe(4)
      expect(c.history.back[0].url).toBe('/back')
      expect(c.history.back[1].url).toBe('/a')
      expect(c.history.back[2].url).toBe('/a/1')
      expect(c.history.back[3].url).toBe('/a/2')
      expect(c.history.forward.length).toBe(0)
    })
  })

  describe('loadFromUrl', () => {
    it('pushes if container patterns match', () => {
      expect(container.loadFromUrl('/a/1', now).history.back.length).toBe(2)
    })

    it('does nothing if patterns do not match', () => {
      expect(container.loadFromUrl('/c/1', now).history.back.length).toBe(1)
    })

    it('does nothing if already on this page', () => {
      expect(container.loadFromUrl('/a', now).history.back.length).toBe(1)
    })
  })

  describe('top', () => {
    let newContainer:Container

    beforeEach(() => {
      newContainer = container.top(5000)
    })

    it('updates the lastVisited of the initial page', () => {
      expect(newContainer.history.current.url).toBe('/back')
      expect(newContainer.history.current.lastVisited).toBe(5000)
    })
  })
})