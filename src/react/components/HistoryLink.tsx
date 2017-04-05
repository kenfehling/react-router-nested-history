import * as React from 'react'
import {Component, PropTypes} from 'react'
import {LinkProps} from 'react-router'
import {connect} from 'react-redux'
import {compose, getContext, renameProps, shouldUpdate} from 'recompose'
import {createPath} from 'history/PathUtils'
import Push from '../../model/actions/Push'
import {Store} from '../../store'
import * as R from 'ramda'
import {
  EMPTY_OBJ, createCachingSelector, getGroupName,
  getDispatch, getContainerName
} from '../selectors'

type HistoryLinkPropsWithStore = LinkProps & {
  store: Store
  groupName: string
}

type ConnectedHistoryLinkProps = HistoryLinkPropsWithStore & {
  push: (url:string) => void
}

class InnerHistoryLink extends Component<ConnectedHistoryLinkProps, undefined> {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('HistoryLink needs to be inside a ContainerGroup')
    }
    if (this.props.containerName == null) {
      throw new Error('HistoryLink needs to be inside a Container')
    }
  }

  getUrl() {
    const {to} = this.props
    return typeof(to) === 'string' ? to : createPath(to)
  }

  onClick(event) {
    const {push} = this.props
    push(this.getUrl())
    event.stopPropagation()
    event.preventDefault()
  }

  onMouseDown(event) {
    event.stopPropagation()
    event.preventDefault()
  }

  render() {
    const {...aProps} = R.omit([
      'to',
      'groupName',
      'containerName',
      'store',
      'push',
      'storeSubscription'
    ], this.props)
    return (
      <a href={this.getUrl()}
         onMouseDown={this.onMouseDown.bind(this)}
         onClick={this.onClick.bind(this)}
         {...aProps}
      >
        {this.props.children}
      </a>
    )
  }
}

const makeGetActions = () => createCachingSelector(
  getGroupName, getContainerName, getDispatch,
  (groupName, containerName, dispatch) => ({
    push: (url:string) => dispatch(new Push({
      url,
      container: containerName
    }))
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:HistoryLinkPropsWithStore):ConnectedHistoryLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const HistoryLink = connect(
  () => (EMPTY_OBJ),
  makeGetActions,
  mergeProps
)(InnerHistoryLink)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
  }),
  renameProps({
    rrnhStore: 'store',
  }),
  shouldUpdate(
    (props, nextProps) => false
  )
)

export default enhance(HistoryLink)