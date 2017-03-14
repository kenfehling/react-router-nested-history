abstract class IState {
  abstract get isInitialized():boolean
  abstract computeState():any
}

export default IState