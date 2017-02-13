import HistoryStack from '../../../src/model/HistoryStack'
import {createPage} from '../helpers'
import Page from '../../../src/model/Page'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('History', () => {
  const now:number = new Date().getTime()
  const later:number = now + 1000
  const backPage = createPage('/a')
  const currentPage = createPage('/b')
  const forwardPage = createPage('/c')
  const history:HistoryStack = new HistoryStack({
    back: [backPage],
    current: currentPage,
    forward: [forwardPage]
  })

  describe('push', () => {
    it('correctly sets the new page as active', () => {
      const h:HistoryStack = history.push(new Page({
        url: '/d',
        params: {},
        groupName: 'Group 1',
        containerName: 'Container 1'
      }))
      expect(h.back.length).toBe(2)
      expect(h.current.url).toBe('/d')
      expect(h.forward.length).toBe(0)
    })
  })

  describe('containsPage', () => {
    it('returns true if page is found', () => {
      expect(history.containsPage(backPage)).toBe(true)
      expect(history.containsPage(currentPage)).toBe(true)
      expect(history.containsPage(forwardPage)).toBe(true)
    })

    it('returns false if page is not found', () => {
      expect(history.containsPage(createPage('/d'))).toBe(false)
    })
  })

  describe('getShiftAmount', () => {
    it('returns 0 if page is current page', () => {
      expect(history.getShiftAmount(currentPage)).toBe(0)
    })
    it('returns negative if page is a back page', () => {
      expect(history.getShiftAmount(backPage)).toBe(-1)
    })
    it('returns positive if page is forward page', () => {
      expect(history.getShiftAmount(forwardPage)).toBe(1)
    })
  })

  describe('top', () => {
    it('goes back to the beginning of the stack', () => {
      const h:HistoryStack = history.top(later)
      expect(h.back.length).toBe(0)
      expect(h.current.url).toBe('/a')
      expect(h.forward.length).toBe(2)
      expect(h.forward[0].url).toBe('/b')
      expect(h.forward[1].url).toBe('/c')
    })
  })
})