import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {Dispatch, connect} from 'react-redux'
import {Store} from '../../store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import * as R from 'ramda'
import {
  getContainerActiveUrl, getIsActiveInGroup, getHasWindow,
} from '../selectors'
import waitForInitialization from '../waitForInitialization'
import OpenWindow from '../../model/actions/OpenWindow'
import {createStructuredSelector} from 'reselect'

interface BaseHeaderLinkProps {
  children: ReactNode
  className?: string,
  activeClassName?: string
}

export type HeaderLinkProps = BaseHeaderLinkProps& {
  toContainer: string
}

type HeaderLinkPropsWithStore = BaseHeaderLinkProps & {
  store: Store
  groupName: string
  containerName: string
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
      'groupName',
      'containerName',
      'activeClassName',
      'className',
      'store',
      'onClick',
      'isActive',
      'hasWindow',
      'dispatch',
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

const mapStateToProps = createStructuredSelector({
  url: getContainerActiveUrl,
  isActive: getIsActiveInGroup,
  hasWindow: getHasWindow
})

const mapDispatchToProps = (dispatch) => ({dispatch})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:HeaderLinkPropsWithStore):ConnectedHeaderLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClick: () => {
    const params = {name: ownProps.containerName}
    const action = stateProps.hasWindow ? new OpenWindow(params) :
                                          new SwitchToContainer(params)
    return dispatchProps.dispatch(action)
  }
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
    const {toContainer, ...props} = this.props
    return <ConnectedHeaderLink store={rrnhStore}
                                containerName={toContainer}
                                {...context}
                                {...props}
    />
  }
}

export default waitForInitialization(HeaderLink)