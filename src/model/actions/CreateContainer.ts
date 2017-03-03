import Action, {SYSTEM} from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'
import Group from '../Group'

@Serializable
export default class CreateContainer extends Action {
  static readonly type: string = 'CreateContainer'
  readonly type: string = CreateContainer.type
  readonly name: string
  readonly groupName: string
  readonly initialUrl: string
  readonly patterns: string[]
  readonly isDefault: boolean
  readonly resetOnLeave: boolean

  constructor({time, name, groupName, initialUrl, patterns,
      isDefault=true, resetOnLeave=false}:
      {time?:number, name:string, groupName:string, initialUrl:string,
        patterns:string[], isDefault?:boolean, resetOnLeave?:boolean}) {
    super({time, origin: SYSTEM})
    this.name = name
    this.groupName = groupName
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.isDefault = isDefault
    this.resetOnLeave = resetOnLeave
  }

  reduce(state:IState):IState {
    return state.addContainer({
      name: this.name,
      groupName: this.groupName,
      initialUrl: this.initialUrl,
      isDefault: this.isDefault,
      resetOnLeave: this.resetOnLeave,
      patterns: this.patterns
    })
  }

  filter(state:IState):Action[] {
    const group:Group = state.getGroupByName(this.groupName)
    return group.hasContainerWithName(this.name) ? [] : [this]
  }
}