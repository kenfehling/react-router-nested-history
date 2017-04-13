import NonStepAction from './NonStepAction'
import {SYSTEM} from '../Action'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class UpdateBrowser extends NonStepAction {
  static readonly type: string = 'UpdateBrowser'
  readonly type: string = UpdateBrowser.type

  constructor({time}:{time?:number}={}) {
    super({time, origin: SYSTEM})
  }
}