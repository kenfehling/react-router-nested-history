import * as React from 'react'
import {ReactNode} from 'react'
import {Router, StaticRouter} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import {canUseWindowLocation} from '../../util/browserFunctions'
declare const window:any

export interface DumbHistoryRouterProps {
  children?: ReactNode
  context?: any
}

const DumbHistoryRouter = ({children, context}:DumbHistoryRouterProps) => (
  canUseWindowLocation ?
    <Router history={createBrowserHistory(this.props) as any}
            children={children}
    /> :
    <StaticRouter {...this.props} children={children} context={context} />
)

export default DumbHistoryRouter