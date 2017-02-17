import * as React from 'react'
import {Component, ReactNode} from 'react'
import {History, Location} from 'history'
import StaticRouter from 'react-router/StaticRouter'
import ReactRouterHistory from 'react-router/History'
import {
  setZeroPage, loadFromUrl, startup, listenToStore, isInitialized
} from '../../main'
import {locationToString, stringToLocation} from '../../util/location'
declare const window:any

export interface DumbHistoryRouterProps {
  location: string | Location,
  createHistory: (options:any) => History,
  zeroPage?: string
  basename?: string,
  forceRefresh?: boolean,
  getUserConfirmation?: Function,
  keyLength?: number,
  children?: ReactNode,

  listenToLocation?: () => any,
  unlistenToLocation?: () => any,
  locationChanged?: (location:Location) => any
}

export default class DumbHistoryRouter extends
    Component<DumbHistoryRouterProps, undefined> {

  componentWillMount() {
    const {location, zeroPage, listenToLocation, locationChanged} = this.props
    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    startup()
    listenToStore()
    locationChanged && locationChanged(stringToLocation(location))
    listenToLocation && listenToLocation()
  }

  componentDidUpdate() {
    if (!isInitialized()) {
      loadFromUrl(locationToString(this.props.location))
    }
  }

  componentWillUnmount() {
    const {unlistenToLocation} = this.props
    //this.unlistenToStore()
    unlistenToLocation && unlistenToLocation()
  }

  render() {
    const {
        basename,
        forceRefresh,
        getUserConfirmation,
        keyLength,
        createHistory,
        ...routerProps
    } = this.props

    return (
        <ReactRouterHistory
            createHistory={createHistory}
            historyOptions={{
            basename,
            forceRefresh,
            getUserConfirmation,
            keyLength
    }}>
          {({ history, action, location }) => (
              <StaticRouter
                  action={action}
                  location={location}
                  basename={basename}
                  onPush={history.push}
                  onReplace={history.replace}
                  blockTransitions={history.block}
                  {...routerProps}
              />
          )}
        </ReactRouterHistory>
    )
  }
}