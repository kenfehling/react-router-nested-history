import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { HistoryRouter } from '../../../dist/tab-history-library'

render((
  <HistoryRouter zeroPage='/'>
    <App />
  </HistoryRouter>
), document.getElementById('root'))