import Action from '../BaseAction'
import State from '../State'

interface ShiftFunctionParams {
  n: number;
  time: number;
  container?: string
}

type ShiftFunction = (params:ShiftFunctionParams) => State

abstract class ShiftAction extends Action {
  readonly container?:string
  readonly n: number

  constructor({time, container, n=1}:{time?:number, container?:string, n?:number}) {
    super({time})
    this.container = container
    this.n = n
  }

  abstract fn(state:State):ShiftFunction

  reduce(state:State):State {
    const fn = this.fn(state).bind(state)
    return fn({
      n: this.n,
      time: this.time,
      container: this.container
    })
  }
}

export default ShiftAction