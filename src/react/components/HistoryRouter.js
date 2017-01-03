import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux"
import store from '../store'
import StaticRouter from 'react-router/StaticRouter'
import History from 'react-router/History'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from "history/createMemoryHistory"
import { listenToLocation, locationChanged } from "../actions/LocationActions"
import { canUseWindowLocation } from '../../util/location'
import { loadFromUrl, listenToStore, setZeroPage } from "../../main"

class HistoryRouter extends Component {
  componentWillMount() {
    const {listenToLocation, locationChanged, zeroPage} = this.props
    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    listenToStore()
    if (canUseWindowLocation) {
      locationChanged(window.location)
    }
    else {
      locationChanged({pathname: this.props.location})
    }
    listenToLocation()
  }

  componentDidMount() {
    if (canUseWindowLocation) {
      loadFromUrl(window.location.pathname)
    }
    else {
      loadFromUrl(this.props.location)
    }
  }

  render() {
    const {
      basename,
          forceRefresh,
          getUserConfirmation,
          keyLength,
    ...routerProps
    } = this.props

    return (<History
            createHistory={canUseWindowLocation ? createBrowserHistory : createMemoryHistory}
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
    </History>)
  }
}

HistoryRouter.propTypes = {
  basename: PropTypes.string,
  forceRefresh: PropTypes.bool,
  getUserConfirmation: PropTypes.func,
  keyLength: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]),
  zeroPage: PropTypes.string
}

if (!canUseWindowLocation) {  // allow passing location in non-browser enviroment
  HistoryRouter.propTypes.location = PropTypes.string
}

const ConnectedHistoryRouter = connect(
  state => ({}),
  { listenToLocation, locationChanged }
)(HistoryRouter)

export default props => <ConnectedHistoryRouter store={store} {...props} />