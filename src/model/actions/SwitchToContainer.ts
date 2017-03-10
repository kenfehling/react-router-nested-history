import Action, {USER, ActionOrigin} from '../BaseAction'
import State from '../State'
import {Serializable} from '../../util/serializer'
import Top from './Top'
import Group from '../Group'
import {Origin} from '../BaseAction'

@Serializable
export default class SwitchToContainer extends Action {
  static readonly type: string = 'SwitchToContainer'
  readonly type: string = SwitchToContainer.type
  readonly groupName: string
  readonly name: string|null
  readonly index: number|null

  constructor({time, origin, groupName, name=null, index=null}:
      {time?:number, origin?:Origin, groupName:string, name:string, index?:null}|
      {time?:number, origin?:Origin, groupName:string, name?:null, index:number}) {
    super({time, origin})
    this.groupName = groupName
    this.name = name
    this.index = index
  }

  private getContainerName(state:State):string {
    if (this.name) {
      return this.name
    }
    else if (this.index != null) {
      return state.getContainerNameByIndex(this.groupName, this.index)
    }
    else {
      throw new Error('Need to pass name or index to SwitchToContainer')
    }
  }

  reduce(state:State):State {
    return state.switchToContainer({
      groupName: this.groupName,
      name: this.getContainerName(state),
      time: this.time
    })
  }

  filter(state:State):Action[]​ {
    const containerName:string = this.getContainerName(state)
    if (state.isContainerActive(this.groupName, containerName)) {
      if (this.origin === USER) {
        const group:Group = state.getGroupByName(this.groupName)
        if (group.gotoTopOnSelectActive) {
          return [new Top({
            groupName: this.groupName,
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