import Action, {Origin} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Top extends Action {
  static readonly type: string = 'Top'
  readonly type: string = Top.type
  readonly container: string
  readonly reset: boolean

  constructor({time, origin, container, reset=false}:
              {time?:number, origin:Origin, container:string, reset?:boolean}) {
    super({time, origin})
    this.container = container
    this.reset = reset
  }

  reduce(state:State):State {
    return state.top({
      container: this.container,
      reset: this.reset,
      time: this.time,
    })
  }

  filter(state:State):Action[] {
    const alreadyAtTop:boolean =
        state.isContainerAtTopPage(this.container)
    return alreadyAtTop ? [] : [this]
  }
}
