import * as React from 'react'
import {Component, ComponentClass, PropTypes, createElement} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../store/IUpdateData'
import {Store} from '../store/store'
import Action from '../model/BaseAction'
import State from '../model/State'

export default function<P>(component:ComponentClass<P>):ComponentClass<P> {
  type PS = P & {store:Store<State, Action>}

  const mapStateToProps = (state:IUpdateData<State, Action>, ownProps:PS):P => ({
    ...Object(ownProps),
    ...state
  })

  const WrappedComponent = (props:P) => createElement(component, props)
  const ConnectedComponent = connect(mapStateToProps)(WrappedComponent)

  return class ConntectToStore extends Component<P, any> {
    static contextTypes = {
      rrnhStore: PropTypes.object.isRequired
    }
    render() {
      const {rrnhStore} = this.context
      return <ConnectedComponent store={rrnhStore} {...this.props} />
    }
  }
}