import * as React from 'react'
import {Component, ComponentClass, PropTypes, createElement} from 'react'
import {connect} from 'react-redux'
import {Store} from '../store/store'
import Action from '../model/BaseAction'
import State from '../model/State'
import ComputedState from '../model/ComputedState'

function waitForInitialization(component:ComponentClass<any>):ComponentClass<any> {

  type PropsWithStore = {
    store: Store<State, Action, ComputedState>
  }

  type ConnectedProps = PropsWithStore & {
    isInitialized: boolean
  }

  const mapStateToProps = (state:ComputedState) => {
    return {
      isInitialized: state.isInitialized
    }
  }

  const mergeProps = (stateProps, dispatchProps,
                      ownProps:PropsWithStore):ConnectedProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  })

  const WrappedComponent = (props:ConnectedProps) =>
      props.isInitialized ? createElement(component) : <div></div>

  const ConnectedComponent = connect(
    mapStateToProps,
    {},
    mergeProps
  )(WrappedComponent)

  return class WaitForInitialization extends Component<any, any> {
    static contextTypes = {
      rrnhStore: PropTypes.object.isRequired
    }
    render() {
      const {rrnhStore} = this.context
      return <ConnectedComponent store={rrnhStore} {...this.props} />
    }
  }
}

export default waitForInitialization