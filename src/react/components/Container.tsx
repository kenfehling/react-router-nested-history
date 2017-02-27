import * as React from 'react'
import { Component, PropTypes, ReactNode } from 'react'
import {connect, Store} from 'react-redux'
import store from '../store'
import DumbContainer from './DumbContainer'
import LocationState from '../model/LocationState'
import {getOrCreateContainer} from '../../main'
import {renderToStaticMarkup} from 'react-dom/server'
import {addTitle} from '../actions/LocationActions'
import {patternsMatch} from '../../util/url'
import CreateContainer from '../../model/actions/CreateContainer'
import * as R from 'ramda'
import {canUseDOM} from 'history/ExecutionEnvironment'

interface ContainerProps {
  children?: ReactNode,
  name: string,
  animate?: boolean,
  initialUrl: string,
  patterns: string[],
  resetOnLeave?: boolean,
  className?: string,
  style?: any
}

type InnerContainerProps = ContainerProps & {
  pathname: string,
  addTitle: (LocationTitle) => any
}

type ConnectedContainerProps = InnerContainerProps & {
  store: Store<LocationState>
}

class Container extends Component<InnerContainerProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string.isRequired,
    initializing: PropTypes.bool,
    useDefaultContainer: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool
  }

  addTitleForPath(pathname:string) {
    const {addTitle} = this.props
    if (canUseDOM) {
      addTitle({
        pathname,
        title: document.title
      })
    }
  }

  constructor(props, context) {
    super(props, context)
    const {
      children,
      name,
      patterns,
      initialUrl,
      animate=true,
      resetOnLeave=false,
    } = this.props
    const {
      groupName,
      initializing=false,
      useDefaultContainer=true
    } = this.context

    getOrCreateContainer(new CreateContainer({
      name,
      groupName,
      initialUrl,
      patterns,
      resetOnLeave,
      useDefault: useDefaultContainer
    }))

    if (initializing) {
      class T extends Component<undefined, undefined> {
        static childContextTypes = DumbContainer.childContextTypes

        getChildContext() {
          return {
            groupName,
            animate,
            containerName: name,
            pathname: initialUrl,
            patterns: patterns
          }
        }

        render() {
          return <div>{children}</div>
        }
      }

      renderToStaticMarkup(<T />)
      this.addTitleForPath(initialUrl)
    }
  }

  componentDidUpdate() {
    const {patterns, pathname} = this.props
    if (pathname) {
      if (patternsMatch(patterns, pathname)) {
        this.addTitleForPath(pathname)
      }
    }
  }

  render() {
    const {initializing} = this.context
    if (initializing) {
      return <div></div>
    }
    else {
      const {animate=true} = this.props
      const props = {...this.props, ...this.context, animate}
      return <DumbContainer {...props} />
    }
  }
}

const mapStateToProps = (state:LocationState,
                         ownProps:ConnectedContainerProps):InnerContainerProps => {
  return {
    ...ownProps,
    pathname: state.pathname
  }
}

const ConnectedContainer = connect(
  mapStateToProps,
  {addTitle}
)(Container)

export default props => <ConnectedContainer store={store} {...props} />