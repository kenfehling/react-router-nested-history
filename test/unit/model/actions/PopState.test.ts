import State from '../../../../src/model/State'
import * as fixtures from '../../fixtures'
import PopState from '../../../../src/model/actions/PopState'
import {HistoryStack} from '../../../../src/model/Pages'
import {expect} from 'chai'
import Page from '../../../../src/model/Page'
import PushStep from '../../../../src/model/steps/PushStep'
import BackStep from '../../../../src/model/steps/BackStep'
declare const describe:any
declare const it:any

describe('PopState action', () => {
  const baseState:State = fixtures.loadedSimpleState

  describe('reduce', () => {
    it('shifts the state to reflect the new browser history', () => {
      const action:PopState = new PopState({
        n: -1,
        time: 10
      })
      const newState:State = action.reduce(baseState)
      const h:HistoryStack = newState.browserHistory

      expect(h.back.length).to.equal(0)
      expect(h.current).to.deep.equal(newState.getZeroPage())
      expect(h.forward.length).to.equal(1)
      expect(h.forward[0].url).to.equal('/a')
    })
  })

  describe('addSteps', () => {
    it('does nothing when you pop back to the zero page', () => {
      const action:PopState = new PopState({
        n: -1,
        time: 5000
      })
      expect(action.addSteps([], baseState)).to.deep.equal([])
    })

    it('diffs history to create steps', () => {
      const container1page:Page = new Page({
        url: '/a/1',
        params: {id: '1'},
        groupName: 'Group 1',
        containerName: 'Container 1'
      })
      const container2page:Page = new Page({
        url: '/b/1',
        params: {id: '1'},
        groupName: 'Group 1',
        containerName: 'Container 2'
      })
      const state:State = baseState
          .push(container1page, 5000)
          .switchToContainer({groupName: 'Group 1', name: 'Container 2', time: 7500})
          .push(container2page, 10000)
      const action:PopState = new PopState({
        n: -2,
        time: 15000
      })
      expect(action.addSteps([], state)).to.deep.equal([
        new BackStep(),
        new PushStep(new Page({
          url: '/a/1',
          params: {id: '1'},
          groupName: 'Group 1',
          containerName: 'Container 1'
        }))
      ])
    })
  })

})