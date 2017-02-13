import * as React from 'react'
import {Component, ReactNode} from 'react'
import {Location, History} from 'history'
import {connect, Store} from 'react-redux'
import store from '../store'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import {
  listenToLocation, unlistenToLocation, locationChanged
} from '../actions/LocationActions'
import {addStepListener} from '../../main'
import {canUseWindowLocation, stringToLocation} from '../../util/location'
import LocationState from '../model/LocationState'
import DumbHistoryRouter from './DumbHistoryRouter'
import LocationTitle from '../model/LocationTitle'
import {getTitleForUrl} from '../util/titles'
declare const window:any

export interface HistoryRouterProps {
  basename?: string,
  forceRefresh?: boolean,
  getUserConfirmation?: Function,
  keyLength?: number,
  children?: ReactNode,
  zeroPage?: string,
  location?: string  // For testing with HistoryRouter (!canUseWindowLocation)
}

type RouterPropsWithStore = HistoryRouterProps & {
  store: Store<LocationState>
}

export type ConnectedHistoryRouterProps = HistoryRouterProps & {
  titles: LocationTitle[],
  listenToLocation: () => any,
  unlistenToLocation: () => any,
  locationChanged: (location:Location) => any
}

class HistoryRouter extends Component<ConnectedHistoryRouterProps, undefined> {

  componentWillMount() {
    const onStep = (currentUrl:string) => {
      const {titles} = this.props
      const title = getTitleForUrl(titles, currentUrl)
      if (title) {
        document.title = title
      }
      else {
        console.warn('Cannot find title for ' + currentUrl)
      }
    }
    addStepListener({before: onStep, after: onStep})
  }

  getLocation():Location {
    if (canUseWindowLocation) {
      return window.location
    }
    else {
      const location:string|undefined = this.props.location
      if (location) {
        return stringToLocation(location)
      }
      else {
        console.warn('You should pass _location when testing')
        return stringToLocation('/')
      }
    }
  }

  getCreateHistory():(options:any)=>History {
    return canUseWindowLocation ? createBrowserHistory : createMemoryHistory
  }

  render() {
    const location:Location = this.getLocation()
    const createHistory:(options:any) => History = this.getCreateHistory()

    return (
      <DumbHistoryRouter
        {...this.props}
        createHistory={createHistory}
        location={location}
      />
    )
  }
}

const ConnectedHistoryRouter = connect(
  (state:LocationState, ownProps:RouterPropsWithStore) => ({
    titles: state.titles
  }),
  {listenToLocation, unlistenToLocation, locationChanged}
)(HistoryRouter)

export default (props:HistoryRouterProps) => (
  <ConnectedHistoryRouter store={store} {...props} />
)