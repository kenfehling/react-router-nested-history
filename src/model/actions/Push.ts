import State from '../State'
import {Serializable} from '../../util/serializer'
import Action, {Origin, ActionOrigin} from '../BaseAction'
import Page from '../Page'
import {parseParamsFromPatterns} from '../../util/url'
import SwitchToGroup from './SwitchToGroup'
import SwitchToContainer from './SwitchToContainer'

@Serializable
export default class Push extends Action {
  static readonly type: string = 'Push'
  readonly type: string = Push.type
  readonly groupName:string
  readonly containerName:string
  readonly url:string

  constructor({time, origin, groupName, containerName, url}:
              {time?:number, origin?:Origin, groupName:string,
                containerName:string, url:string}) {
    super({time, origin})
    this.groupName = groupName
    this.containerName = containerName
    this.url = url
  }

  reduce(state:State):State {
    const container =  state.getContainer(this.groupName, this.containerName)
    const params:Object = parseParamsFromPatterns(container.patterns, this.url)
    const page:Page = new Page({
      params,
      url: this.url,
      groupName: this.groupName,
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
        groupName: this.groupName,
        origin: new ActionOrigin(this),
        time: this.time
      }
      return [
        new SwitchToGroup(data),
        new SwitchToContainer({...data, name: this.containerName}),
        this
      ]
    }
  }
}