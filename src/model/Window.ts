import {ComputedWindow} from './ComputedState'
import {fromJS} from 'immutable'

export default class Window {
  readonly forName:string
  readonly visible:boolean

  constructor({forName, visible=true}:{forName:string, visible?:boolean}) {
    this.forName = forName
    this.visible = visible
  }

  setVisibile(visible:boolean):Window {
    return new Window({...Object(this), visible})
  }

  computeState():ComputedWindow {
    return fromJS({...Object(this)})
  }
}