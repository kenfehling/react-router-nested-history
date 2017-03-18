import {ComputedWindow} from './ComputedState'
import {fromJS} from 'immutable'

export default class HistoryWindow {
  readonly forName:string
  readonly visible:boolean

  constructor({forName, visible=true}:{forName:string, visible?:boolean}) {
    this.forName = forName
    this.visible = visible
  }

  setVisibile(visible:boolean):HistoryWindow {
    return new HistoryWindow({...Object(this), visible})
  }

  computeState():ComputedWindow {
    return {...Object(this)}
  }
}