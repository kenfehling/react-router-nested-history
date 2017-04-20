import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import {connect} from 'react-redux'
import {Store} from '../../store'
import Page from '../../model/Page'
import Back from '../../model/actions/Back'
import * as omit from 'lodash.omit'
import {
  createCachingSelector, getDispatch, getGroupName, getBackPageInGroup
} from '../selectors'
import waitForInitialization from '../waitForInitialization'
import ownKeys = Reflect.ownKeys
import {createStructuredSelector} from 'reselect'

type ChildrenFunctionArgs = {
  params: Object
}

type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

interface BackLinkProps {
  children?: ChildrenType
}

type BackLinkPropsWithStore = BackLinkProps & {
  store: Store
  groupName: string
}

type ConnectedBackLinkProps = BackLinkPropsWithStore & {
  backPage: Page|undefined
  onClick: (e:MouseEvent) => void
  onMouseDown: (e:MouseEvent) => void

}

class InnerBackLink extends Component<ConnectedBackLinkProps, undefined> {
  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('BackLink needs to be inside a ContainerGroup')
    }
  }

  // Don't disappear when transitioning back to previous page
  shouldComponentUpdate(newProps) {
    return !this.props.backPage && !!newProps.backPage
  }

  render() {
    const {children, backPage, onClick, onMouseDown, ...aProps} = omit(this.props, [
      'groupName',
      'containerName',
      'store',
      'params',
      'storeSubscription'
    ])
    if (backPage) {
      return (
        <a href={backPage.url}
           onMouseDown={onMouseDown}
           onClick={onClick}
           {...aProps}
        >
          {children ?
            (children instanceof Function ? children({params: backPage.params})
              : children) : 'Back'}
        </a>
      )
    }
    else {
      return null
    }
  }
}

const mapStateToProps = createStructuredSelector({
  backPage: getBackPageInGroup
})

const makeGetActions = () => createCachingSelector(
  getGroupName, getDispatch,
  (groupName, dispatch) => ({
    onClick: (event:MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
      dispatch(new Back({n: 1, container: groupName}))
    },
    onMouseDown: (event:MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
    }
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:BackLinkPropsWithStore):ConnectedBackLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedBackLink = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerBackLink)

class BackLink extends Component<BackLinkProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return  <ConnectedBackLink store={rrnhStore} {...context} {...this.props} />
  }
}

export default waitForInitialization(BackLink)