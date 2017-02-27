import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {HistoryRouter} from 'react-router-nested-history'

render((
  <HistoryRouter>
    <App />
  </HistoryRouter>
), document.getElementById('root'))