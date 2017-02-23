import * as React from 'react'
import {Component, ReactNode} from 'react'
import {History} from 'history'
import {Router} from 'react-router'
import {
  setZeroPage, loadFromUrl, startup, listenToStore, isInitialized, loadActions
} from '../../main'
import createBrowserHistory from 'history/createBrowserHistory'
declare const window:any

export interface DumbHistoryRouterProps {
  pathname: string,
  createHistory: (options:any) => History,
  zeroPage?: string
  basename?: string,
  forceRefresh?: boolean,
  getUserConfirmation?: Function,
  keyLength?: number,
  children?: ReactNode,

  listenToLocation?: () => any,
  unlistenToLocation?: () => any
}

export default class DumbHistoryRouter extends
    Component<DumbHistoryRouterProps, undefined> {

  componentWillMount() {
    const {zeroPage, listenToLocation} = this.props
    loadActions()
    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    startup()
    listenToStore()
    listenToLocation && listenToLocation()
  }

  componentDidUpdate() {
    if (!isInitialized()) {
      loadFromUrl(this.props.pathname)
    }
  }

  componentWillUnmount() {
    const {unlistenToLocation} = this.props
    //this.unlistenToStore()
    unlistenToLocation && unlistenToLocation()
  }

  history = createBrowserHistory(this.props) as any

  render() {
    const {children} = this.props
    return <Router history={this.history} children={children} />
  }
}