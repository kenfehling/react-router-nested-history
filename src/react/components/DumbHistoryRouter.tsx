import * as React from 'react'
import {Router, StaticRouter} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import {canUseWindowLocation} from '../../util/browserFunctions'
declare const window:any

const DumbHistoryRouter = ({children}) => (
  canUseWindowLocation ?
    <Router history={createBrowserHistory(this.props) as any}
            children={children}
    /> :
    <StaticRouter {...this.props} context={{}} />
)

export default DumbHistoryRouter