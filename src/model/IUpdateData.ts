import IState from './IState'
import Action from './Action'

interface IUpdateData {
  readonly lastAction: Action
  readonly state: IState
  readonly actions: Action[]
}

export default IUpdateData