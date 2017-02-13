import NonStepAction from './NonStepAction'
import State from '../State'
import Page from '../Page'
import {Serializable} from '../../util/serializer'

@Serializable
export default class SetZeroPage extends NonStepAction {
  readonly url: string|null

  constructor({time, url}:{time?:number, url:string|null}) {
    super({time})
    this.url = url
  }

  reduce(state:State):State {
    return new State({
      ...Object(state),
      zeroPage: this.url ? Page.createZeroPage(this.url) : null
    })
  }
}