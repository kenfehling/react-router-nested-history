import * as React from 'react'
import {Component, ReactElement, ReactNode} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getMatchesCurrentUrl} from '../selectors'
import {createStructuredSelector} from 'reselect'
import {Store} from '../../store'

interface BaseProps {
  children: ReactElement<any>
}

type PropsWithStore = BaseProps & {
  store: Store
  containerName: string
}

type ConnectedProps = PropsWithStore &  {
  matchesCurrentUrl: boolean
}

const InnerWhenActive = ({matchesCurrentUrl, children}:ConnectedProps) => (
  matchesCurrentUrl ? children : <div />
)

const mapStateToProps = createStructuredSelector({
  matchesCurrentUrl: getMatchesCurrentUrl
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
    containerName: PropTypes.string.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedWhenActive {...context}
                                {...this.props}
                                store={rrnhStore}
    />
  }
}