import React from 'react'
import { Match, Miss, Redirect } from 'react-router'
import { render } from 'react-dom'
import App from './containers/App'
import { HistoryRouter } from 'react-router-nested-history'

const getBasename = () => window.location.hostname === 'kenfehling.github.io' ?
    'react-router-nested-history' : ''

render((
  <HistoryRouter basename={getBasename()}>
    <div>
      <Match pattern='/' exactly component={() => <Redirect to="/tabs/1" />} />
      <Match pattern='/tabs' exactly component={() => <Redirect to="/tabs/1" />} />
      <Match pattern='/windows' exactly component={() => <Redirect to="/windows/1" />} />
      <Miss component={App} />
    </div>
  </HistoryRouter>
), document.getElementById('root'))