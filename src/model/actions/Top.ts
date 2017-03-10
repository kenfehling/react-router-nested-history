import Action, {Origin} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Top extends Action {
  static readonly type: string = 'Top'
  readonly type: string = Top.type
  readonly groupName: string
  readonly containerName: string
  readonly reset: boolean

  constructor({time, origin, groupName, containerName, reset=false}:
              {time?:number, origin:Origin, groupName:string,
                containerName:string, reset?:boolean}) {
    super({time, origin})
    this.groupName = groupName
    this.containerName = containerName
    this.reset = reset
  }

  reduce(state:State):State {
    return state.top({
      groupName: this.groupName,
      containerName: this.containerName,
      reset: this.reset,
      time: this.time,
    })
  }

  filter(state:State):Action[] {
    const alreadyAtTop:boolean =
        state.isContainerAtTopPage(this.groupName, this.containerName)
    return alreadyAtTop ? [] : [this]
  }
}
