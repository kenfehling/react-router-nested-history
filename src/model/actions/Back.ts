import State from '../State'
import Serializable from '../../store/decorators/Serializable'
import ShiftAction from './ShiftAction'

@Serializable
export default class Back extends ShiftAction {
  static readonly type: string = 'Back'
  readonly type: string = Back.type

  fn(state:State) {
    return state.back
  }
}