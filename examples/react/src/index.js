import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { BrowserRouter } from '../../../dist/tab-history-library'

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))