import NonStepAction from './NonStepAction'
import {SYSTEM} from '../BaseAction'
import State from '../State'
import {Serializable} from '../../util/serializer'

@Serializable
export default class SetZeroPage extends NonStepAction {
  static readonly type: string = 'SetZeroPage'
  readonly type: string = SetZeroPage.type
  readonly url: string|null

  constructor({time, url}:{time?:number, url:string|null}) {
    super({time, origin: SYSTEM})
    this.url = url
  }

  reduce(state:State):State {
    return state.assign({
      zeroPage: this.url
    })
  }
}