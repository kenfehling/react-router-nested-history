import * as React from 'react'
import { Component, PropTypes } from 'react'
import { shallow, mount, render } from 'enzyme'
import DumbContainerGroup from '../../../../src/react/components/DumbContainerGroup'
import Container from '../../../../src/react/components/Container'
import store from '../../../../src/store'
import locationStore from '../../../../src/react/store'
import {locationChanged} from '../../../../src/react/actions/LocationActions'
import {createLocation} from 'history'
import {_resetHistory} from '../../../../src/browserFunctions'
import {TestComponent} from '../fixtures'
import CreateContainer from '../../../../src/model/actions/CreateContainer'
import Page from '../../../../src/model/Page'
import {
  getOrCreateGroup,
  getActiveContainerNameInGroup,
} from '../../../../src/main'
import CreateGroup from '../../../../src/model/actions/CreateGroup'
import ClearActions from '../../../../src/model/actions/ClearActions'
import SetZeroPage from '../../../../src/model/actions/SetZeroPage'

declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any
declare const jest:any
declare const Promise:any

describe('ContainerGroup', () => {
  const groupName:string = 'Group 1'

  beforeEach(async () => {
    await getOrCreateGroup(new CreateGroup({name: groupName}))
    await locationStore.dispatch(locationChanged(createLocation('/a/1')))
  })

  afterEach(async () => {
    _resetHistory()
    await store.dispatch(new SetZeroPage({url: null}))
    await store.dispatch(new ClearActions())
  })

  describe('currentContainerIndex', () => {
    it('can be set by user', () => {
      const createContainerAction:CreateContainer = new CreateContainer({
        groupName,
        name: 'Container 1',
        initialUrl: '/b/1',
        patterns: ['/a/:id']
      })
      const activePage:Page = new Page({
            url: '/a/1',
            params: {id: '1'},
            groupName,
            containerName: 'Container 1'
          })
      const g = (<DumbContainerGroup
          name={groupName}
          storedLastAction={createContainerAction}
          storedActivePage={activePage}
          storedIndexedStackOrder={[0]}
          storedCurrentContainerIndex={0}
          currentContainerIndex={1}>
        <Container groupName={groupName}
                       name='Container 1'
                       initialUrl='/a/1'
                       patterns={['/a/:id']}
                       >
          <TestComponent />
        </Container>
        <Container groupName={groupName}
                       name='Container 2'
                       initialUrl='/b/1'
                       patterns={['/b/:id']}
                       >
          <TestComponent />
        </Container>
      </DumbContainerGroup>)
      const renderedGroup = mount(g)
      expect(getActiveContainerNameInGroup(groupName)).toBe('Container 1')
      renderedGroup.unmount()
    })
  })

  describe('onContainerActivate', () => {
    let onContainerActivate
    const createContainerAction:CreateContainer = new CreateContainer({
      groupName,
      name: 'Container 1',
      initialUrl: '/b/1',
      patterns: ['/a/:id']
    })
    const activePage:Page = new Page({
      url: '/a/1',
      params: {id: '1'},
      groupName,
      containerName: 'Container 1'
    })

    interface AppState {
      currentContainerIndex: number
    }

    class App extends Component<void, AppState> {
      constructor(props) {
        super(props)
        this.state = {
          currentContainerIndex: 0
        }
      }
      render() {
        return (<DumbContainerGroup
            name={groupName}
            storedLastAction={createContainerAction}
            storedActivePage={activePage}
            storedIndexedStackOrder={[0]}
            storedCurrentContainerIndex={0}
            currentContainerIndex={this.state.currentContainerIndex}
            onContainerActivate={onContainerActivate}>
          <Container groupName={groupName}
                     name='Container 1'
                     initialUrl='/a/1'
                     patterns={['/a/:id']}
           >
            <TestComponent />
          </Container>
          <Container groupName={groupName}
                     name='Container 2'
                     initialUrl='/b/1'
                     patterns={['/b/:id']}
           >
            <TestComponent />
          </Container>
        </DumbContainerGroup>)
      }
    }

    let renderedApp
    const g = <App />

    beforeEach(() => {
      onContainerActivate = jest.fn()
      renderedApp = mount(g)
    })

    afterEach(() => {
      renderedApp.unmount()
    })

    it('fires when container is first activated', () => {
      expect(onContainerActivate.mock.calls.length).toBe(1)
    })
  })

  describe('context', () => {
    const initialUrl:string = '/a/2'
    const params:Object = {id: 2}
    const patterns:string[] = ['/a/:id']
    let renderedGroup, myComponent:any

    beforeEach(() => {
      const createContainerAction:CreateContainer = new CreateContainer({
        groupName,
        name: 'Container 1',
        initialUrl,
        patterns
      })
      const activePage:Page = new Page({
        url: initialUrl,
        params,
        groupName,
        containerName: 'Container 1'
      })
      const g = (
        <DumbContainerGroup
            name={groupName}
            storedLastAction={createContainerAction}
            storedActivePage={activePage}
            storedIndexedStackOrder={[0]}
            storedCurrentContainerIndex={0}>
          <Container groupName={groupName}
                     name='Container 1'
                     initialUrl='/a/1'
                     patterns={['/a/:id']}
           >
            <TestComponent />
          </Container>
        </DumbContainerGroup>
      )
      renderedGroup = mount(g)
      myComponent = renderedGroup.find(TestComponent)
    })

    afterEach(() => {
      renderedGroup.unmount()
    })

    it('provides groupName', () => {
      expect(myComponent.node.context.groupName).toBeDefined()
      expect(myComponent.node.context.groupName).toBe(groupName)
    })

    it('provides activePage', () => {
      expect(myComponent.node.context.activePage).toBeDefined()
      expect(myComponent.node.context.activePage.url).toBe(initialUrl)
      expect(myComponent.node.context.activePage.params).toEqual(params)
    })

    it('provides lastAction', () => {
      expect(myComponent.node.context.lastAction).toBeDefined()
      expect(myComponent.node.context.lastAction).toBeInstanceOf(CreateContainer)
    })
  })
})