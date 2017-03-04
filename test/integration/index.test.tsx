import * as React from 'react'
import {Component, PropTypes} from 'react'
import {shallow, mount, render} from 'enzyme'
import {waitFor} from '../helpers'
import store from '../../src/store'
import Container from '../../src/react/components/Container'
import HistoryRouter from '../../src/react/components/HistoryRouter'
import WindowGroup from '../../src/react/components/WindowGroup'
import Window from '../../src/react/components/HistoryWindow'
import InitializedState from '../../src/model/InitializedState'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('WindowGroup', () => {
  it('works', () => {
    expect(1).toBe(1)
  })

/*
  beforeEach(() => {
    jest.useRealTimers()
    jest.runAllTimers()
  })

  describe.only('function children', () => {
    let app

    beforeEach((done) => {
      const a = (
        <HistoryRouter location='/tools/power'>
          <WindowGroup name='desktop' children={() => (
            <Window>
              <Container name='tools'
                         initialUrl={'/tools/power'}
                         patterns={['/tools/power']}>
              </Container>
            </Window>
          )} />
        </HistoryRouter>
      )
      app = mount(a)

      setTimeout(() => done(), 1)
    })

    afterEach(() => {
      app.unmount()
    })

    it('renders', () => {
      const c = app.find('Container').node
      expect(c).toBeDefined()
    })
  })

  describe('non-function children', () => {
    let app

    beforeEach(() => {
      const a = (
        <HistoryRouter location='/tools/power'>
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
      return waitFor(() => store.getState() instanceof InitializedState)
    })

    afterEach(() => {
      app.unmount()
    })

    it('renders', () => {
      const c = app.find('Container').node
      expect(c).toBeDefined()
    })
  })
  */
})