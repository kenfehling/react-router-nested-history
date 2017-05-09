import * as React from 'react'
import {Component, ReactElement} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getMatchesCurrentUrl} from '../selectors'
import {Store} from '../../store'

interface BaseProps {
  children: ReactElement<any>
}

type PropsWithStore = BaseProps & {
  store: Store
  containerName?: string
}

type ConnectedProps = PropsWithStore &  {
  matchesCurrentUrl: boolean
}

const InnerWhenActive = ({matchesCurrentUrl, children}:ConnectedProps) => (
  matchesCurrentUrl ? children : <div />
)

const mapStateToProps = (state, ownProps) => ({
  matchesCurrentUrl: ownProps.containerName ?
      getMatchesCurrentUrl(state, ownProps) :
      true  // if not in a container, it always matches
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:PropsWithStore):ConnectedProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedWhenActive = connect(
  mapStateToProps,
  {},
  mergeProps
)(InnerWhenActive)

export default class WhenActive extends Component<BaseProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    containerName: PropTypes.string
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedWhenActive {...context}
                                {...this.props}
                                store={rrnhStore}
    />
  }
}