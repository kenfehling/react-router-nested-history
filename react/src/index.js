import React from 'react'
import { Match, Miss, Redirect } from 'react-router'
import { render } from 'react-dom'
import App from './containers/App'
import { HistoryRouter } from 'react-router-nested-history'

render((
  <HistoryRouter>
    <div>
      <Match pattern='/' exactly render={() => <Redirect to="/tabs/1" />} />
      <Match pattern='/tabs' exactly render={() => <Redirect to="/tabs/1" />} />
      <Match pattern='/windows' exactly render={() => <Redirect to="/windows/1" />} />
      <App />
    </div>
  </HistoryRouter>
), document.getElementById('root'))