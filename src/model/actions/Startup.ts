import Action, {SYSTEM} from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'
import NonStepAction from './NonStepAction'
import SetZeroPage from './SetZeroPage'

@Serializable
export default class Startup extends NonStepAction {
  static readonly type: string = 'Startup'
  readonly type: string = Startup.type
  readonly fromRefresh: boolean

  constructor({time, fromRefresh=false}:{time?:number, fromRefresh?:boolean}={}) {
    super({time, origin: SYSTEM})
    this.fromRefresh = fromRefresh
  }

  updateAfterRefresh(time:number):Startup {
    return new Startup({...Object(this), time, fromRefresh: true})
  }

  reduce(state:IState):IState {
    return state.assign({
      loadedFromRefresh: this.fromRefresh,
      lastUpdate: this.fromRefresh ? this.time : state.lastUpdate
    })
  }

  store(actions:Action[]):Action[] {
    if (this.fromRefresh) {
      return [...actions.map(a => a.updateAfterRefresh(this.time))]
    }
    else {
      if (actions.length > 0 && actions[0] instanceof SetZeroPage) {
        return [actions[0], this]
      }
      else {
        return [this]
      }
    }
  }
}