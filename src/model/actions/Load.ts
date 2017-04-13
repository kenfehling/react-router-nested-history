import Action, {USER} from '../Action'
import State from '../State'
import Step from '../Step'
import Serializable from '../../store/decorators/Serializable'

/**
 * Action to load the site from any given URL (bookmark, etc.)
 */
@Serializable
export default class Load extends Action {
  static readonly type: string = 'Load'
  readonly type: string = Load.type
  readonly url: string
  readonly fromRefresh: boolean

  constructor({time, url, fromRefresh=false}:
      {time?:number, url:string, fromRefresh?:boolean}) {
    super({time, origin: USER})
    this.url = url
    this.fromRefresh = fromRefresh
  }

  reduce(state:State):State {
    return this.fromRefresh ? state :
        state.load({url: this.url, time: this.time})
  }

  addSteps(steps:Step[], state:State):Step[] {
    return this.fromRefresh ? [] : super.addSteps(steps, state)
  }
}