import ReduxState from '../interfaces/ReduxState'
import NonStepAction from './NonStepAction'
import {Serializable} from '../../util/serializer'

/**
 * Only for testing purposes
 */
@Serializable
export default class ClearActions extends NonStepAction {
  static readonly type: string = 'ClearActions'
  readonly type: string = ClearActions.type

  constructor({time}:{time?:number}={}) {
    super({time})
  }

  store(state:ReduxState):ReduxState {
    return {
      ...state,
      actions: []
    }
  }
}