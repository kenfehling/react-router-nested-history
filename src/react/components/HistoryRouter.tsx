import * as React from 'react'
import {Component, ReactNode} from 'react'
import {Location, History} from 'history'
import {connect, Store} from 'react-redux'
import store from '../store'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import {listenToLocation, unlistenToLocation} from '../actions/LocationActions'
import {addStepListener} from '../../main'
import {canUseWindowLocation} from '../../util/location'
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
  unlistenToLocation: () => any
}

class HistoryRouter extends Component<ConnectedHistoryRouterProps, undefined> {

  componentWillMount() {
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

  getCreateHistory():(options:any)=>History {
    return canUseWindowLocation ? createBrowserHistory : createMemoryHistory
  }

  render() {
    const pathname:string = this.getLocation()
    const createHistory:(options:any) => History = this.getCreateHistory()

    return (
      <DumbHistoryRouter
        {...this.props}
        createHistory={createHistory}
        pathname={pathname}
      />
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