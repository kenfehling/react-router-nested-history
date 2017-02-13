import Action from '../Action'
import State from '../State'
import {Serializable} from '../../util/serializer'

@Serializable
export default class SwitchToContainer extends Action {
  static readonly type: string = 'SwitchToContainer'
  readonly type: string = SwitchToContainer.type
  readonly groupName: string
  readonly containerName: string

  constructor({time, groupName, containerName}:
      {time?:number, groupName:string, containerName:string}) {
    super({time})
    this.groupName = groupName
    this.containerName = containerName
  }

  reduce(state:State):State {
    return state.switchToContainer({
      groupName: this.groupName,
      containerName: this.containerName,
      time: this.time
    })
  }
}