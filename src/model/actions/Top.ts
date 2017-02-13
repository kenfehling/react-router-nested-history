import Action from '../Action'
import State from '../State'
import {Serializable} from '../../util/serializer'

@Serializable
export default class Top extends Action {
  readonly groupName: string
  readonly reset: boolean

  constructor({time, groupName, reset=false}:
      {time?:number, groupName:string, reset?:boolean}) {
    super({time})
    this.groupName = groupName
    this.reset = reset
  }

  reduce(state:State):State {
    return state.top({
      groupName: this.groupName,
      reset: this.reset,
      time: this.time,
    })
  }
}
