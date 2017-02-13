import Comparable from './interfaces/Comparable'
import {Serializable} from '../util/serializer'
import * as R from 'ramda'

@Serializable
export default class Page implements Comparable {
  readonly url: string
  readonly params: Object
  readonly groupName: string
  readonly containerName: string
  readonly firstVisited: number
  readonly lastVisited: number
  readonly isZeroPage: boolean

  constructor({url, params, groupName, containerName,
      firstVisited=0, lastVisited=0, isZeroPage=false}:
      {url:string, params:Object, groupName:string, containerName:string,
        firstVisited?:number, lastVisited?:number, isZeroPage?:boolean}) {
    this.url = url
    this.params = params
    this.firstVisited = firstVisited
    this.lastVisited = Math.max(firstVisited, lastVisited)
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
      isZeroPage: true
    })
  }

  get state():Object {
    return {
      url: this.url,
      groupName: this.groupName,
      containerName: this.containerName,
      isZeroPage: this.isZeroPage
    }
  }

  touch(time:number):Page {
    return new Page({
      ...Object(this),
      firstVisited: this.firstVisited === 0 ? time : this.firstVisited,
      lastVisited: time
    })
  }

  compareTo(other:Page):number {
    return other.lastVisited - this.lastVisited
  }

  equals(other:Page):boolean {
    return R.equals(this.state, other.state)
  }
}