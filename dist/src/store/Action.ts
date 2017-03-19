import IState from './IState'
import ISerializable from './ISerializable'

abstract class Action implements ISerializable {
  abstract readonly type: string
  readonly time: number

  constructor({time=new Date().getTime()}:
    {time?:number}={}) {
    this.time = time
  }

  /**
   * Reducer for this action
   * @param state - The original state
   * @returns {IState} - The new state
   */
  reduce<S extends IState>(state:S):S {
    return state
  }

  /**
   * Runs before store()
   * Can reject or bring in other actions
   * @param state The current state
   * @returns {[Action]} - [this], replacement/additional actions to run, or []
   */
  filter<S extends IState, A extends Action>(state:S):A[] {
    return [Object(this) as A]
  }

  /**
   * Reducer for the store, typically used for just storing this action
   * but can be overridden to do things like clear some or all of the actions
   */
  store<A extends Action>(actions:A[]):A[] {
    return [...actions, Object(this) as A]
  }
}

export default Action