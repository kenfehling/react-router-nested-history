import State from '../../../../src/model/State'
import * as fixtures from '../../fixtures'
import PopState from '../../../../src/model/actions/PopState'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('PopState action', () => {
  const baseState:State = fixtures.simpleState

  describe('reduce', () => {
    it('shifts the state to reflect the new browser history', () => {
      const action:PopState = new PopState({
        page: baseState.getZeroPage(),
        time: 10
      })
      const newState:State = action.reduce(baseState)
      expect(newState.browserHistory.back.length).toBe(0)
      expect(newState.browserHistory.current).toEqual(newState.getZeroPage())
      expect(newState.browserHistory.forward.length).toBe(1)
      expect(newState.browserHistory.forward[0].url).toBe('/a')
    })
  })

  describe('addSteps', () => {
    it('does nothing when you pop back to the zero page', () => {
      const action:PopState = new PopState({
        page: baseState.getZeroPage(),
        time: 10
      })
      expect(action.addSteps([], baseState)).toEqual([])
    })
  })

})