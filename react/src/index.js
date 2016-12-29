import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { HistoryRouter } from '../../../dist/tab-history-library'

render((
  <HistoryRouter>
    <App />
  </HistoryRouter>
), document.getElementById('root'))