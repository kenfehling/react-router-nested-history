import * as React from 'react'
import {Component, Children, ReactNode, PropTypes, createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {connect, Store} from 'react-redux'
import {Route} from 'react-router'
import store from '../store'
import {listenToLocation, unlistenToLocation} from '../actions/LocationActions'
import {
  setZeroPage, loadFromUrl, startup, listenToStore, isInitialized, loadActions,
  addStepListener
} from '../../main'
import {canUseWindowLocation} from '../../util/location'
import LocationState from '../model/LocationState'
import DumbHistoryRouter from './DumbHistoryRouter'
import LocationTitle from '../model/LocationTitle'
import {getTitleForUrl} from '../util/titles'
import * as R from 'ramda'
import cloneElement = React.cloneElement
import DumbContainerGroup from './DumbContainerGroup'
import ContainerGroup from './ContainerGroup'
declare const window:any

export interface HistoryRouterProps {
  basename?: string,
  forceRefresh?: boolean,
  getUserConfirmation?: Function,
  keyLength?: number,
  children?: ReactNode,
  zeroPage?: string,
  location: string
}

type RouterPropsWithStore = HistoryRouterProps & {
  store: Store<LocationState>
}

export type ConnectedHistoryRouterProps = HistoryRouterProps & {
  titles: LocationTitle[],
  listenToLocation: () => any,
  unlistenToLocation: () => any
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

class HistoryRouter extends Component<ConnectedHistoryRouterProps, undefined> {
  constructor(props) {
    super(props)

    class R extends Component<{children: ReactNode}, undefined> {
      static childContextTypes = {
        initializing: PropTypes.bool,
        router: PropTypes.object
      }

      getChildContext() {
        return {
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

    const onStep = (currentUrl:string) => {
      const {titles} = this.props
      const title = getTitleForUrl(titles, currentUrl)
      if (canUseWindowLocation) {
        if (title) {
          document.title = title
        }
        else {
          console.warn('Cannot find title for ' + currentUrl)
        }
      }
    }
    addStepListener({before: onStep, after: onStep})
    const {zeroPage, listenToLocation} = this.props
    loadActions()
    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    startup()

    // Initialize the Containers in this group
    // (since most tab libraries lazy load tabs)
    const children = getChildren(this)
    children.forEach(c => renderToStaticMarkup(<R children={c} />))

    listenToStore()
    listenToLocation && listenToLocation()

    if (!isInitialized()) {
      loadFromUrl(this.getLocation())
    }
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    const {unlistenToLocation} = this.props
    //this.unlistenToStore()
    unlistenToLocation && unlistenToLocation()
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
      <DumbHistoryRouter{...this.props} />
    )
  }
}

const ConnectedHistoryRouter = connect(
  (state:LocationState, ownProps:RouterPropsWithStore) => ({
    titles: state.titles
  }),
  {listenToLocation, unlistenToLocation}
)(HistoryRouter)

export default (props:HistoryRouterProps) => (
  <ConnectedHistoryRouter store={store} {...props} />
)