import Page from '../../../src/model/Page'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

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
      expect(page.touch(1).lastVisited).toEqual(1)
    })
  })
})