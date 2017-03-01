import {serialize, deserialize, ISerialized} from './util/serializer'
import {Store as ReduxStore} from 'redux'
import Action from './model/Action'
import * as R from 'ramda'
import UninitializedState from './model/UninitializedState'
import IState from './model/IState'
import * as store from 'store'
import ClearActions from './model/actions/ClearActions'
import UpdateBrowser from './model/actions/UpdateBrowser'
import IUpdateData from './model/interfaces/IUpdateData'

export const deriveState = (actions:Action[],
                            state:IState=new UninitializedState()):IState =>
  actions.reduce((s:IState, a:Action):IState => a.reduce(s), state)

export class Store implements ReduxStore<IUpdateData> {
  actions: Action[]
  storedState: IState
  timeStored: number = 0
  listeners: (() => void)[] = []

  constructor() {
    this.actions = []
    this.timeStored = 0
  }

  loadActions():void {
    if (store.enabled) {
      const objects:ISerialized[] = store.get('actions')
      if (objects) {
        this.actions = objects.map(obj => deserialize(obj))
      }
    }
  }

  dispatch(action:Action):void {
    const state = this.getState()
    const actions:Action[] = action.filter(state.state)
    if (actions.length === 1 && actions[0] === action) {
      this.actions = action.store(this.actions)
      if (action instanceof ClearActions) {
        this.timeStored = 0
        this.storedState = new UninitializedState()
      }
      this.listeners.forEach(fn => fn())
      if (store.enabled) {  // if can use localStorage
        store.set('actions', this.actions.map(a => serialize(a)))
      }
    }
    else {
      actions.forEach(this.dispatch)
    }
  }

  /**
   * Derives the state from the list of actions
   * Caches the last derived state for performance
   */
  getState():IUpdateData {
    if (this.actions.length === 0) {
      return {
        state: new UninitializedState(),
        lastAction: this.getLastAction(),
        actions: []
      }
    }
    else {
      const lastTime:number = R.last(this.actions).time
      const prevTime:number = this.actions.length > 1 ?
          R.takeLast(2, this.actions)[0].time : lastTime
      if (lastTime === prevTime && prevTime === this.timeStored) {  // Rare case
        this.storedState = deriveState(this.actions)     // Just derive all
      }
      else {
        const newActions:Action[] =
            this.actions.filter(a => a.time > this.timeStored)
        this.storedState = deriveState(newActions, this.storedState)
        this.timeStored = lastTime
      }
      return {
        state: this.storedState,
        lastAction: this.getLastAction(),
        actions: this.actions
      }
    }
  }

  getLastAction():Action {
    return R.last(this.actions.filter(a => !(a instanceof UpdateBrowser)))
  }

  getLastUpdate():number {
    return this.getState().state.lastUpdate
  }

  subscribe(listener:()=>void):()=>void {
    this.listeners.push(listener)
    const index = this.listeners.indexOf(listener)
    return () => {  // unsubscribe
      this.listeners = [
        ...this.listeners.slice(0, index),
        ...this.listeners.slice(index)
      ]
    }
  }

  replaceReducer(nextReducer) {
    throw new Error('Not implemented')
  }
}

export const createStore = ():Store => {
  const store:Store = new Store()
  store.loadActions()
  return store
}

