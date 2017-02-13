import State from '../State'
import NonStepAction from './NonStepAction'
import {Serializable} from '../../util/serializer'

@Serializable
export default class UpdateBrowser extends NonStepAction {

  reduce(state:State):State {
    return new State({
      ...state,
      lastUpdate: this.time
    })
  }


}