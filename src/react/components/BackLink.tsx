import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import {connect, Dispatch} from 'react-redux'
import {Store} from '../../store/store'
import Page from '../../model/Page'
import SwitchToGroup from '../../model/actions/SwitchToGroup'
import Back from '../../model/actions/Back'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import * as R from 'ramda'
import ComputedState from '../../model/ComputedState'
import {createSelector} from 'reselect'
import {getBackPageInGroup} from '../selectors'

export type ChildrenFunctionArgs = {
  params: Object
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface BackLinkProps {
  children?: ChildrenType
}

type BackLinkPropsWithStore = BackLinkProps & {
  store: Store<State, Action, ComputedState>
  groupName: string
}

type ConnectedBackLinkProps = BackLinkPropsWithStore & {
  isInitialized: boolean
  backPage: Page|null
  back: () => void

}

class BackLink extends Component<ConnectedBackLinkProps, undefined> {
  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('BackLink needs to be inside a ContainerGroup')
    }
  }

  // Don't disappear when transitioning back to previous page
  shouldComponentUpdate(newProps) {
    return false
  }

  onClick(event) {
    const {back} = this.props
    back()
    event.stopPropagation()
    event.preventDefault()
  }

  onMouseDown(event) {
    event.stopPropagation()
    event.preventDefault()
  }

  render() {
    const {children, backPage, ...aProps} = R.omit([
      'groupName',
      'containerName',
      'store',
      'isInitialized',
      'back',
      'params',
      'storeSubscription'
    ], this.props)
    if (backPage) {
      return (
        <a href={backPage.url}
           onMouseDown={this.onMouseDown.bind(this)}
           onClick={this.onClick.bind(this)}
           {...aProps}
        >
          {children ?
            (children instanceof Function ? children({params: backPage.params})
              : children) : 'Back'}
        </a>
      )
    }
    else {
      return <span> </span>
    }
  }
}

const selector = createSelector(getBackPageInGroup, (backPage:Page) => ({
  backPage
}))

const mapStateToProps = (state:ComputedState, ownProps:BackLinkPropsWithStore) => {
  const s = selector(state)
  return {
    isInitialized: state.isInitialized,
    backPage: s.backPage
  }
}

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:BackLinkPropsWithStore) => ({
  back: () => {
    dispatch(new SwitchToGroup({groupName: ownProps.groupName}))
    dispatch(new Back())
  }
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:BackLinkPropsWithStore):ConnectedBackLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedBackLink = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BackLink)

export default class extends Component<BackLinkProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return  <ConnectedBackLink store={rrnhStore} {...context} {...this.props} />
  }
}