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
  readonly createdAt: number
  readonly firstVisited: number
  readonly lastVisited: number
  readonly isZeroPage: boolean

  constructor({createdAt=0, url, params, groupName, containerName,
      firstVisited=0, lastVisited=firstVisited, isZeroPage=false}:
      {createdAt?:number, url:string, params:Object, groupName:string,
        containerName:string, firstVisited?:number, lastVisited?:number,
          isZeroPage?:boolean}) {
    this.createdAt = createdAt
    this.url = url
    this.params = params
    this.firstVisited = firstVisited
    this.lastVisited = lastVisited
    this.containerName = containerName
    this.groupName = groupName
    this.isZeroPage = isZeroPage
  }

  static createZeroPage(url:string) {
    return new Page({
      url,
      params: {},
      groupName: '',
      containerName: '',
      isZeroPage: true,
      firstVisited: -1,
      createdAt: -1
    })
  }

  get state():Object {
    return {
      url: this.url,
      groupName: this.groupName,
      containerName: this.containerName,
      isZeroPage: this.isZeroPage,
      createdAt: this.createdAt
    }
  }

  touch(time:number):Page {
    return new Page({
      ...Object(this),
      lastVisited: time
    })
  }

  equals(other:Page):boolean {
    return R.equals(this.state, other.state)
  }
}