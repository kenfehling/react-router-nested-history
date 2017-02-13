import Action from '../Action'
import State from '../State'
import R = require('ramda')
import Step from '../interfaces/Step'
import {Serializable} from '../../util/serializer'

@Serializable
export default class LoadFromUrl extends Action {
  readonly url: string
  readonly fromRefresh: boolean

  constructor({time, url, fromRefresh=false}:
      {time?:number, url:string, fromRefresh?:boolean}) {
    super({time})
    this.url = url
    this.fromRefresh = fromRefresh
  }

  reduce(state:State):State {
    return this.fromRefresh ? state : state.loadFromUrl(this.url, this.time)
  }

  addSteps(steps:Step[], state:State):Step[] {
    return this.fromRefresh ? [] : super.addSteps(steps, state)
  }
}