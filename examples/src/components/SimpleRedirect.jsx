import React from 'react'
import {Route, Redirect} from 'react-router'

export default ({from, to}) => (
  <Route path={from} exact render={() => <Redirect to={to} />} />
)