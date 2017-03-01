import Action from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'
import Top from './Top'
import Group from '../Group'
import {Origin} from '../Action'
import {ActionOrigin} from '../Action'

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

  private getContainerName(state:IState):string {
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

  reduce(state:IState):IState {
    return state.switchToContainer({
      groupName: this.groupName,
      name: this.getContainerName(state),
      time: this.time
    })
  }

  filter(state:IState):Action[]​ {
    const containerName:string = this.getContainerName(state)
    if (state.isContainerActive(this.groupName, containerName)) {
      if (!(this.origin instanceof ActionOrigin)) {
        const group:Group = state.getGroupByName(this.groupName)
        if (group.gotoTopOnSelectActive) {
          return [new Top({groupName: this.groupName, containerName})]
        }
      }
      return []
    }
    else {
      return [this]
    }
  }
}