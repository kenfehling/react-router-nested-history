import IState from './IState'
import Action from './Action'

interface IUpdateData<S extends IState, A extends Action> {
  readonly state: S
  readonly actions: A[]
}

export default IUpdateData