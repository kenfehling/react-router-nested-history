import Container from '../../../src/model/Container'
import Pages from '../../../src/model/Pages'
import {expect} from 'chai'
import VisitedPage from '../../../src/model/VistedPage'
import {VisitType} from '../../../src/model/PageVisit'
import {HistoryStack} from '../../../src/model/Pages'
declare const describe:any
declare const it:any

describe('Container', () => {
  const backPage = new VisitedPage({
    url: '/a',
    params: {},
    group: 'Group 1',
    container: 'Container 1',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 3000, type: VisitType.MANUAL}
    ]
  })
  const currentPage = new VisitedPage({
    url: '/a/1',
    params: {},
    group: 'Group 1',
    container: 'Container 1',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 4000, type: VisitType.MANUAL},
      {time: 6000, type: VisitType.MANUAL}
    ]
  })
  const forwardPage = new VisitedPage({
    url: '/a/2',
    params: {},
    group: 'Group 1',
    container: 'Container 1',
    visits: [
      {time: 2000, type: VisitType.AUTO},
      {time: 5000, type: VisitType.MANUAL}
    ]
  })
  const container:Container = new Container({
    name: 'Container 1',
    group: 'Group 1',
    initialUrl: '/a',
    patterns: ['/a', '/a/:id'],
    isDefault: true,
    pages: new Pages([backPage, currentPage, forwardPage]),
    time: 2000
  })


  describe('loadFromUrl', () => {
    it('pushes if container patterns match', () => {
      const c = container.load({url: '/a/3', time: 7500})
      expect(c.history.back.length).to.equal(2)
    })

    it('does nothing if patterns do not match', () => {
      const c = container.load({url: '/c/1', time: 7500})
      expect(c.history.back.length).to.equal(1)
    })

    it('does nothing if already on this page', () => {
      const c = container.load({url: '/a/1', time: 7500})
      expect(c.history.back.length).to.equal(1)
    })

    it('loads initialUrl into history when a page below it is loaded', () => {
      const b = new VisitedPage({
        url: '/b',
        params: {},
        group: 'Group 1',
        container: 'Container 2',
        visits: [
          {time: 1010, type: VisitType.AUTO}
        ]
      })
      const c2:Container = new Container({
        name: 'Container 2',
        group: 'Group 1',
        initialUrl: '/b',
        patterns: ['/b', '/b/:id'],
        isDefault: true,
        pages: new Pages([b]),
        time: 2000
      })
      const loadedContainer = c2.load({url: '/b/1', time: 5000})
      const history:HistoryStack = loadedContainer.history
      expect(history.back.length).to.equal(1)
      expect(history.back[0].url).to.equal('/b')
      expect(history.back[0].visits.length).to.equal(2)
      expect(history.back[0].visits[1].time).to.equal(4999)
      expect(history.current.url).to.equal('/b/1')
      expect(history.forward.length).to.equal(0)
    })

    it('enables a container when loading into it', () => {
      const c:Container = container.setEnabled(false)
      expect(c.load({url: '/a/3', time: 7500}).enabled).to.be.true
    })
  })

  describe('top', () => {
    const newContainer:Container = container.top({time: 10000})

    it('updates the lastVisit of the initial page', () => {
      expect(newContainer.history.current.url).to.equal('/a')
      expect(newContainer.history.current.lastVisit.time).to.equal(10000)
    })
  })
})