import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import IUpdateData from '../../model/interfaces/IUpdateData'
import {Store} from '../../store'
import Page from '../../model/Page'
import SwitchToGroup from '../../model/actions/SwitchToGroup'
import Back from '../../model/actions/Back'
import InitializedState from '../../model/InitializedState'

export interface BackLinkProps {
  children: ReactNode;
  nameFn: (params:Object) => string
}

type BackLinkPropsWithStore = BackLinkProps & {
  store: Store
  groupName: string
}

type ConnectedBackLinkProps = BackLinkPropsWithStore & {
  isInitialized: boolean
  backPage: Page|null
  goBack: () => void

}

class BackLink extends Component<ConnectedBackLinkProps, undefined> {
  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('BackLink needs to be inside a ContainerGroup')
    }
  }

  // Don't disappear when transitioning back to previous page
  shouldComponentUpdate(newProps) {
    return !this.props.isInitialized && newProps.isInitialized
  }

  onClick(event) {
    const {goBack} = this.props
    goBack()
    event.preventDefault()
  }

  render() {
    const {children, nameFn, backPage} = this.props
    if (backPage) {
      return (<a href={backPage.url} onClick={this.onClick.bind(this)}>
        {children || nameFn ? nameFn({params: backPage.params}) : 'Back'}
      </a>)
    }
    else {
      return <span> </span>
    }
  }
}

const mapStateToProps = ({state}:IUpdateData,
                         ownProps:BackLinkPropsWithStore) => {
  const isInitialized:boolean = state instanceof InitializedState
  return {
    isInitialized,
    backPage: isInitialized ? state.getBackPageInGroup(ownProps.groupName) : null
  }

}

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
                            ownProps:BackLinkPropsWithStore) => ({
  goBack: () => {
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