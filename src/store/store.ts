import {serialize, deserialize} from './serializer'
import Action from './Action'
import * as R from 'ramda'
import * as store from 'store'
import ClearActions from './actions/ClearActions'
import IUpdateData from './IUpdateData'
import IState from './IState'
import ISerialized from './ISerialized'

export interface Store<S extends IState, A extends Action> {
  dispatch: (action:Action) => void
  subscribe: (listener:()=>void) => () => void
  getState: () => IUpdateData<S, A>
}

export function deriveState<S extends IState>(actions:Action[], state:S):S {
  return actions.reduce((s: S, a: Action): S => a.reduce(s), state)
}

export function createStore<S extends IState, A extends Action>(
    {loadFromPersist=false, initialState}:
      {loadFromPersist:boolean, initialState:S}) {
  let actions: A[] = []
  let storedState: S = initialState
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

  function updateListeners():void {
    listeners.forEach(fn => fn())
  }

  function init():void {
    if (loadFromPersist) {
      loadActions()
    }
    else {
      clearActions()
    }
  }

  function _dispatch(action:Action):void {
    actions = action.store(actions)
    if (action instanceof ClearActions) {
      timeStored = 0
      storedState = initialState
    }
    updateListeners()
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
  function getState():IUpdateData<S, A> {
    if (actions.length === 0) {
      return {
        state: initialState,
        actions: []
      }
    }
    else {
      const lastTime:number = R.last(actions).time
      const prevTime:number = actions.length > 1 ?
        R.takeLast(2, actions)[0].time : lastTime
      if (lastTime === prevTime && prevTime === timeStored) { // Rare case
        storedState = deriveState(actions, initialState)      // Just derive all
      }
      else {
        const newActions:Action[] = actions.filter(a => a.time > timeStored)
        storedState = deriveState(newActions, storedState)
        timeStored = lastTime
      }
      return {
        state: storedState,
        actions: actions
      }
    }
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

  init()
  
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer: () => { throw new Error('Not implemented') }
  }
}