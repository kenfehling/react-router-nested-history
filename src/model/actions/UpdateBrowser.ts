import IState from '../IState'
import NonStepAction from './NonStepAction'
import {Serializable} from '../../util/serializer'

@Serializable
export default class UpdateBrowser extends NonStepAction {
  static readonly type: string = 'UpdateBrowser'
  readonly type: string = UpdateBrowser.type

  reduce(state:IState):IState {
    return state.assign({
      lastUpdate: this.time
    })
  }
}