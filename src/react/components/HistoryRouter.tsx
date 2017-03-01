import * as React from 'react'
import {Component, Children, ReactNode, PropTypes, createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {Route} from 'react-router'
import {connect, Dispatch} from 'react-redux'
import {createStore, Store} from '../../store'
import DumbHistoryRouter from './DumbHistoryRouter'
import * as R from 'ramda'
import cloneElement = React.cloneElement
import DumbContainerGroup from './DumbContainerGroup'
import ContainerGroup from './ContainerGroup'
import IUpdateData from '../../model/interfaces/IUpdateData'
import Startup from '../../model/actions/Startup'
import * as browser from '../../browserFunctions'
import InitializedState from '../../model/InitializedState'
import LoadFromUrl from '../../model/actions/LoadFromUrl'
import SetZeroPage from '../../model/actions/SetZeroPage'
import {canUseWindowLocation} from '../../browserFunctions'
import StepRunner from './StepRunner'
declare const window:any

export interface HistoryRouterProps {
  basename?: string
  forceRefresh?: boolean
  getUserConfirmation?: Function
  keyLength?: number
  children?: ReactNode
  zeroPage?: string
  location?: string
}

type RouterPropsWithStore = HistoryRouterProps & {
  store: Store
}

type ConnectedRouterProps = RouterPropsWithStore & {
  isInitialized: boolean
  startup: () => void
  loadFromUrl: (url:string) => void
  setZeroPage: (url:string) => void
}

/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
function getChildren(component) {
  if (!(component instanceof Component) && !component.type) {
    return []
  }
  else if (component instanceof ContainerGroup || component.type === ContainerGroup ||
    component instanceof DumbContainerGroup || component.type === DumbContainerGroup) {
    return [component]  // Stop if you find a ContainerGroup
  }
  else if (component.props && component.props.children) {
    if (component.props.children instanceof Function) {
      return getChildren(createElement(component.props.children))
    }
    else {
      const children = Children.toArray(component.props.children)
      return R.flatten(children.map(c => getChildren(c)))
    }
  }
  else if (component.type instanceof Function && !component.type.name) {
    try {
      return getChildren(component.type())
    }
    catch(e) {
      return getChildren(new component.type(component.props).render())
    }

  }
  else {  // no children
    return [component]
  }
}

class HistoryRouter extends Component<ConnectedRouterProps, undefined> {
  static childContextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const {
      store,
      zeroPage,
      setZeroPage,
      startup,
      loadFromUrl,
      isInitialized
    } = this.props

    class R extends Component<{children: ReactNode}, undefined> {
      static childContextTypes = {
        store: PropTypes.object.isRequired,
        initializing: PropTypes.bool,
        router: PropTypes.object,
      }

      getChildContext() {
        return {
          store,
          initializing: true,
          router: {
            location: {pathname: '/'},
            listen: () => {},
            push: () => {},
            replace: () => {}
          }
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    startup()

    // Initialize the Containers in this group
    // (since most tab libraries lazy load tabs)
    const children = getChildren(this)
    children.forEach(c => renderToStaticMarkup(<R children={c} />))

    if (!isInitialized) {
      loadFromUrl(this.getLocation())
    }
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  getLocation():string {
    if (canUseWindowLocation) {
      return window.location.pathname
    }
    else {
      const location:string|undefined = this.props.location
      if (location) {
        return location
      }
      else {
        console.warn('You should pass location when testing')
        return '/'
      }
    }
  }

  render() {
    return (
      <div>
        <DumbHistoryRouter{...this.props} />
        <StepRunner store={this.props.store} />
        <TitleSetter store={this.props.store} />
      </div>
    )
  }
}

const mapStateToProps = (state:IUpdateData) => ({
  isInitialized: state.state instanceof InitializedState
})

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
                            ownProps:RouterPropsWithStore) => ({
  startup: () => dispatch(new Startup({
    fromRefresh: browser.wasLoadedFromRefresh
  })),
  loadFromUrl: (url:string) => dispatch(new LoadFromUrl({
    url,
    fromRefresh: browser.wasLoadedFromRefresh
  })),
  setZeroPage: (url:string) => dispatch(new SetZeroPage({url}))
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:RouterPropsWithStore):ConnectedRouterProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHistoryRouter = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(HistoryRouter)

export default (props:HistoryRouterProps) => (
  <ConnectedHistoryRouter store={createStore()} {...props} />
)