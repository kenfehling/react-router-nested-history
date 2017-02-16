import Action from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class CreateContainer extends Action {
  static readonly type: string = 'CreateContainer'
  readonly type: string = CreateContainer.type
  readonly name: string
  readonly groupName: string
  readonly initialUrl: string
  readonly patterns: string[]
  readonly useDefault: boolean
  readonly resetOnLeave: boolean

  constructor({time, name, groupName, initialUrl, patterns,
      useDefault=true, resetOnLeave=false}:
      {time?:number, name:string, groupName:string, initialUrl:string,
        patterns:string[], useDefault?:boolean, resetOnLeave?:boolean}) {
    super({time})
    this.name = name
    this.groupName = groupName
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.useDefault = useDefault
    this.resetOnLeave = resetOnLeave
  }

  reduce(state:IState):IState {
    return state.addContainer({
      name: this.name,
      groupName: this.groupName,
      initialUrl: this.initialUrl,
      useDefault: this.useDefault,
      resetOnLeave: this.resetOnLeave,
      patterns: this.patterns
    })
  }

}