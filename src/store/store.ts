import {serialize, deserialize} from './serializer'
import Action from './Action'
import * as R from 'ramda'
import * as store from 'store'
import ClearActions from './actions/ClearActions'
import IState from './IState'
import ISerialized from './ISerialized'
import IComputedState from './IComputedState'

export interface Store<S extends IState, A extends Action, C extends IComputedState> {
  dispatch: (action:Action) => void
  subscribe: (listener:()=>void) => () => void
  getState: () => C

  getRawState: () => S  // For unit tests
}

export function deriveState<S extends IState>(actions:Action[], state:S):S {
  return actions.reduce((s: S, a: Action): S => a.reduce(s), state)
}

export function createStore<S extends IState, A extends Action, C extends IComputedState>(
    {loadFromPersist=false, initialState}:
      {loadFromPersist:boolean, initialState:S}) {
  let actions: A[] = []
  let storedRawState: S = initialState
  let storedComputedState:IComputedState = { actions: [] }
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

  function init():void {
    if (loadFromPersist) {
      loadActions()
    }
    else {
      clearActions()
    }
  }

  function _dispatch(action:A):void {
    actions = action.store(actions)
    if (action instanceof ClearActions) {
      timeStored = 0
      storedRawState = initialState
    }
    else {
      recomputeState()
      if (storedRawState.isInitialized) {
        updateListeners()
      }
    }
    if (store.enabled) {  // if can use localStorage
      store.set('actions', actions.map(a => serialize(a)))
    }
  }

  function dispatch(action:A):void {
    const state:S = getRawState()
    const as:A[] = action.filter(state) as A[]
    as.forEach(a => (a === action ? _dispatch : dispatch)(a))
  }

  /**
   * Derives the state from the list of actions
   * Caches the last derived state for performance
   */
  function getRawState():S {
    if (actions.length === 0) {
      return initialState
    }
    else {
      const lastTime:number = R.last(actions).time
      const prevTime:number = actions.length > 1 ?
        R.takeLast(2, actions)[0].time : lastTime
      if (lastTime === prevTime && prevTime === timeStored) { // Rare case
        storedRawState = deriveState(actions, initialState)      // Just derive all
      }
      else {
        const newActions:Action[] = actions.filter(a => a.time > timeStored)
        storedRawState = deriveState(newActions, storedRawState)
        timeStored = lastTime
      }
    }
    return storedRawState
  }

  function recomputeState() {
    const rawState:S = getRawState()
    if (rawState.isInitialized) {
      storedComputedState = rawState.computeState()
    }
  }


  function getState():C {
    return {
      ...Object(storedComputedState),
      isInitialized: storedRawState.isInitialized,
      actions
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

  function clearActions():void {
    if (store.enabled) {
      actions = []
    }
  }

  function updateListeners():void {
    listeners.forEach(fn => fn())
  }

  init()
  
  return {
    dispatch,
    subscribe,
    getState,
    getRawState,  // For unit tests
    replaceReducer: () => { throw new Error('Not implemented') }
  }
}