import State from '../State'
import NonStepAction from './NonStepAction'
import {Serializable} from '../../util/serializer'

@Serializable
export default class UpdateBrowser extends NonStepAction {
  static readonly type: string = 'UpdateBrowser'
  readonly type: string = UpdateBrowser.type

  reduce(state:State):State {
    return new State({
      ...state,
      lastUpdate: this.time
    })
  }
}