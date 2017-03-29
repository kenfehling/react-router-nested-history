import Action from './Action'

interface IComputedState<A extends Action> {
  actions: A[]
}

export default IComputedState