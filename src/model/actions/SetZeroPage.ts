import NonStepAction from './NonStepAction'
import {SYSTEM} from '../Action'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class SetZeroPage extends NonStepAction {
  static readonly type: string = 'SetZeroPage'
  readonly type: string = SetZeroPage.type
  readonly url: string|undefined

  constructor({time, url}:{time?:number, url:string|undefined}) {
    super({time, origin: SYSTEM})
    this.url = url
  }

  reduce(state:State):State {
    return state.assign({
      zeroPage: this.url
    })
  }
}