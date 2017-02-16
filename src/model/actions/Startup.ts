import Action from '../Action'
import IState from '../IState'
import {
  Serializable, deserialize, serialize,
  ISerialized
} from '../../util/serializer'
import ReduxState from '../interfaces/ReduxState'
import NonStepAction from './NonStepAction'
import SetZeroPage from './SetZeroPage'

@Serializable
export default class Startup extends NonStepAction {
  static readonly type: string = 'Startup'
  readonly type: string = Startup.type
  readonly fromRefresh: boolean

  constructor({time, fromRefresh=false}:{time?:number, fromRefresh?:boolean}={}) {
    super({time})
    this.fromRefresh = fromRefresh
  }

  reduce(state:IState):IState {
    return state.assign({
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