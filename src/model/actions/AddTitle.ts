import Action, {SYSTEM} from '../Action'
import IState from '../IState'
import {Serializable} from '../../util/serializer'

@Serializable
export default class AddTitle extends Action {
  static readonly type: string = 'AddTitle'
  readonly type: string = AddTitle.type
  readonly pathname: string
  readonly title: string

  constructor({time, pathname, title}:
              {time?:number, pathname:string, title:string}) {
    super({time, origin: SYSTEM})
    this.pathname = pathname
    this.title = title
  }

  reduce(state:IState):IState {
    return state.addTitle({
      pathname: this.pathname,
      title: this.title
    })
  }


  filter(state: IState): Action[] {
    return state.hasTitleForPath(this.pathname) ? [] : [this]
  }
}
