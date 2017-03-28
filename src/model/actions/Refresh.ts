import Action, {USER} from '../BaseAction'
import State from '../State'
import NonStepAction from './NonStepAction'
import Serializable from '../../store/decorators/Serializable'
import Load from './Load'

@Serializable
export default class Refresh extends NonStepAction {
  static readonly type: string = 'Refresh'
  readonly type: string = Refresh.type

  constructor({time}:{time?:number}={}) {
    super({time, origin: USER})
  }

  reduce(state:State):State {
    return state.assign({
      loadedFromRefresh: true,
      lastUpdate: this.time
    })
  }

  store(actions:Action[]):Action[] {
    const updatedActions:Action[] = actions.map(action => {
      if (action instanceof Load) {
        return new Load({...action, fromRefresh: true})
      }
      else {
        return action
      }
    })
    return super.store(updatedActions)
  }
}