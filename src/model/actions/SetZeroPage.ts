import NonStepAction from './NonStepAction'
import IState from '../IState'
import Page from '../Page'
import {Serializable} from '../../util/serializer'

@Serializable
export default class SetZeroPage extends NonStepAction {
  static readonly type: string = 'SetZeroPage'
  readonly type: string = SetZeroPage.type
  readonly url: string|null

  constructor({time, url}:{time?:number, url:string|null}) {
    super({time})
    this.url = url
  }

  reduce(state:IState):IState {
    return state.assign({
      zeroPage: this.url ? Page.createZeroPage(this.url) : null
    })
  }
}