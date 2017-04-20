import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect} from 'react-redux'
import {compose, getContext, renameProps} from 'recompose'
import {Store} from '../../store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import * as omit from 'lodash/omit'
import {
  getIsActiveInGroup, getHasWindow, getHeaderLinkUrl, getShouldGoToTop
} from '../selectors'
import waitForInitialization from '../waitForInitialization'
import OpenWindow from '../../model/actions/OpenWindow'
import {createStructuredSelector} from 'reselect'
import Top from '../../model/actions/Top'

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
  onClick: (e:MouseEvent) => void
  onMouseDown: (e:MouseEvent) => void
  isActive: boolean
}

class InnerHeaderLink extends Component<ConnectedHeaderLinkProps, undefined> {

  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('HeaderLink needs to be inside a ContainerGroup')
    }
  }

  getClassName():string {
    const {className, activeClassName, isActive} = this.props
    return isActive ? [ activeClassName, className ].join(' ') : className || ''
  }

  render() {
    const {children, url, isActive, onClick, onMouseDown, ...aProps} = omit(this.props, [
      'groupName',
      'containerName',
      'activeClassName',
      'className',
      'store',
      'hasWindow',
      'shouldGoToTop',
      'dispatch',
      'storeSubscription'
    ])
    return (
      <a href={url}
         className={this.getClassName()}
         onMouseDown={onMouseDown}
         onClick={onClick}
         {...aProps}
      >
        {children instanceof Function ? children({isActive}) : children}
      </a>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  url: getHeaderLinkUrl,
  isActive: getIsActiveInGroup,
  hasWindow: getHasWindow,
  shouldGoToTop: getShouldGoToTop,
})

const mapDispatchToProps = (dispatch) => ({dispatch})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:HeaderLinkPropsWithStore):ConnectedHeaderLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClick: (event:MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const {hasWindow, shouldGoToTop} = stateProps
    const {containerName} = ownProps
    const action = hasWindow ?
      new OpenWindow({name: containerName}) :
      (shouldGoToTop ?
        new Top({container: containerName}) :
        new SwitchToContainer({name: containerName}))
    return dispatchProps.dispatch(action)
  },
  onMouseDown: (event:MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
  }
})

const HeaderLink = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InnerHeaderLink)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired
  }),
  renameProps({
    rrnhStore: 'store',
    toContainer: 'containerName'
  }),
  waitForInitialization
)

export default enhance(HeaderLink)