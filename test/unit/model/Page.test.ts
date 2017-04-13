import {expect} from 'chai'
import VisitedPage from '../../../src/model/VisitedPage'
import {VisitType} from '../../../src/model/PageVisit'
declare const describe:any
declare const it:any

describe('Page', () => {
  let page:VisitedPage = new VisitedPage({
    url: '/a',
    params: {},
    group: 'Group 1',
    container: 'Container 1A',
    visits: []
  })

  describe('touch', () => {
    it('updates lastVisit', () => {
      const visit = {time: 1, type: VisitType.MANUAL}
      expect(page.touch(visit).lastVisit.time).to.equal(1)
    })
  })
})