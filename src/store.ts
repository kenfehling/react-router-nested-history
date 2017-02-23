import {serialize, deserialize, ISerialized} from './util/serializer'
import Action from './model/Action'
import * as R from 'ramda'
import UninitializedState from './model/UninitializedState'
import IState from './model/IState'
import * as store from 'store'
import ClearActions from './model/actions/ClearActions'
import UpdateBrowser from './model/actions/UpdateBrowser'

class Store {
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

  dispatch(action:Action) {
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

  deriveState(actions:Action[], state:IState=new UninitializedState()):IState {
    return actions.reduce((s:IState, a:Action):IState => a.reduce(s), state)
  }

  /**
   * Derives the state from the list of actions
   * Caches the last derived state for performance
   */
  getState():IState {
    if (this.actions.length === 0) {
      return new UninitializedState()
    }
    else {
      const lastTime:number = R.last(this.actions).time
      const prevTime:number = this.actions.length > 1 ?
          R.takeLast(2, this.actions)[0].time : lastTime
      if (lastTime === prevTime && prevTime === this.timeStored) {  // Rare case
        this.storedState = this.deriveState(this.actions)     // Just derive all
      }
      else {
        const newActions:Action[] =
            this.actions.filter(a => a.time > this.timeStored)
        this.storedState = this.deriveState(newActions, this.storedState)
        this.timeStored = lastTime
      }
      return this.storedState
    }
  }

  getLastAction():Action {
    return R.last(this.actions.filter(a => !(a instanceof UpdateBrowser)))
  }

  getLastUpdate():number {
    return this.getState().lastUpdate
  }

  subscribe(fn:()=>void):void {
    this.listeners.push(fn)
  }
}

export default new Store()