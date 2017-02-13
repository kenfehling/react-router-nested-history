import {serialize, ISerialized, deserialize} from './util/serializer'
declare const setTimeout
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { autoRehydrate, persistStore } from 'redux-persist'
import reducer from './reducers'
import { canUseWindowLocation } from './util/location'
import {Store} from 'react-redux'
import ReduxState from './model/interfaces/ReduxState'
import State from './model/State'
import Action from './model/Action'
import * as R from 'ramda'

const store:Store<ReduxState> = canUseWindowLocation ?
    compose(
        autoRehydrate<ReduxState>(),  // Does order matter?
        applyMiddleware(thunk),
    )(createStore)(reducer) :
    createStore(reducer, applyMiddleware(thunk))

class S {
  subscribe(fn) {
    return store.subscribe(fn)
  }

  getReduxState():ReduxState {
    return store.getState()
  }

  getActions():Action[] {
    return this.getReduxState().actions.map(obj => deserialize(obj))
  }

  deriveState(actions:Action[]):State {
    const state:State = new State()
    return actions.reduce((s:State, a:Action):State => a.reduce(s), state)
  }

  getState():State {
    return this.deriveState(this.getActions())
  }

  getLastAction():Action {
    return R.last(this.getActions())
  }

  getLastUpdate():number {
    return this.getState().lastUpdate
  }

  // Convert into a plain object for Redux
  // It gets converted back to an Action object in the reducer
  dispatch(action:Action):Promise<State> {
    const obj:ISerialized = serialize(action)
    store.dispatch(obj)
    const state:State = this.getState()
    return new Promise(resolve => resolve(state))
  }

  persist(persistorConfig):Promise<any> {
    if (canUseWindowLocation) {
      return new Promise((resolve) =>
          persistStore(store, persistorConfig, () => resolve()))
    }
    else {
      return Promise.resolve()
    }
  }

  get store() {
    return store
  }
}

export default new S()