import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import {connect, Dispatch} from 'react-redux'
import IUpdateData from '../../store/IUpdateData'
import {Store} from '../../store/store'
import Page from '../../model/Page'
import SwitchToGroup from '../../model/actions/SwitchToGroup'
import Back from '../../model/actions/Back'
import InitializedState from '../../model/InitializedState'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import * as R from 'ramda'

export type ChildrenFunctionArgs = {
  params: Object
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface BackLinkProps {
  children?: ChildrenType
}

type BackLinkPropsWithStore = BackLinkProps & {
  store: Store<State, Action>
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

  /*
  // Don't disappear when transitioning back to previous page
  shouldComponentUpdate(newProps) {
    return !this.props.isInitialized && newProps.isInitialized
  }
  */

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

const mapStateToProps = ({state}:IUpdateData<State, Action>,
                         ownProps:BackLinkPropsWithStore) => {
  const isInitialized:boolean = state instanceof InitializedState
  return {
    isInitialized,
    backPage: isInitialized ? state.getBackPageInGroup(ownProps.groupName) : null
  }

}

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData<State, Action>>,
                            ownProps:BackLinkPropsWithStore) => ({
  back: () => {
    dispatch(new SwitchToGroup({groupName: ownProps.groupName}))
    dispatch(new Back())
  }
})

const ConnectedBackLink = connect(
  mapStateToProps,
  mapDispatchToProps,
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