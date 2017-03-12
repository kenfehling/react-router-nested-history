import {expect} from 'chai'
import VisitedPage from '../../../src/model/VistedPage'
import {VisitType} from '../../../src/model/PageVisit'
declare const describe:any
declare const it:any

describe('Page', () => {
  let page:VisitedPage = new VisitedPage({
    url: '/a',
    params: {},
    groupName: 'Group 1',
    containerName: 'Container 1A',
    visits: []
  })

  describe('touch', () => {
    it('updates lastVisit', () => {
      const visit = {time: 1, type: VisitType.MANUAL}
      expect(page.touch(visit).lastVisit.time).to.equal(1)
    })
  })
})