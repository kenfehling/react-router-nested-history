import * as React from 'react'
import {Component, PropTypes} from 'react'
import {LinkProps} from 'react-router'
import {createPath} from 'history/PathUtils'
import {connect, Dispatch} from 'react-redux'
import Push from '../../model/actions/Push'
import {Store} from '../../store'
import IUpdateData from '../../model/interfaces/IUpdateData'

type HistoryLinkPropsWithStore = LinkProps & {
  store: Store
  groupName: string
}

type ConnectedHistoryLinkProps = HistoryLinkPropsWithStore & {
  push: (url:string) => void
}

class HistoryLink extends Component<ConnectedHistoryLinkProps, undefined> {

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
    event.preventDefault()
  }

  render() {

    return (
      <a href={this.getUrl()} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
                            ownProps:HistoryLinkPropsWithStore) => ({
  push: (url:string) => dispatch(new Push({
    url,
    groupName: ownProps.groupName,
    containerName: ownProps.containerName
  }))
})

const ConnectedHistoryLink = connect(
  () => ({}),
  mapDispatchToProps,
)(HistoryLink)

export default class extends Component<LinkProps, undefined> {
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