import React, { PropTypes } from 'react'
import StaticRouter from 'react-router/StaticRouter'
import History from 'react-router/History'
import createHistory from './createHistory';

const BrowserRouter = ({
    basename,
    forceRefresh,
    getUserConfirmation,
    keyLength,
    ...routerProps
}) => (
    <History
        createHistory={createHistory}
        historyOptions={{
      basename,
      forceRefresh,
      getUserConfirmation,
      keyLength
    }}
    >
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
    </History>
)

BrowserRouter.propTypes = {
  basename: PropTypes.string,
  forceRefresh: PropTypes.bool,
  getUserConfirmation: PropTypes.func,
  keyLength: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
}

export default BrowserRouter
