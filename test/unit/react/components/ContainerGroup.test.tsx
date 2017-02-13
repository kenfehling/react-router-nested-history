import * as React from 'react'
import {Component, PropTypes} from 'react'
import {shallow, mount, render} from 'enzyme'
import ContainerGroup from '../../../../src/react/components/ContainerGroup'
import Container from '../../../../src/react/components/Container'
import {_resetHistory} from '../../../../src/browserFunctions'
import store from '../../../../src/store'
import locationStore from '../../../../src/react/store'
import {locationChanged} from '../../../../src/react/actions/LocationActions'
import {createLocation} from 'history'
import {TestComponent} from '../fixtures'
import {switchToContainerIndex} from '../../../../src/main'
import SetZeroPage from '../../../../src/model/actions/SetZeroPage'
import ClearActions from '../../../../src/model/actions/ClearActions'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any
declare const jest:any

describe('ContainerGroup', () => {
  const groupName:string = 'Group 1'

  beforeEach(async () => {
    await locationStore.dispatch(locationChanged(createLocation('/a/1')))
  })

  afterEach(async () => {
    _resetHistory()
    await store.dispatch(new SetZeroPage({url: null}))
    await store.dispatch(new ClearActions())
  })

  describe('onContainerActivate', () => {
    let onContainerActivate

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
        return (<ContainerGroup
            name={groupName}
            currentContainerIndex={this.state.currentContainerIndex}
            onContainerActivate={onContainerActivate}>
          <Container name='Container 1'
                         initialUrl='/a/1'
                         patterns={['/a/:id']}>
            <TestComponent />
          </Container>
          <Container name='Container 2'
                         initialUrl='/b/1'
                         patterns={['/b/:id']}>
            <TestComponent />
          </Container>
        </ContainerGroup>)
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

    it('fires when container is activated by the system', () => {
      switchToContainerIndex(groupName, 1)
      expect(onContainerActivate.mock.calls.length).toBe(2)
    })

    it('fires when container is switched by the user', () => {
      renderedApp.setState({currentContainerIndex: 1})
      expect(onContainerActivate.mock.calls.length).toBe(2)
    })

    describe('indexedStackOrder', () => {
      it('defaults to [1, 2, ... n]', () => {
        const iso = onContainerActivate.mock.calls[0][0].indexedStackOrder
        expect(iso).toEqual([0 ,1])
      })
    })
  })

  /*
  it('provides indexedStackOrder', () => {
    const app = mount(<AppWithZeroPage />)
    const group = app.find(ContainerGroup)
    const window1 = app.find(Window).nodes[0]
    const indexedStackOrder = window1.props.indexedStackOrder
    const currentContainerIndex = group.props().currentContainerIndex

    // TODO: Make work with redux-persist's async nature
    //expect(indexedStackOrder).toEqual([1, 0])
    //expect(currentContainerIndex).toBe(1)
    app.unmount()
  })
  */
})