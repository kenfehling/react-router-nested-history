import Action, {SYSTEM} from '../Action'
import State from '../State'
import Serializable from '../../store/decorators/Serializable'

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

  /* @ts-ignore */
  reduce(state:State):State {
    return state.addTitle({
      pathname: this.pathname,
      title: this.title
    })
  }

  /* @ts-ignore */
  filter(state: State): Action[] {
    return state.hasTitleForPath(this.pathname) ? [] : [this] as Action[]
  }
}
