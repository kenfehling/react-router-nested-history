import {Serializable} from '../util/serializer'
import * as R from 'ramda'

@Serializable
export default class Page {
  static readonly type: string = 'Page'
  readonly type: string = Page.type
  readonly url: string
  readonly params: Object
  readonly groupName: string
  readonly containerName: string
  readonly isZeroPage: boolean

  constructor({url, params, groupName, containerName, isZeroPage=false}:
      {url:string, params:Object, groupName:string, containerName:string,
        isZeroPage?:boolean}) {
    this.url = url
    this.params = params
    this.containerName = containerName
    this.groupName = groupName
    this.isZeroPage = isZeroPage
  }

  get state():Object {
    return {
      url: this.url,
      groupName: this.groupName,
      containerName: this.containerName,
      isZeroPage: this.isZeroPage
    }
  }

  equals(other:Page):boolean {
    return R.equals(this.state, other.state)
  }
}