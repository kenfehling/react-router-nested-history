import State from '../State'
import NonStepAction from './NonStepAction'
import {SYSTEM} from '../BaseAction'
import {Serializable} from '../../util/serializer'

@Serializable
export default class UpdateBrowser extends NonStepAction {
  static readonly type: string = 'UpdateBrowser'
  readonly type: string = UpdateBrowser.type

  constructor({time}:{time?:number}={}) {
    super({time, origin: SYSTEM})
  }

  reduce(state:State):State {
    return state.assign({
      lastUpdate: this.time
    })
  }
}