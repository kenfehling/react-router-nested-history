/* global process */

import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {HistoryRouter} from 'react-router-nested-history'

console.log(process.env.NODE_ENV)

// Exposes React performance profiling tools for use in console
if (process.env.NODE_ENV === 'test') {
  require('expose-loader?Perf!react-addons-perf')
}

render((
  <HistoryRouter>
    <App />
  </HistoryRouter>
), document.getElementById('root'))