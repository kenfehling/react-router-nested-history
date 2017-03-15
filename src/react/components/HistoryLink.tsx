import * as React from 'react'
import {Component, PropTypes} from 'react'
import {LinkProps} from 'react-router'
import {createPath} from 'history/PathUtils'
import {connect, Dispatch} from 'react-redux'
import Push from '../../model/actions/Push'
import {Store} from '../../store/store'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import * as R from 'ramda'
import ComputedState from '../../model/ComputedState'
import {EMPTY_OBJ, createCachingSelector, getGroupName} from '../selectors'
import waitForInitialization from '../waitForInitialization'

type HistoryLinkPropsWithStore = LinkProps & {
  store: Store<State, Action, ComputedState>
  groupName: string
}

type ConnectedHistoryLinkProps = HistoryLinkPropsWithStore & {
  push: (url:string) => void
}

class InnerHistoryLink extends Component<ConnectedHistoryLinkProps, undefined> {

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

const getContainerName = (_, ownProps) => ownProps.containerName

const nameSelector = createCachingSelector(
  getGroupName, getContainerName,
  (groupName:string, containerName:string) => ({
    groupName,
    containerName
  }))

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:HistoryLinkPropsWithStore) => {
  const {groupName, containerName} = nameSelector(EMPTY_OBJ, ownProps)
  return {
    push: (url:string) => dispatch(new Push({
      url,
      groupName,
      containerName
    }))
  }
}

const ConnectedHistoryLink = connect(
  () => (EMPTY_OBJ),
  mapDispatchToProps,
)(InnerHistoryLink)

class HistoryLink extends Component<LinkProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedHistoryLink store={rrnhStore} {...context} {...this.props} />
  }
}

export default waitForInitialization(HistoryLink)