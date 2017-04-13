import * as utils from '../../../src/util/pages'
import {expect} from 'chai'
import HistoryStack from '../../../src/model/HistoryStack'
import {VisitType} from '../../../src/model/PageVisit'
import VisitedPage from '../../../src/model/VisitedPage'
import {List} from 'immutable'
import Page from '../../../src/model/Page'
declare const describe:any
declare const it:any

describe('pages utils', () => {
  const backPage = new VisitedPage({
    url: '/a',
    params: {},
    group: 'Group 1',
    container: 'Container 1A',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 3000, type: VisitType.MANUAL}
    ]
  })
  const currentPage = new VisitedPage({
    url: '/b',
    params: {},
    group: 'Group 1',
    container: 'Container 1A',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 4000, type: VisitType.MANUAL},
      {time: 6000, type: VisitType.MANUAL}
    ]
  })
  const forwardPage = new VisitedPage({
    url: '/c',
    params: {},
    group: 'Group 1',
    container: 'Container 1A',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 5000, type: VisitType.MANUAL}
    ]
  })
  const pages = List<VisitedPage>([backPage, currentPage, forwardPage])
  
  describe('toHistoryStack', () => {
    it('converts a list of pages to a HistoryStack representation', () => {
      expect(utils.toHistoryStack(pages)).to.deep.equal(new HistoryStack({
        back: [backPage],
        current: currentPage,
        forward: [forwardPage]
      }))
    })

    it('excludes pages that were only visited via CreateContainer', () => {
      const unvistedPage = new Page({
        url: '/d',
        params: {},
        group: 'Group 1',
        container: 'Container 2A'
      })
      const params = {page: unvistedPage, time: 2000, type: VisitType.AUTO}
      const ps = utils.push(pages, params)
      expect(utils.toHistoryStack(ps)).to.deep.equal(new HistoryStack({
        back: [backPage],
        current: currentPage,
        forward: []
      }))
    })
  })

  describe('push', () => {
    it('correctly sets the new page as active', () => {
      const page = new Page({
        url: '/d',
        params: {},
        group: 'Group 1',
        container: 'Container 1A'
      })
      const ps = utils.push(pages, {page, time: 10000})
      const h:HistoryStack = utils.toHistoryStack(ps)
      expect(h.back.length).to.equal(2)
      expect(h.current.url).to.equal('/d')
      expect(h.forward.length).to.equal(0)
    })

    it('works after pushing multiple pages', () => {
      const push = (pages:List<VisitedPage>, url:string, time:number) =>
        utils.push(pages, {
          page: new Page({
            url,
            params: {},
            group: 'Group 1',
            container: 'Container 1A'
          }
        ),
        time
      })
      const ps = push(push(push(pages, '/d', 10000), '/d/1', 10001), '/d/1/1', 10002)
      const h:HistoryStack = utils.toHistoryStack(ps)
      expect(h.back.length).to.equal(4)
      expect(h.back[0].url).to.equal('/a')
      expect(h.back[1].url).to.equal('/b')
      expect(h.back[2].url).to.equal('/d')
      expect(h.back[3].url).to.equal('/d/1')
      expect(h.current.url).to.equal('/d/1/1')
      expect(h.forward.length).to.equal(0)
    })
  })

  describe('getShiftAmount', () => {
    it('returns 0 if page is current page', () => {
      expect(utils.getShiftAmount(pages, currentPage)).to.equal(0)
    })
    it('returns negative if page is a back page', () => {
      expect(utils.getShiftAmount(pages, backPage)).to.equal(-1)
    })
    it('returns positive if page is forward page', () => {
      expect(utils.getShiftAmount(pages, forwardPage)).to.equal(1)
    })
  })

  describe('top', () => {
    it('goes back to the beginning of the stack', () => {
      const ps:List<VisitedPage> = utils.top(pages, {time: 6000})
      const h:HistoryStack = utils.toHistoryStack(ps)
      expect(h.back.length).to.equal(0)
      expect(h.current.url).to.equal('/a')
      expect(h.forward.length).to.equal(2)
      expect(h.forward[0].url).to.equal('/b')
      expect(h.forward[1].url).to.equal('/c')
    })
  })

  describe('back', () => {
    it('updates the time of the back page', () => {
      const ps:List<VisitedPage> = utils.back(pages, {n: 1, time: 10000})
      expect(ps.size).to.equal(3)
      expect(utils.getActivePage(ps).url).to.equal('/a')
      expect(utils.getActivePage(ps).lastVisit.time).to.equal(10000)
    })
  })
})