import Page from '../../../src/model/Page'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('Page', () => {
  let page:Page = new Page({
    url: '/a',
    params: {},
    containerName: 'Container 1',
    groupName: 'Group 1',
    lastVisited: 0
  })

  describe('touch', () => {
    it('updates lastVisited', () => {
      expect(page.touch(1).lastVisited).to.equal(1)
    })
  })
})