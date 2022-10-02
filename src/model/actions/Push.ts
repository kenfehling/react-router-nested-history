import State from '../State'
import Action, {Origin, ActionOrigin} from '../Action'
import Page from '../Page'
import {parseParamsFromPatterns, patternsMatch} from '../../util/url'
import SwitchToContainer from './SwitchToContainer'
import Serializable from '../../store/decorators/Serializable'
import Container from '../Container'

@Serializable
export default class Push extends Action {
  static readonly type: string = 'Push'
  readonly type: string = Push.type
  readonly container?:string
  readonly url:string

  constructor({time, origin, container, url}:
              {time?:number, origin?:Origin, container?:string, url:string}) {
    super({time, origin})
    this.container = container
    this.url = url
  }

  fn(state:State):Function {
    return state.push
  }

  getContainer(state:State):Container|undefined {
    if (this.container) {
      return state.containers.get(this.container) as Container
    }
    else {
      const activeContainer:Container|undefined = state.activeContainer
      if (activeContainer && patternsMatch(activeContainer.patterns, this.url)) {
        return activeContainer
      }
    }
  }

  protected createPage(state:State):Page {
    const c:Container|undefined = this.getContainer(state)
    if (c) {
      const params:Object = parseParamsFromPatterns(c.patterns, this.url)
      return new Page({
        params,
        url: this.url,
        container: c.name,
        group: c.group
      })
    }
    else {  // zero page
      return  new Page({
        params: {},
        url: this.url,
        container: '',
        group: '',
        isZeroPage: true
      })
    }
  }

  /* @ts-ignore */
  reduce(state:State):State {
    const page: Page = this.createPage(state)
    return this.fn(state).bind(state)({
      page, time: this.time
    })
  }

  /* @ts-ignore */
  filter(state:State):Action[] {
    if (state.activeUrl === this.url) {
      return []
    }
    else if (this.container) {
      const data = {
        origin: new ActionOrigin(this as Action),
      }
      return [
        /* @ts-ignore */
        new SwitchToContainer({
          ...data,
          time: this.time - 1,
          name: this.container
        }),
        this as Action
      ]
    }
    else {
      return [this as Action]
    }
  }
}