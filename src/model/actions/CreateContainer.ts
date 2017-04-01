import Action, {SYSTEM} from '../BaseAction'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class CreateContainer extends Action {
  static readonly type: string = 'CreateContainer'
  readonly type: string = CreateContainer.type
  readonly name: string
  readonly group: string
  readonly initialUrl: string
  readonly patterns: string[]
  readonly isDefault: boolean
  readonly resetOnLeave: boolean

  constructor({time, name, group, initialUrl, patterns,
      isDefault=false, resetOnLeave=false}:
      {time?:number, name:string, group:string, initialUrl:string,
        patterns:string[], isDefault?:boolean, resetOnLeave?:boolean}) {
    super({time, origin: SYSTEM})
    this.name = name
    this.group = group
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.isDefault = isDefault
    this.resetOnLeave = resetOnLeave
  }

  reduce(state:State):State {
    return state.addContainer({
      time: this.time,
      name: this.name,
      group: this.group,
      initialUrl: this.initialUrl,
      isDefault: this.isDefault,
      resetOnLeave: this.resetOnLeave,
      patterns: this.patterns
    })
  }

  /*
  filter(state:State):Action[] {
    return state.loadedFromRefresh ? [] : [this]
  }
  */
}