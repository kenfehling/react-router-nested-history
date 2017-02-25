import React from 'react'
import {Route, Redirect} from 'react-router'
import {render} from 'react-dom'
import App from './components/App'
import {HistoryRouter} from 'react-router-nested-history'

render((
  <HistoryRouter>
    <div>
      <Route path='/' exact render={() => <Redirect to="/tabs/1" />} />
      <Route path='/tabs' exact render={() => <Redirect to="/tabs/1" />} />
      <Route path='/windows' exact render={() => <Redirect to="/windows/1" />} />
      <Route path='/foods' exact render={() => <Redirect to="/foods/Fruit" />} />
      <App />
    </div>
  </HistoryRouter>
), document.getElementById('root'))