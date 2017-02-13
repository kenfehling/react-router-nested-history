import ReduxState from '../interfaces/ReduxState'
import NonStepAction from './NonStepAction'
import {Serializable} from '../../util/serializer'

/**
 * Only for testing purposes
 */
@Serializable
export default class ClearActions extends NonStepAction {

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