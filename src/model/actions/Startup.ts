import Action from '../Action'
import State from '../State'
import {
  Serializable, deserialize, serialize,
  ISerialized
} from '../../util/serializer'
import ReduxState from '../interfaces/ReduxState'
import NonStepAction from './NonStepAction'
import SetZeroPage from './SetZeroPage'

@Serializable
export default class Startup extends NonStepAction {
  readonly fromRefresh: boolean

  constructor({time, fromRefresh=false}:{time?:number, fromRefresh?:boolean}={}) {
    super({time})
    this.fromRefresh = fromRefresh
  }

  reduce(state:State):State {
    return new State({
      ...Object(state),
      loadedFromRefresh: this.fromRefresh,
      lastUpdate: this.fromRefresh ? this.time : state.lastUpdate
    })
  }

  store(state: ReduxState): ReduxState {
    const actions:Action[] = state.actions.map(obj => deserialize(obj))
    if (this.fromRefresh) {
      return {
        ...Object(state),
        actions: [
          ...actions.map((action:Action) => {
            const obj:ISerialized = serialize(action)

            // TODO: This gets around the type system, make it nicer?
            if (obj['fromRefresh'] === false) {
              obj['fromRefresh'] = true
            }
            obj['time'] = this.time
            return obj
          })
        ]
      }
    }
    else {
      if (actions.length > 0 && actions[0] instanceof SetZeroPage) {
        return {
          ...Object(state),
          actions: [serialize(actions[0]), serialize(this)]
        }
      }
      else {
        return {
          ...Object(state),
          actions: [serialize(this)]
        }
      }
    }
  }
}