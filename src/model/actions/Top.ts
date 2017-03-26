import Action, {Origin} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Top extends Action {
  static readonly type: string = 'Top'
  readonly type: string = Top.type
  readonly containerName: string
  readonly reset: boolean

  constructor({time, origin, containerName, reset=false}:
              {time?:number, origin:Origin, containerName:string, reset?:boolean}) {
    super({time, origin})
    this.containerName = containerName
    this.reset = reset
  }

  reduce(state:State):State {
    return state.top({
      containerName: this.containerName,
      reset: this.reset,
      time: this.time,
    })
  }

  filter(state:State):Action[] {
    const alreadyAtTop:boolean =
        state.isContainerAtTopPage(this.containerName)
    return alreadyAtTop ? [] : [this]
  }
}
