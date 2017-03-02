import * as React from 'react'
import {Component, ComponentClass, PropTypes, createElement} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../model/interfaces/IUpdateData'
import {Store} from '../store'

export default function<P>(component:ComponentClass<P>):ComponentClass<P> {
  type PS = P & {store:Store}

  const mapStateToProps = (state:IUpdateData, ownProps:PS):P => ({
    ...Object(ownProps),
    ...state
  })

  const WrappedComponent = (props:P) => createElement(component, props)
  const ConnectedComponent = connect(mapStateToProps)(WrappedComponent)

  return class extends Component<P, any> {
    static contextTypes = {
      rrnhStore: PropTypes.object.isRequired
    }
    render() {
      const {rrnhStore} = this.context
      return <ConnectedComponent store={rrnhStore} {...this.props} />
    }
  }
}