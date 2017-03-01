import * as React from 'react'
import {Component, ReactNode} from 'react'
import {Router, StaticRouter} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import {canUseWindowLocation} from '../../util/browserFunctions'
declare const window:any

export interface DumbHistoryRouterProps {
  children?: ReactNode,
}

export default class DumbHistoryRouter extends
    Component<DumbHistoryRouterProps, undefined> {

  render() {
    const {children} = this.props
    if (canUseWindowLocation) {
      return <Router history={createBrowserHistory(this.props) as any}
                     children={children} />
    }
    else {
      return <StaticRouter {...this.props} />
    }
  }
}