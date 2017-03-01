import * as React from 'react'
import {Component, ComponentClass, PropTypes, createElement} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../model/interfaces/IUpdateData'

export default function<P>(component:ComponentClass<P>):ComponentClass<P> {

  const mapStateToProps = (state:IUpdateData, ownProps:P):P => ({
    ...Object(ownProps),
    ...state
  })

  const WrappedComponent = (props:P) => createElement(component, props)
  const ConnectedComponent = connect(mapStateToProps)(WrappedComponent)

  return class extends Component<P, any> {
    static contextTypes = {
      state: PropTypes.object.isRequired
    }
    render() {
      return <ConnectedComponent {...this.context} {...this.props} />
    }
  }
}