import {serialize, ISerialized, deserialize} from './util/serializer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { autoRehydrate, persistStore } from 'redux-persist'
import reducer from './reducers'
import { canUseWindowLocation } from './util/location'
import {Store} from 'react-redux'
import ReduxState from './model/interfaces/ReduxState'
import Action from './model/Action'
import * as R from 'ramda'
import LoadFromUrl from './model/actions/LoadFromUrl'
import InitializedState from './model/InitializedState'
import UninitializedState from './model/UninitializedState'
import IState from './model/IState'
declare const setTimeout

const store:Store<ReduxState> = canUseWindowLocation ?
    compose(
        autoRehydrate<ReduxState>(),  // Does order matter?
        applyMiddleware(thunk),
    )(createStore)(reducer) :
    createStore(reducer, applyMiddleware(thunk))

class S {
  storedState: IState
  timeStored: number

  subscribe(fn) {
    return store.subscribe(fn)
  }

  getReduxState():ReduxState {
    return store.getState()
  }

  getActions():Action[] {
    return this.getReduxState().actions.map(obj => deserialize(obj))
  }

  deriveState(actions:Action[], state:IState=new UninitializedState()):IState {
    return actions.reduce((s:IState, a:Action):IState => a.reduce(s), state)
  }

  /**
   * Derives the state from the list of actions
   * Caches the last derived state for performance
   */
  getState():IState {
    const actions:Action[] = this.getActions()
    if (actions.length === 0) {
      return new UninitializedState()
    }
    else {
      const lastTime:number = R.last(actions).time
      if (lastTime === this.timeStored) {             // Very rare case
        this.storedState = this.deriveState(actions)  // Just derive everything
      }
      else {
        const newActions:Action[] = actions.filter(a => a.time > this.timeStored)
        this.storedState = this.deriveState(newActions, this.storedState)
      }
      this.timeStored = lastTime
      return this.storedState
    }
  }

  getLastAction():Action {
    return R.last(this.getActions())
  }

  getLastUpdate():number {
    return this.getState().lastUpdate
  }

  // Convert into a plain object for Redux
  // It gets converted back to an Action object in the reducer
  dispatch(action:Action):Promise<IState> {
    const obj:ISerialized = serialize(action)
    store.dispatch(obj)
    const state:IState = this.getState()
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