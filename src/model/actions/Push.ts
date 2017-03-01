import IState from '../IState'
import {Serializable} from '../../util/serializer'
import Action, {Origin} from '../Action'
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

  reduce(state:IState):IState {
    const params:Object = parseParamsFromPatterns(patterns, url)
    const page:Page = new Page({
      params,
      url: this.url,
      groupName: this.groupName,
      containerName: this.containerName,
      lastVisited: this.time
    })
    return state.push(page)
  }

  filter(state:IState):Action[] {
    const data = {groupName: this.groupName, origin: this, time: this.time}
    return [
      new SwitchToGroup(data),
      new SwitchToContainer({...data, containerName: this.containerName}),
      this
    ]
  }
}