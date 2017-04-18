import * as _ from 'lodash'
import Serializable from '../store/decorators/Serializable'

@Serializable
export default class Page {
  static readonly type: string = 'Page'
  readonly type: string = Page.type
  readonly url: string
  readonly params: Object
  readonly container: string
  readonly group: string
  readonly isZeroPage: boolean

  constructor({url, params, container, group, isZeroPage=false}:
      {url:string, params:Object, container:string, group:string,
        isZeroPage?:boolean}) {
    this.url = url
    this.params = params
    this.container = container
    this.group = group
    this.isZeroPage = isZeroPage
  }

  get state():Object {
    return this.isZeroPage ? {
      isZeroPage: this.isZeroPage
    } : {
      url: this.url,
      container: this.container,
      group: this.group,
      isZeroPage: this.isZeroPage
    }
  }

  equals(other:Page):boolean {
    return _.isEqual(this.state, other.state)
  }
}