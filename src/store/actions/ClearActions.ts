import Action from '../Action'

/**
 * Only for testing purposes
 */
export default class ClearActions extends Action {
  static readonly type: string = 'ClearActions'
  readonly type: string = ClearActions.type

  constructor({time}:{time?:number}={}) {
    super({time})
  }

  store(actions:Action[]):Action[] {
    return []
  }
}