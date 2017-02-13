import HistoryStack from '../../../src/model/HistoryStack'
import Page from '../../../src/model/Page'
import {diffHistory, diffToSteps} from '../../../src/util/reconciler'
import BackStep from '../../../src/model/steps/BackStep'
import PushStep from '../../../src/model/steps/PushStep'
import HistoryDiff from '../../../src/model/HistoryDiff'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('reconciler', () => {
  const zero:Page = new Page({
    url: '/a',
    params: {},
    groupName: '',
    containerName: '',
    isZeroPage: true
  })
  const a:Page = new Page({
    url: '/a',
    params: {},
    groupName: 'Group 1',
    containerName: 'Container 1'
  })
  const a1:Page = new Page({
    url: '/a/1',
    params: {id: '1'},
    groupName: 'Group 1',
    containerName: 'Container 1'
  })
  const a2:Page = new Page({
    url: '/a/2',
    params: {id: '2'},
    groupName: 'Group 1',
    containerName: 'Container 1'
  })
  const b:Page = new Page({
    url: '/b',
    params: {},
    groupName: 'Group 1',
    containerName: 'Container 2'
  })

  describe('diffHistory', () => {
    it('returns all same if histories are identical', () => {
      const h1:HistoryStack = new HistoryStack({
        back: [zero],
        current: a,
        forward: [b]
      })
      expect(diffHistory(h1, h1)).toEqual(new HistoryDiff({
        same: [zero, a, b],
        oldCurrentIndex: 1,
        newCurrentIndex: 1
      }))
    })

    it('returns an added item', () => {
      const h1:HistoryStack = new HistoryStack({
        back: [zero],
        current: a,
        forward: []
      })
      const h2:HistoryStack = new HistoryStack({
        back: [zero, a],
        current: b,
        forward: []
      })
      expect(diffHistory(h1, h2)).toEqual(new HistoryDiff({
        same: [zero, a],
        added: [b],
        oldCurrentIndex: 1,
        newCurrentIndex: 2
      }))
    })

    it('returns adds for h2 if h1 is blank', () => {
      const h2:HistoryStack = new HistoryStack({
        back: [zero],
        current: a,
        forward: []
      })
      expect(diffHistory(null, h2)).toEqual(new HistoryDiff({
        added: [zero, a],
        oldCurrentIndex: 0,
        newCurrentIndex: 1
      }))
    })

    it('removes forward history', () => {
      const h1:HistoryStack = new HistoryStack({
        back: [zero, a],
        current: a1,
        forward: [b]
      })
      const h2:HistoryStack = new HistoryStack({
        back: [zero, a],
        current: a1,
        forward: []
      })
      expect(diffHistory(h1, h2)).toEqual(new HistoryDiff({
        same: [zero, a, a1],
        removed: [b],
        oldCurrentIndex: 2,
        newCurrentIndex: 2
      }))
    })
  })

  describe('diffToSteps', () => {
    it('removes forward history', () => {
      const diff:HistoryDiff = new HistoryDiff({
        same: [zero, a, a1],
        removed: [b],
        oldCurrentIndex: 2,
        newCurrentIndex: 2
      })
      expect(diffToSteps(diff)).toEqual([
        new BackStep(),
        new PushStep(a1)
      ])
    })

    it('keeps default container as a back page', () => {
      const diff:HistoryDiff = new HistoryDiff({
        same: [zero, a],
        removed: [a1],
        added: [b],
        oldCurrentIndex: 1,
        newCurrentIndex: 2
      })
      expect(diffToSteps(diff)).toEqual([
        new PushStep(b)
      ])
    })

    it('does a PUSH after a TOP', () => {
      const diff:HistoryDiff = new HistoryDiff({
        same: [zero, a],
        removed: [a1, a2],
        added: [b],
        oldCurrentIndex: 1,
        newCurrentIndex: 2
      })
      expect(diffToSteps(diff)).toEqual([
        new PushStep(b)
      ])
    })
  })

  describe('diffStateToSteps', () => {

  })
})