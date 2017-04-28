import * as React from 'react'
import {ComponentClass, createElement} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, getContext, renameProps, shouldUpdate} from 'recompose'
import {Store} from '../store'
import {createStructuredSelector} from 'reselect'
import {getIsInitialized} from './selectors'

function waitForInitialization(component:ComponentClass<any>):ComponentClass<any> {

  type PropsWithStore = {
    store: Store
  }

  type ConnectedProps = PropsWithStore & {
    isInitialized: boolean
  }

  const mapStateToProps = createStructuredSelector({
    isInitialized: getIsInitialized
  })

  const WrappedComponent = shouldUpdate(
    (props, nextProps) => !props.isInitialized && nextProps.isInitialized
  )(
    ({isInitialized, ...props}:ConnectedProps) =>
      isInitialized ? createElement(component, props) : null
  )

  const WaitForInitialization = connect(
    mapStateToProps,
    {}
  )(WrappedComponent as any)

  const enhance = compose(
    getContext({
      rrnhStore: PropTypes.object.isRequired
    }),
    renameProps({
      rrnhStore: 'store'
    })
  )

  return enhance(WaitForInitialization)
}

export default waitForInitialization