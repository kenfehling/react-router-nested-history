import State from '../State'
import {Serializable} from '../../util/serializer'
import PageAction from './PageAction'

@Serializable
export default class Push extends PageAction {

  reduce(state:State):State {
    return state.push(this.page)
  }
}