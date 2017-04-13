import State from '../State'
import Action from '../Action'
import Serializable from '../../store/decorators/Serializable'
import Page from '../Page'
import PopState from './PopState'

/**
 * This never gets stored in the actions list,
 * it's just used to calculate the shift amount
 * and trigger an actual PopState action
 */
@Serializable
export default class OnPopState extends Action {
  static readonly type: string = 'OnPopState'
  readonly type: string = OnPopState.type
  readonly page: Page

  constructor({time, page}:{time?: number, page:Page}) {
    super({time})
    this.page = page
  }

  filter(state: State): Action[] {
    return [
      new PopState({      // Trigger an actual PopState action
        time: this.time,  // after computing shift amount
        n: state.getShiftAmount(this.page)
      })
    ]
  }
}