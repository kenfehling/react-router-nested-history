import HistoryStack from '../../../src/model/HistoryStack'
import {createPage} from '../fixtures'
import Page from '../../../src/model/Page'
import Pages from '../../../src/model/Pages'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('Pages', () => {
  const backPage = createPage('/a', 2000, 2000, 2000)
  const currentPage = createPage('/b', 3000, 3000, 5000)
  const forwardPage = createPage('/c', 4000, 4000, 4000)
  const pages:Pages = new Pages([backPage, currentPage, forwardPage])

  describe('toHistoryStack', () => {
    it('converts a list of pages to a HistoryStack representation', () => {
      expect(pages.toHistoryStack()).to.deep.equal(new HistoryStack({
        back: [backPage],
        current: currentPage,
        forward: [forwardPage]
      }))
    })
  })

  describe('push', () => {
    it('correctly sets the new page as active', () => {
      const p:Pages = pages.push(createPage('/d'), 10000)
      const h:HistoryStack = p.toHistoryStack()
      expect(h.back.length).to.equal(2)
      expect(h.current.url).to.equal('/d')
      expect(h.forward.length).to.equal(0)
    })

    it('works after pushing multiple pages', () => {
      const push = (p:Pages, url:string, time:number) => p.push(new Page({
        url,
        params: {},
        groupName: 'Group 1',
        containerName: 'Container 1'
      }), time)
      const p:Pages =
          push(push(push(pages, '/d', 10000), '/d/1', 10001), '/d/1/1', 10002)
      const h:HistoryStack = p.toHistoryStack()
      expect(h.back.length).to.equal(4)
      expect(h.back[0].url).to.equal('/a')
      expect(h.back[1].url).to.equal('/b')
      expect(h.back[2].url).to.equal('/d')
      expect(h.back[3].url).to.equal('/d/1')
      expect(h.current.url).to.equal('/d/1/1')
      expect(h.forward.length).to.equal(0)
    })
  })

  describe('containsPage', () => {
    it('returns true if page is found', () => {
      expect(pages.containsPage(backPage)).to.equal(true)
      expect(pages.containsPage(currentPage)).to.equal(true)
      expect(pages.containsPage(forwardPage)).to.equal(true)
    })

    it('returns false if page is not found', () => {
      expect(pages.containsPage(createPage('/d', 10000, 10000))).to.equal(false)
    })
  })

  describe('getShiftAmount', () => {
    it('returns 0 if page is current page', () => {
      expect(pages.getShiftAmount(currentPage)).to.equal(0)
    })
    it('returns negative if page is a back page', () => {
      expect(pages.getShiftAmount(backPage)).to.equal(-1)
    })
    it('returns positive if page is forward page', () => {
      expect(pages.getShiftAmount(forwardPage)).to.equal(1)
    })
  })

  describe('top', () => {
    it('goes back to the beginning of the stack', () => {
      const p:Pages = pages.top(6000)
      const h:HistoryStack = p.toHistoryStack()
      expect(h.back.length).to.equal(0)
      expect(h.current.url).to.equal('/a')
      expect(h.forward.length).to.equal(2)
      expect(h.forward[0].url).to.equal('/b')
      expect(h.forward[1].url).to.equal('/c')
    })
  })

  describe('back', () => {
    it('updates the time of the back page', () => {
      const p:Pages = pages.back(1, 10000)
      expect(p.activePage.url).to.equal('/a')
      expect(p.activePage.lastVisited).to.equal(10000)
    })
  })
})