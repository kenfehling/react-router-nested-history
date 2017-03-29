import Action, {USER, ActionOrigin} from '../BaseAction'
import State from '../State'
import Top from './Top'
import Group from '../Group'
import {Origin} from '../BaseAction'
import Serializable from '../../store/decorators/Serializable'
import IContainer from '../IContainer'

/**
 * Accepts either a container name or a groupName + a container index
 */
@Serializable
export default class SwitchToContainer extends Action {
  static readonly type: string = 'SwitchToContainer'
  readonly type: string = SwitchToContainer.type
  readonly name: string|undefined
  readonly groupName:string|undefined
  readonly index: number|undefined

  constructor({time, origin, name=undefined, groupName=undefined, index=undefined}:
      {time?:number, origin?:Origin, name:string, groupName?:undefined,
        index?:undefined}|
      {time?:number, origin?:Origin, name?:undefined, groupName:string,
        index:number}) {
    super({time, origin})
    this.name = name
    this.groupName = groupName
    this.index = index
  }

  private getContainerName(state:State):string {
    if (this.name) {
      return this.name
    }
    else if (this.groupName != null && this.index != null) {
      return state.getContainerNameByIndex(this.groupName, this.index)
    }
    else {
      throw new Error('Need to pass name or groupName & index to SwitchToContainer')
    }
  }

  reduce(state:State):State {
    return state.switchToContainer({
      name: this.getContainerName(state),
      time: this.time,
    })
  }

  filter(state:State) {
    const containerName:string = this.getContainerName(state)
    if (state.isContainerActiveAndEnabled(containerName)) {
      if (this.origin === USER) {
        const container:IContainer = state.getContainerByName(containerName)
        const group:Group = state.getGroupByName(container.groupName)
        if (group.gotoTopOnSelectActive) {
          return [new Top({
            containerName,
            origin: new ActionOrigin(this)
          })]
        }
      }
      return []
    }
    else {
      return [this]
    }
  }
}