import Action, {SYSTEM} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class CreateWindow extends Action {
  static readonly type: string = 'CreateWindow'
  readonly type: string = CreateWindow.type
  readonly forName: string
  readonly visible: boolean

  constructor({time, forName, visible=true}:
              {time?:number, forName:string, visible?:boolean}) {
    super({time, origin: SYSTEM})
    this.forName = forName
    this.visible = visible
  }

  reduce(state:State):State {
    return state.addWindow({
      forName: this.forName,
      visible: this.visible
    })
  }

  /*
  filter(state:State):Action[] {
    return state.loadedFromRefresh ? [] : [this]
  }
  */
}