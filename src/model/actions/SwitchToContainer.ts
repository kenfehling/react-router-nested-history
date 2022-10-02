import State from '../State'
import Action, {Origin} from '../Action'
import Serializable from '../../store/decorators/Serializable'

/**
 * Accepts either a container name or a group + a container index
 */
@Serializable
export default class SwitchToContainer extends Action {
  static readonly type: string = 'SwitchToContainer'
  readonly type: string = SwitchToContainer.type
  readonly name: string|undefined
  readonly group:string|undefined
  readonly index: number|undefined

  constructor({time, origin, name=undefined, group=undefined, index=undefined}:
      {time?:number, origin?:Origin, name:string, group?:undefined,
        index?:undefined}|
      {time?:number, origin?:Origin, name?:undefined, group:string,
        index:number}) {
    super({time, origin})
    this.name = name
    this.group = group
    this.index = index
  }

  private getContainer(state:State):string {
    if (this.name) {
      return this.name
    }
    else if (this.group != null && this.index != null) {
      return state.getContainerNameByIndex(this.group, this.index)
    }
    else {
      throw new Error('Need to pass name or group & index to SwitchToContainer')
    }
  }

  /* @ts-ignore */
  reduce(state:State):State {
    return state.switchToContainer({
      name: this.getContainer(state),
      time: this.time,
    })
  }

  /* @ts-ignore */
  filter(state:State) {
    const container:string = this.getContainer(state)
    return state.isContainerActiveAndEnabled(container) ? [] : [this]
  }
}