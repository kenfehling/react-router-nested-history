import * as React from 'react'
import { Component, PropTypes } from 'react'
import {shallow, mount, render} from 'enzyme'
import { Match, Miss, Redirect } from 'react-router'
import App from '../../examples/react/src/containers/App'
import { HistoryRouter } from 'react-router-nested-history'

describe('Container', () => {
  let app

  beforeEach(() => {
    const a = (
        <HistoryRouter>
          <div>
            <Match pattern='/' exactly
                   render={() => <Redirect to="/tabs/1" />}/>
            <Match pattern='/tabs' exactly
                   render={() => <Redirect to="/tabs/1" />}/>
            <Match pattern='/windows' exactly
                   render={() => <Redirect to="/windows/1" />}/>
            <App />
          </div>
        </HistoryRouter>
    )
    app = mount(a)
  })

  afterEach(() => {
    app.unmount()
  })

  it('renders', () => {

  })
})