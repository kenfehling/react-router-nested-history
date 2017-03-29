import Action from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class OpenWindow extends Action {
  static readonly type: string = 'OpenWindow'
  readonly type: string = OpenWindow.type
  readonly groupName: string|undefined
  readonly index: number|undefined
  readonly name: string|undefined

  constructor({time, groupName, index, name}:
                {time?:number, groupName:string, index:number, name?:string}|
                {time?:number, groupName?:string, index?:number, name?:string}) {
    super({time})
    this.groupName = groupName
    this.index = index
    this.name = name
  }

  reduce(state:State):State {
    if (this.groupName && this.index) {
      return state.openWindowAtIndex({
        groupName: this.groupName,
        index: this.index,
        time: this.time
      })
    }
    else if (this.name) {
      return state.openWindowForName({
        name: this.name,
        time: this.time
      })
    }
    else {
      throw new Error('You must pass either groupName+index or name to OpenWindow')
    }
  }
}