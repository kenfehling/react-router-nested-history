import State from '../State'
import Action, {Origin, ActionOrigin} from '../BaseAction'
import Page from '../Page'
import {parseParamsFromPatterns} from '../../util/url'
import SwitchToContainer from './SwitchToContainer'
import Serializable from '../../store/decorators/Serializable'
import Container from '../Container'

@Serializable
export default class Push extends Action {
  static readonly type: string = 'Push'
  readonly type: string = Push.type
  readonly container:string
  readonly url:string

  constructor({time, origin, container, url}:
              {time?:number, origin?:Origin, container:string, url:string}) {
    super({time, origin})
    this.container = container
    this.url = url
  }

  reduce(state:State):State {
    const c:Container = state.containers.get(this.container) as Container
    const params:Object = parseParamsFromPatterns(c.patterns, this.url)
    return state.push({
      page: new Page({
        params,
        url: this.url,
        container: this.container,
        group: c.group
      }),
      time: this.time
    })
  }

  filter(state:State):Action[] {
    if (state.activeUrl === this.url) {
      return []
    }
    else {
      const data = {
        origin: new ActionOrigin(this)
      }
      return [
        new SwitchToContainer({
          ...data,
          time: this.time - 1,
          name: this.container
        }),
        this
      ]
    }
  }
}