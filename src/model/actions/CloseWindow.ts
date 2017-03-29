import Action from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class CloseWindow extends Action {
  static readonly type: string = 'CloseWindow'
  readonly type: string = CloseWindow.type
  readonly forName: string

  constructor({time, forName}:{time?:number, forName:string}) {
    super({time})
    this.forName = forName
  }

  reduce(state:State):State {
    return state.closeWindow(({forName: this.forName, time: this.time}))
  }
}