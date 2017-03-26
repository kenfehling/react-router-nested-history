import State from '../State'
import Serializable from '../../store/decorators/Serializable'
import ShiftAction from './ShiftAction'

@Serializable
export default class Forward extends ShiftAction {
  static readonly type: string = 'Forward'
  readonly type: string = Forward.type

  fn(state:State) {
    return state.forward
  }
}