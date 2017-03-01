import {serialize, deserialize, ISerialized} from './util/serializer'
import Action from './model/Action'
import * as R from 'ramda'
import UninitializedState from './model/UninitializedState'
import IState from './model/IState'
import * as store from 'store'
import ClearActions from './model/actions/ClearActions'
import UpdateBrowser from './model/actions/UpdateBrowser'
import IUpdateData from './model/interfaces/IUpdateData'
import * as browser from './util/browserFunctions'

export interface Store {
  dispatch: (action:Action) => void
  subscribe: (listener:()=>void) => () => void
  getState: () => IUpdateData
}

export const deriveState = (actions:Action[],
                            state:IState=new UninitializedState()):IState =>
  actions.reduce((s:IState, a:Action):IState => a.reduce(s), state)

export function createStore() {
  let actions: Action[] = []
  let storedState: IState
  let timeStored: number = 0
  let listeners: (() => void)[] = []

  function loadActions():void {
    if (store.enabled) {
      const objects:ISerialized[] = store.get('actions')
      if (objects) {
        actions = objects.map(obj => deserialize(obj))
      }
    }
  }

  function clearActions():void {
    if (store.enabled) {
      actions = []
    }
  }

  function _dispatch(action:Action):void {
    actions = action.store(actions)
    if (action instanceof ClearActions) {
      timeStored = 0
      storedState = new UninitializedState()
    }
    listeners.forEach(fn => fn())
    if (store.enabled) {  // if can use localStorage
      store.set('actions', actions.map(a => serialize(a)))
    }
  }

  function dispatch(action:Action):void {
    const state = getState()
    const as:Action[] = action.filter(state.state)
    as.forEach(a => (a === action ? _dispatch : dispatch)(a))
  }

  /**
   * Derives the state from the list of actions
   * Caches the last derived state for performance
   */
  function getState():IUpdateData {
    if (actions.length === 0) {
      return {
        state: new UninitializedState(),
        lastAction: getLastAction(),
        actions: []
      }
    }
    else {
      const lastTime:number = R.last(actions).time
      const prevTime:number = actions.length > 1 ?
        R.takeLast(2, actions)[0].time : lastTime
      if (lastTime === prevTime && prevTime === timeStored) {  // Rare case
        storedState = deriveState(actions)     // Just derive all
      }
      else {
        const newActions:Action[] =
          actions.filter(a => a.time > timeStored)
        storedState = deriveState(newActions, storedState)
        timeStored = lastTime
      }
      return {
        state: storedState,
        lastAction: getLastAction(),
        actions: actions
      }
    }
  }

  function getLastAction():Action {
    return R.last(actions.filter(a => !(a instanceof UpdateBrowser)))
  }
  
  function subscribe(listener:()=>void):()=>void {
    listeners.push(listener)
    const index = listeners.indexOf(listener)
    return () => {  // unsubscribe
      listeners = [
        ...listeners.slice(0, index),
        ...listeners.slice(index + 1)
      ]
    }
  }
  
  if (browser.wasLoadedFromRefresh) {
    loadActions()
  }
  else {
    clearActions()
  }
  
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer: () => { throw new Error('Not implemented') }
  }
}