import * as React from 'react'
import {ReactNode} from 'react'
import {Router, StaticRouter} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import {canUseDOM} from 'exenv'
declare const window:any

export interface DumbHistoryRouterProps {
  children?: ReactNode
  context?: any
}

const DumbHistoryRouter = ({children, context}:DumbHistoryRouterProps) => (
  canUseDOM ?
    <Router history={createBrowserHistory(this.props) as any}
            children={children}
    /> :
    <StaticRouter {...this.props} children={children} context={context} />
)

export default DumbHistoryRouter