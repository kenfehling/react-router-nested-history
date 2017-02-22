import IState from '../../../../src/model/IState'
import * as fixtures from '../../fixtures'
import PopState from '../../../../src/model/actions/PopState'
import HistoryStack from '../../../../src/model/HistoryStack'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('PopState action', () => {
  const baseState:IState = fixtures.loadedSimpleState

  describe('reduce', () => {
    it('shifts the state to reflect the new browser history', () => {
      const action:PopState = new PopState({
        n: -1,
        time: 10
      })
      const newState:IState = action.reduce(baseState)
      const h:HistoryStack = newState.browserHistory

      expect(h.back.length).toBe(0)
      expect(h.current).toEqual(newState.getZeroPage())
      expect(h.forward.length).toBe(1)
      expect(h.forward[0].url).toBe('/a')
    })
  })

  describe('addSteps', () => {
    it('does nothing when you pop back to the zero page', () => {
      const action:PopState = new PopState({
        n: -1,
        time: 10
      })
      expect(action.addSteps([], baseState)).toEqual([])
    })
  })

})