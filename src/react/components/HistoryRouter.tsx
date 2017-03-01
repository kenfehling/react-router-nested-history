import * as React from 'react'
import {Component, Children, ReactNode, PropTypes, createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {Route} from 'react-router'
import {createStore, Store} from '../../store'
import {
  setZeroPage, loadFromUrl, startup, isInitialized, loadActions
} from '../../main'
import {canUseWindowLocation} from '../../util/location'
import DumbHistoryRouter from './DumbHistoryRouter'
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
  location?: string
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

export default class HistoryRouter extends Component<HistoryRouterProps, undefined> {
  private store:Store

  static childContextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const store:Store = createStore()
    this.store = store

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

    const {zeroPage} = this.props
    loadActions()
    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    startup()

    // Initialize the Containers in this group
    // (since most tab libraries lazy load tabs)
    const children = getChildren(this)
    children.forEach(c => renderToStaticMarkup(<R children={c} />))

    if (!isInitialized()) {
      loadFromUrl(this.getLocation())
    }
  }

  getChildContext() {
    return {
      store: this.store
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
      <DumbHistoryRouter{...this.props} />
    )
  }
}