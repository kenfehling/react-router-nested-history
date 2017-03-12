import Action, {SYSTEM} from '../BaseAction'
import State from '../State'
import NonStepAction from './NonStepAction'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Startup extends NonStepAction {
  static readonly type: string = 'Startup'
  readonly type: string = Startup.type
  readonly fromRefresh: boolean

  constructor({time, fromRefresh=false}:{time?:number, fromRefresh?:boolean}={}) {
    super({time, origin: SYSTEM})
    this.fromRefresh = fromRefresh
  }

  reduce(state:State):State {
    return state.assign({
      loadedFromRefresh: this.fromRefresh,
      lastUpdate: this.fromRefresh ? this.time : state.lastUpdate
    })
  }

  store(actions:Action[]):Action[] {
    if (this.fromRefresh) {
      return actions
    }
    else {
      return super.store(actions)
    }
  }
}