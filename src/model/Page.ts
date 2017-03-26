import * as R from 'ramda'
import Serializable from '../store/decorators/Serializable'

@Serializable
export default class Page {
  static readonly type: string = 'Page'
  readonly type: string = Page.type
  readonly url: string
  readonly params: Object
  readonly containerName: string
  readonly isZeroPage: boolean

  constructor({url, params, containerName, isZeroPage=false}:
      {url:string, params:Object, containerName:string, isZeroPage?:boolean}) {
    this.url = url
    this.params = params
    this.containerName = containerName
    this.isZeroPage = isZeroPage
  }

  get state():Object {
    return {
      url: this.url,
      containerName: this.containerName,
      isZeroPage: this.isZeroPage
    }
  }

  equals(other:Page):boolean {
    return R.equals(this.state, other.state)
  }
}