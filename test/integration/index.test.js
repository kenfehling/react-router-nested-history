import * as React from 'react'
import { Component, PropTypes } from 'react'
import {shallow, mount, render} from 'enzyme'
import { Match, Miss, Redirect } from 'react-router'
import {
  HistoryRouter, WindowGroup, Window, Container
} from 'react-router-nested-history'

describe('Container', () => {
  let app

  beforeEach(() => {
    const a = (
        <HistoryRouter>
          <WindowGroup name='desktop'>
            <Window>
              <Container name='tools'
                         resetOnLeave={true}
                         initialUrl={'/tools/power'}
                         patterns={['/tools/power']}>
              </Container>
            </Window>
          </WindowGroup>
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