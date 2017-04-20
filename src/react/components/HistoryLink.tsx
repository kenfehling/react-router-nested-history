import * as React from 'react'
import {Component, PropTypes} from 'react'
import {LinkProps} from 'react-router'
import {connect} from 'react-redux'
import {compose, getContext, renameProps} from 'recompose'
import {createPath} from 'history/PathUtils'
import Push from '../../model/actions/Push'
import {Store} from '../../store'
import * as omit from 'lodash.omit'
import {neverUpdate} from '../enhancers'

type HistoryLinkPropsWithStore = LinkProps & {
  store: Store
  groupName: string
}

type ConnectedHistoryLinkProps = HistoryLinkPropsWithStore & {
  onClick: (e:MouseEvent) => void
  onMouseDown: (e:MouseEvent) => void
}

const getUrl = (to) => typeof(to) === 'string' ? to : createPath(to)

class InnerHistoryLink extends Component<ConnectedHistoryLinkProps, undefined> {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    if (this.props.groupName == null) {
      throw new Error('HistoryLink needs to be inside a ContainerGroup')
    }
    if (this.props.containerName == null) {
      throw new Error('HistoryLink needs to be inside a Container')
    }
  }

  render() {
    const {url, onClick, onMouseDown, ...aProps} = omit(this.props, [
      'to',
      'groupName',
      'containerName',
      'store',
      'push',
      'storeSubscription',
      'dispatch'
    ])
    return (
      <a href={url}
         onMouseDown={onMouseDown}
         onClick={onClick}
         {...aProps}
      >
        {this.props.children}
      </a>
    )
  }
}

const mapStateToProps = (state, {to}) => ({url: getUrl(to)})

const mapDispatchToProps = (dispatch) => ({dispatch})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:HistoryLinkPropsWithStore):ConnectedHistoryLinkProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClick: (event:MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const {to} = ownProps
    const url:string = typeof(to) === 'string' ? to : createPath(to)
    dispatchProps.dispatch(new Push({
      url,
      container: ownProps.containerName
    }))
  },
  onMouseDown: (event:MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
  }
})

const HistoryLink = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InnerHistoryLink)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
  }),
  renameProps({
    rrnhStore: 'store',
  }),
  neverUpdate
)

export default enhance(HistoryLink)