import { createStore } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import reducer, {initialState} from './reducers'
import { canUseWindowLocation } from './util/location'

export default canUseWindowLocation ?
    createStore(reducer, initialState, autoRehydrate()) :
    createStore(reducer)

export const persist = (store, persistorConfig, onComplete) => {
  if (canUseWindowLocation) {
    persistStore(store, persistorConfig, onComplete)
  }
  else {
    setTimeout(onComplete, 1000)  // for testing
  }
}