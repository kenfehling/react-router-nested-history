import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {Dispatch, connect} from 'react-redux'
import IUpdateData from '../../model/interfaces/IUpdateData'
import {Store} from '../../store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'

export interface HeaderLinkProps {
  children: ReactNode
  toContainer: string,
  className?: string,
  activeClassName?: string
}

type HeaderLinkPropsWithStore = HeaderLinkProps & {
  store: Store
  groupName: string
}

type ConnectedHeaderLinkProps = HeaderLinkPropsWithStore & {
  url: string
  onClick: () => void
  isActive: boolean
}

class HeaderLink extends Component<ConnectedHeaderLinkProps, undefined> {

  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('HeaderLink needs to be inside a ContainerGroup')
    }
  }

  onClick(event):void {
    const {onClick} = this.props
    onClick()
    event.preventDefault()
  }

  getClassName():string {
    const {className, activeClassName, isActive} = this.props
    return isActive && activeClassName ? activeClassName : className || ''
  }

  render() {
    const {children, url} = this.props
    return (
      <a href={url}
         className={this.getClassName()}
         onClick={this.onClick.bind(this)}>
        {children}
      </a>
    )
  }
}

const mapStateToProps = ({state}:IUpdateData, ownProps) => ({
  url: state.getContainerLinkUrl(ownProps.groupName, ownProps.toContainer),
  isActive: state.isContainerActive(ownProps.groupName, ownProps.toContainer)
})

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
                            ownProps:HeaderLinkPropsWithStore) => ({
  onClick: () => dispatch(new SwitchToContainer({
    groupName: ownProps.groupName,
    name: ownProps.toContainer
  }))
})

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
)(HeaderLink)

export default class extends Component<HeaderLinkProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedHeaderLink store={rrnhStore} {...context} {...this.props} />
  }
}