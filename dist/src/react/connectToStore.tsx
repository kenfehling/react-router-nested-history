import * as React from 'react'
import {Component, ComponentClass, PropTypes, createElement} from 'react'
import {connect} from 'react-redux'
import {Store} from '../store/store'
import Action from '../model/BaseAction'
import State from '../model/State'
import ComputedState from '../model/ComputedState'

function connectToStore<P>(component:ComponentClass<P>):ComponentClass<P> {
  type PS = P & {store:Store<State, Action, ComputedState>}

  const mapStateToProps = (state:ComputedState, ownProps:PS):P => ({
    ...Object(ownProps),
    ...state
  })

  const WrappedComponent = (props:P) => createElement(component, props)
  const ConnectedComponent = connect(mapStateToProps)(WrappedComponent)

  return class ConnectToStore extends Component<P, any> {
    static contextTypes = {
      rrnhStore: PropTypes.object.isRequired
    }
    render() {
      const {rrnhStore} = this.context
      return <ConnectedComponent store={rrnhStore} {...this.props} />
    }
  }
}

export default connectToStore