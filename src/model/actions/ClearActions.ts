import NonStepAction from './NonStepAction'
import {Serializable} from '../../util/serializer'
import Action from '../BaseAction'

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

  store(actions:Action[]):Action[] {
    return []
  }
}