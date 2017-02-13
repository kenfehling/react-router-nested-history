import * as React from 'react'
import {PropTypes} from 'react'
import {shallow, mount, render} from 'enzyme'
import {getOrCreateGroup, getActiveContainerInGroup} from '../../../../src/main'
import {_resetHistory} from '../../../../src/browserFunctions'
import store from '../../../../src/store'
import Container from '../../../../src/react/components/Container'
import locationStore from '../../../../src/react/store'
import {createLocation} from 'history'
import {locationChanged} from '../../../../src/react/actions/LocationActions'
import {TestComponent} from '../fixtures'
import IContainer from '../../../../src/model/interfaces/IContainer'
import ClearActions from '../../../../src/model/actions/ClearActions'
import CreateGroup from '../../../../src/model/actions/CreateGroup'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

const groupName:string = 'Group 1'

describe('Container', () => {
  const mountOptions:Object = {
    context: {groupName},
    childContextTypes: {groupName: PropTypes.string.isRequired}}

  beforeEach(async () => {
    locationStore.dispatch(locationChanged(createLocation('/a/1', {})))
    await getOrCreateGroup(new CreateGroup({name: groupName}))
  })

  afterEach(async () => {
    _resetHistory()
    await store.dispatch(new ClearActions())
  })

  it('creates a model Container', async () => {
    const c = (
      <Container name='Container 1' initialUrl='/a/3' patterns={['/a/3']}>
        <TestComponent />
      </Container>
    )

    const container = mount(c, mountOptions)
    const activeContainer:IContainer = getActiveContainerInGroup(groupName)
    expect(activeContainer.name).toBe('Container 1')
    expect(activeContainer.groupName).toBe(groupName)
    expect(activeContainer.initialUrl).toBe('/a/3')
    expect(activeContainer.activePage.url).toBe('/a/3')

    container.unmount()
  })

  it('initializes even inside a loop', () => {
    const c = (
      <div>
        {['a', 'b', 'c'].map(x => (
          <Container key={x}
                     name={x}
                     initialUrl={'/' + x}
                     patterns={['/' + x]}
                     location='/'
                     useDefaultContainer={true}>
            <div></div>
          </Container>))}
      </div>
    )
    mount(c, mountOptions)
    expect(store.getState().groups[0].containers.length).toBe(3)
  })

})