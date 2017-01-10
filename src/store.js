import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { autoRehydrate, persistStore } from 'redux-persist'
import reducer, {initialState} from './reducers'
import { canUseWindowLocation } from './util/location'

export default canUseWindowLocation ?
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )(createStore)(reducer) :
    createStore(reducer, applyMiddleware(thunk))

export const persist = (store, persistorConfig, onComplete) => {
  if (canUseWindowLocation) {
    persistStore(store, persistorConfig, onComplete)
  }
  else {
    setTimeout(onComplete, 1000)  // for testing
  }
}