import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {Dispatch, connect} from 'react-redux'
import {Store} from '../../store/store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import * as R from 'ramda'
import ComputedState from '../../model/ComputedState'
import {createSelector} from 'reselect'
import {ComputedContainer} from '../../model/ComputedState'
import {
  getGroup, getActiveGroupContainerName,
  createCachingSelector, getGroupName, EMPTY_OBJ
} from '../selectors'
import waitForInitialization from '../waitForInitialization'

export interface HeaderLinkProps {
  children: ReactNode
  toContainer: string,
  className?: string,
  activeClassName?: string
}

type HeaderLinkPropsWithStore = HeaderLinkProps & {
  store: Store<State, Action, ComputedState>
  groupName: string
}

type ConnectedHeaderLinkProps = HeaderLinkPropsWithStore & {
  url: string
  onClick: () => void
  isActive: boolean
}

class InnerHeaderLink extends Component<ConnectedHeaderLinkProps, undefined> {

  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('HeaderLink needs to be inside a ContainerGroup')
    }
  }

  onClick(event):void {
    const {onClick} = this.props
    onClick()
    event.stopPropagation()
    event.preventDefault()
  }

  onMouseDown(event) {
    event.stopPropagation()
    event.preventDefault()
  }

  getClassName():string {
    const {className, activeClassName, isActive} = this.props
    return isActive && activeClassName ? activeClassName : className || ''
  }

  render() {
    const {children, url, ...aProps} = R.omit([
      'toContainer',
      'groupName',
      'containerName',
      'activeClassName',
      'className',
      'store',
      'onClick',
      'isActive',
      'storeSubscription'
    ], this.props)
    return (
      <a href={url}
         className={this.getClassName()}
         onMouseDown={this.onMouseDown.bind(this)}
         onClick={this.onClick.bind(this)}
         {...aProps}
      >
        {children}
      </a>
    )
  }
}

export const getContainer = (state:ComputedState, ownProps):ComputedContainer => {
  return getGroup(state, ownProps).containers.get(ownProps.toContainer)
}

const selector = createSelector(getActiveGroupContainerName, getContainer,
    (activeGroupContainerName:string, container:ComputedContainer) => ({
  url: container.activeUrl,
  activeGroupContainerName
}))

const getContainerName = (_, ownProps) => ownProps.toContainer

const nameSelector = createCachingSelector(
    getGroupName, getContainerName,
    (groupName:string, containerName:string) => ({
  groupName,
  containerName
}))

const mapStateToProps = (state:ComputedState, ownProps) => {
  const s = selector(state, ownProps)
  return {
    url: s.url,
    isActive: s.activeGroupContainerName === ownProps.toContainer
  }
}

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:HeaderLinkPropsWithStore) => {
  const {groupName, containerName} = nameSelector(EMPTY_OBJ, ownProps)
  return {
    onClick: () => dispatch(new SwitchToContainer({
      groupName,
      name: containerName
    }))
  }
}

const mergeProps = (stateProps, dispatchProps,
                    ownProps:HeaderLinkPropsWithStore):ConnectedHeaderLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHeaderLink = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InnerHeaderLink)

class HeaderLink extends Component<HeaderLinkProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedHeaderLink store={rrnhStore} {...context} {...this.props} />
  }
}

export default waitForInitialization(HeaderLink)