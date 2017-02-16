import IState from '../IState'
import {Serializable} from '../../util/serializer'
import PageAction from './PageAction'

@Serializable
export default class Push extends PageAction {
  static readonly type: string = 'Push'
  readonly type: string = Push.type

  reduce(state:IState):IState {
    return state.push(this.page)
  }
}