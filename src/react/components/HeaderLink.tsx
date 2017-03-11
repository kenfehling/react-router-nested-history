import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {Dispatch, connect} from 'react-redux'
import IUpdateData from '../../store/IUpdateData'
import {Store} from '../../store/store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import * as R from 'ramda'

export interface HeaderLinkProps {
  children: ReactNode
  toContainer: string,
  className?: string,
  activeClassName?: string
}

type HeaderLinkPropsWithStore = HeaderLinkProps & {
  store: Store<State, Action>
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
      'store',
      'onClick',
      'isActive'
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

const mapStateToProps = ({state}:IUpdateData<State, Action>, ownProps) => ({
  url: state.getContainerLinkUrl(ownProps.groupName, ownProps.toContainer),
  isActive: state.isContainerActive(ownProps.groupName, ownProps.toContainer)
})

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData<State, Action>>,
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