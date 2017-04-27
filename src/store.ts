import {createStore as origCreateStore} from './store/store'
import {Store as ReduxStore} from 'redux'
import {Store as OrigStore} from './store/store'
import State from './model/State'
import Action from './model/Action'
import UpdateBrowser from './model/actions/UpdateBrowser'
import ComputedState from './model/ComputedState'

export type Store = OrigStore<State, Action, ComputedState>

export function createStore({loadFromPersist=false, regularReduxStore}:
    {loadFromPersist?:boolean, regularReduxStore?:ReduxStore<any>}) {
  let oldState:State = new State()
  let lastUpdate:number = 0

  const store = origCreateStore<State, Action, ComputedState>({
    loadFromPersist,
    initialState: new State(),
    regularReduxStore
  })

  function dispatch(action:Action):void {
    if (action instanceof UpdateBrowser) {
      oldState = store.getRawState()
      lastUpdate = action.time
    }
    store.dispatch(action)
  }

  function getState():ComputedState {
    return {
      ...store.getState(),
      oldState,
      newActions: store.getState().actions.filter(a => a.time > lastUpdate)
    }
  }

  return {
    ...store,
    dispatch,
    getState
  }
}