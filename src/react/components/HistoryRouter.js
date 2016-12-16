import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import store from '../store'
import StaticRouter from 'react-router/StaticRouter'
import History from 'react-router/History'
import createHistory from './createHistory'
import {listenToLocation} from "../actions/LocationActions";

class HistoryRouter extends Component {
  constructor(props) {
    super(props)
    props.listenToLocation()
  }

  render() {
    const {
      basename,
          forceRefresh,
          getUserConfirmation,
          keyLength,
    ...routerProps
    } = this.props;

    return (<History
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
  ])
}

const ConnectedHistoryRouter = connect(
  state => ({}),
  { listenToLocation }
)(HistoryRouter)

export default props => <ConnectedHistoryRouter store={store} {...props} />