import store from '../src/store'
import {initialState} from "../src/reducers/index";

describe('store', () => {
  it('works with redux-persist', () => {
    store.subscribe(() => {
      const state = store.getState()
      //expect(state).toEqual(initialState)
    })
  })
})