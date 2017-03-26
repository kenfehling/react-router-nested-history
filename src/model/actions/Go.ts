import State from '../State'
import Serializable from '../../store/decorators/Serializable'
import ShiftAction from './ShiftAction'

@Serializable
export default class Go extends ShiftAction {
  static readonly type: string = 'Go'
  readonly type: string = Go.type

  fn(state:State) {
    return state.go
  }
}