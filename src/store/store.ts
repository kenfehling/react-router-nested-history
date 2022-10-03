import {serialize, deserialize} from './serializer'
import Action from './Action'
import * as takeRight from 'lodash/takeRight'
import * as last from 'lodash/last'
import * as store from 'store'
import ClearActions from './actions/ClearActions'
import IState from './IState'
import ISerialized from './ISerialized'
import IComputedState from './IComputedState'
import {Store as ReduxStore} from 'redux'

export interface Store<S extends IState, A extends Action, C extends IComputedState<A>> {
  dispatch: (action:Action) => void
  subscribe: (listener:()=>void) => () => void
  getState: () => C
  getRawState: () => S  // For unit tests
}

export function deriveState<S extends IState>(actions:Action[], state:S):S {
  return actions.reduce((s: S, a: Action): S => a.reduce(s), state)
}

export function createStore<S extends IState, A extends Action,
                            C extends IComputedState<A>>(
    {loadFromPersist=false, initialState, regularReduxStore}:
      {loadFromPersist?:boolean, initialState:S, regularReduxStore?:ReduxStore<any>}) {
  let actions: A[] = []
  let storedRawState: S = initialState
  let storedComputedState:IComputedState<A> = { actions: [] }
  let timeStored: number = 0
  let currentListeners:Function[] = []
  let nextListeners:Function[] = currentListeners

  if (regularReduxStore) {
    regularReduxStore.subscribe(updateListeners)
  }

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
      updateListeners()
    }
    if (store.enabled) {  // if can use localStorage
      store.set('actions', actions.map(a => serialize(a)))
    }
  }

  function dispatch(action:A):void {
    if (action instanceof Action) {  // it's a class object
      const state:S = getRawState()
      const as:A[] = action.filter(state) as A[]
      as.forEach(a => (a === action ? _dispatch : dispatch)(a))
    }
    else {  // it's a plain JS object meant for ordinary Redux
      if (regularReduxStore) {
        regularReduxStore.dispatch(action)
      }
      else {
        throw new Error(
            'No regular Redux store was created for plain JS object actions')
      }
    }
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
      const lastTime:number = last(actions).time
      const prevTime:number = actions.length > 1 ?
          takeRight(actions, 2)[0].time : lastTime
      if (lastTime === prevTime && prevTime === timeStored) { // Rare case
        storedRawState = deriveState(actions, initialState)   // Just derive all
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
      loadedFromPersist: loadFromPersist,
      actions,
      ...(regularReduxStore ? regularReduxStore.getState() : {})
    }
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function clearActions():void {
    if (store.enabled) {
      actions = []
    }
  }

  function updateListeners():void {
    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
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