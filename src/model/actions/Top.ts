import Action from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Top extends Action {
  static readonly type: string = 'Top'
  readonly type: string = Top.type
  readonly groupName: string
  readonly reset: boolean

  constructor({time, groupName, reset=false}:
      {time?:number, groupName:string, reset?:boolean}) {
    super({time})
    this.groupName = groupName
    this.reset = reset
  }

  reduce(state:IState):IState {
    return state.top({
      groupName: this.groupName,
      reset: this.reset,
      time: this.time,
    })
  }
}
