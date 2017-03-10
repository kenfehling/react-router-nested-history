import Action, {SYSTEM} from '../BaseAction'
import State from '../State'
import Step from '../Step'
import {Serializable} from '../../util/serializer'
import UninitializedState from '../UninitializedState'
import InitializedState from '../InitializedState'
import Group from '../Group'

const load = (state:UninitializedState, url:string, time:number):InitializedState =>
    new InitializedState(state.groups.reduce((s:State, group:Group):State =>
        s.replaceGroup(group.loadFromUrl(url, time)), state))

@Serializable
export default class LoadFromUrl extends Action {
  static readonly type: string = 'LoadFromUrl'
  readonly type: string = LoadFromUrl.type
  readonly url: string
  readonly fromRefresh: boolean

  constructor({time, url, fromRefresh=false}:
      {time?:number, url:string, fromRefresh?:boolean}) {
    super({time, origin: SYSTEM})
    this.url = url
    this.fromRefresh = fromRefresh
  }

  updateAfterRefresh(time:number):LoadFromUrl {
    return new LoadFromUrl({...Object(this), time, fromRefresh: true})
  }

  reduce(state:UninitializedState):InitializedState {
    return this.fromRefresh ? new InitializedState(state) :
        load(state, this.url, this.time)
  }

  addSteps(steps:Step[], state:State):Step[] {
    return this.fromRefresh ? [] : super.addSteps(steps, state)
  }
}