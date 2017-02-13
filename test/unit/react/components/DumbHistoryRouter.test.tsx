import * as React from 'react'
import {shallow, mount, render} from 'enzyme'
import ContainerGroup from '../../../../src/react/components/ContainerGroup'
import Container from '../../../../src/react/components/Container'
import DumbHistoryRouter from '../../../../src/react/components/DumbHistoryRouter'
import {_resetHistory} from '../../../../src/browserFunctions'
import store from '../../../../src/store'
import locationStore from '../../../../src/react/store'
import {locationChanged} from '../../../../src/react/actions/LocationActions'
import {createLocation} from 'history'
import createMemoryHistory from 'history/createMemoryHistory'
import {TestComponent} from '../fixtures'
import SetZeroPage from '../../../../src/model/actions/SetZeroPage'
import CreateGroup from '../../../../src/model/actions/CreateGroup'
import CreateContainer from '../../../../src/model/actions/CreateContainer'
import Action from '../../../../src/model/Action'
import Startup from '../../../../src/model/actions/Startup'
import LoadFromUrl from '../../../../src/model/actions/LoadFromUrl'
import {waitFor} from '../../helpers'
import ClearActions from '../../../../src/model/actions/ClearActions'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('DumbHistoryRouter', () => {

  beforeEach(async () => {
    await locationStore.dispatch(locationChanged(createLocation('/a/1')))
  })

  afterEach(async () => {
    _resetHistory()
    await store.dispatch(new SetZeroPage({url: null}))
    await store.dispatch(new ClearActions())
  })

  describe('with zero page', () => {
    let router
    const r = (
      <DumbHistoryRouter createHistory={createMemoryHistory}
                         location='/a/1' zeroPage='/a'>
        <ContainerGroup name='Group 1'>
          <Container name='Container 1'
                         groupName='Group 1'
                         initialUrl='/a/1'
                         location='/a/1'
                         patterns={['/a/:id']}>
            <TestComponent />
          </Container>
          <Container name='Container 2'
                         groupName='Group 1'
                         initialUrl='/b/1'
                         location='/a/1'
                         patterns={['/b/:id']}>
            <TestComponent />
          </Container>
        </ContainerGroup>
      </DumbHistoryRouter>
    )

    beforeEach(() => {
      router = mount(r)
    })

    afterEach(() => {
      router.unmount()
    })

    it('adds a SetZeroPage and Startup action', () => {
      return waitFor(() => store.getActions().length > 5).then(() => {
        const actions:Action[] = store.getActions()
        expect(actions[0]).toBeInstanceOf(SetZeroPage)
        expect(actions[1]).toBeInstanceOf(Startup)
        expect(actions[2]).toBeInstanceOf(CreateGroup)
        expect(actions[3]).toBeInstanceOf(CreateContainer)
        expect(actions[4]).toBeInstanceOf(CreateContainer)
        expect(actions[5]).toBeInstanceOf(LoadFromUrl)
      })
    })

  })

  describe('without zero page', () => {
    let router
    const r = (
      <DumbHistoryRouter createHistory={createMemoryHistory} location='/a/1'>
        <ContainerGroup name='Group 1'>
          <Container name='Container 1'
                         groupName='Group 1'
                         initialUrl='/a/1'
                         location='/a/1'
                         patterns={['/a/:id']}>
            <TestComponent />
          </Container>
          <Container name='Container 2'
                         groupName='Group 1'
                         initialUrl='/b/1'
                         location='/a/1'
                         patterns={['/b/:id']}>
            <TestComponent />
          </Container>
        </ContainerGroup>
      </DumbHistoryRouter>
    )

    beforeEach(async () => {
      router = mount(r)
    })

    afterEach(() => {
      router.unmount()
    })

    it('adds a Startup action', () => {
      return waitFor(() => store.getActions().length > 4).then(() => {
        const actions:Action[] = store.getActions()
        expect(actions[0]).toBeInstanceOf(Startup)
        expect(actions[1]).toBeInstanceOf(CreateGroup)
        expect(actions[2]).toBeInstanceOf(CreateContainer)
        expect(actions[3]).toBeInstanceOf(CreateContainer)
        expect(actions[4]).toBeInstanceOf(LoadFromUrl)
      })
    })
  })

})