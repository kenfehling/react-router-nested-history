import Container from '../../../src/model/Container'
import Pages from '../../../src/model/Pages'
import {expect} from 'chai'
import VisitedPage from '../../../src/model/VistedPage'
import {VisitType} from '../../../src/model/PageVisit'
declare const describe:any
declare const it:any

describe('Container', () => {
  const backPage = new VisitedPage({
    url: '/a',
    params: {},
    groupName: 'Group 1',
    containerName: 'Container 1',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 3000, type: VisitType.MANUAL}
    ]
  })
  const currentPage = new VisitedPage({
    url: '/a/1',
    params: {},
    groupName: 'Group 1',
    containerName: 'Container 1',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 4000, type: VisitType.MANUAL},
      {time: 6000, type: VisitType.MANUAL}
    ]
  })
  const forwardPage = new VisitedPage({
    url: '/a/2',
    params: {},
    groupName: 'Group 1',
    containerName: 'Container 1',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 5000, type: VisitType.MANUAL}
    ]
  })
  const container:Container = new Container({
    name: 'Container 1',
    groupName: 'Group 1',
    initialUrl: '/a',
    patterns: ['/a', '/a/:id'],
    isDefault: true,
    pages: new Pages([backPage, currentPage, forwardPage]),
    time: 2000
  })

  describe('patternsMatch', () => {
    it('returns true if one of the patterns match', () => {
      expect(container.patternsMatch('/a')).to.equal(true)
      expect(container.patternsMatch('/a/1')).to.equal(true)
    })

    it('returns false if none of the patterns match', () => {
      expect(container.patternsMatch('/a/1/1')).to.equal(false)
      expect(container.patternsMatch('/c')).to.equal(false)
    })
  })

  describe('pushUrl', () => {
    const newContainer = container.pushUrl('/a/3', 8000)

    it('pushes to the container history', () => {
      expect(newContainer.history.current.url).to.equal('/a/3')
      expect(newContainer.history.back.length).to.equal(2)
      expect(newContainer.history.back[0].url).to.equal('/a')
      expect(newContainer.history.back[1].url).to.equal('/a/1')
      expect(newContainer.history.forward.length).to.equal(0)
    })

    it('parses params', () => {
      expect(newContainer.history.current.params).to.deep.equal({id: '3'})
    })

    it('works after pushing multiple pages', () => {
      const c:Container =
          newContainer.pushUrl('/a/3', 7500).pushUrl('/a/4', 8500)
      expect(c.history.current.url).to.equal('/a/4')
      expect(c.history.back.length).to.equal(3)
      expect(c.history.back[0].url).to.equal('/a')
      expect(c.history.back[1].url).to.equal('/a/1')
      expect(c.history.back[2].url).to.equal('/a/3')
      expect(c.history.forward.length).to.equal(0)
    })
  })

  describe('loadFromUrl', () => {
    it('pushes if container patterns match', () => {
      expect(container.loadFromUrl('/a/3', 7500).history.back.length).to.equal(2)
    })

    it('does nothing if patterns do not match', () => {
      expect(container.loadFromUrl('/c/1', 7500).history.back.length).to.equal(1)
    })

    it('does nothing if already on this page', () => {
      expect(container.loadFromUrl('/a/1', 7500).history.back.length).to.equal(1)
    })
  })

  describe('top', () => {
    const newContainer:Container = container.top(10000)

    it('updates the lastVisit of the initial page', () => {
      expect(newContainer.history.current.url).to.equal('/a')
      expect(newContainer.history.current.lastVisit.time).to.equal(10000)
    })
  })
})