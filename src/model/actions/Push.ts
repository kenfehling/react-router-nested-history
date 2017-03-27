import State from '../State'
import Action, {Origin, ActionOrigin} from '../BaseAction'
import Page from '../Page'
import {parseParamsFromPatterns} from '../../util/url'
import SwitchToContainer from './SwitchToContainer'
import Serializable from '../../store/decorators/Serializable'

@Serializable
export default class Push extends Action {
  static readonly type: string = 'Push'
  readonly type: string = Push.type
  readonly containerName:string
  readonly url:string

  constructor({time, origin, containerName, url}:
              {time?:number, origin?:Origin, containerName:string, url:string}) {
    super({time, origin})
    this.containerName = containerName
    this.url = url
  }

  reduce(state:State):State {
    const container =  state.getContainerByName(this.containerName)
    const params:Object = parseParamsFromPatterns(container.patterns, this.url)
    const page:Page = new Page({
      params,
      url: this.url,
      containerName: this.containerName
    })
    return state.push(page, this.time)
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
          name: this.containerName
        }),
        this
      ]
    }
  }
}