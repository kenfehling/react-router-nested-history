// @flow
/* globals describe, it, expect, beforeEach */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import React, { Component, PropTypes } from 'react'
import { shallow, mount, render } from 'enzyme'
import ContainerGroup from '../../../src/react/components/ContainerGroup'
import Container from '../../../src/react/components/Container'
import HistoryRouter from '../../../src/react/components/HistoryRouter'
import { zeroPage } from '../../fixtures'
import {getZeroPage, getDerivedState, getActions} from "../../../src/main"
import {_resetHistory} from "../../../src/browserFunctions"
import {CREATE_CONTAINER} from "../../../src/constants/ActionTypes"
import type { Action } from '../../../src/types'
import { setZeroPage} from "../../../src/actions/HistoryActions";
import store from '../../../src/store'

describe('ContainerGroup', () => {

  beforeEach(() => {
    _resetHistory()
    store.dispatch(setZeroPage(null))
  })

  function getWindowZIndex(indexedStackOrder, index) {
    if (indexedStackOrder.length > index) {
      return indexedStackOrder.length - indexedStackOrder[index] + 1
    }
    else {
      return 1
    }
  }

  const Window = ({className, initialUrl, index, indexedStackOrder, switchTo}) => {
    return <Container initialUrl={initialUrl} patterns={[initialUrl, initialUrl + '/:page']}>
      <div className={`window ${className}`} onClick={() => switchTo(index)}
           style={{zIndex: getWindowZIndex(indexedStackOrder, index)}}>
      </div>
    </Container>
  }

  class App extends Component {
    static propTypes = {
      customZeroPage: PropTypes.string
    }

    constructor(props) {
      super(props)
      this.state = {
        activeWindowIndex: 0,
        indexedStackOrder: []
      }
    }

    onContainerSwitch({activeContainer, indexedStackOrder}) {
      this.setState({
        activeWindowIndex: activeContainer.index,
        indexedStackOrder
      })
    }

    renderWindow(index) {
      return (<Window className={'window' + (index + 1)}
                      initialUrl={'/windows/' + (index + 1)}
                      index={index}
                      indexedStackOrder={this.state.indexedStackOrder}
                      switchTo={() => this.setState({activeWindowIndex: index})} />)
    }

    render() {
      const {customZeroPage} = this.props
      return (<HistoryRouter location='/windows/2' zeroPage={customZeroPage}>
        <div className="windows">
          <h2>Windows example</h2>
          <div className="description">
            <p>Each window has its own individual history.</p>
            <p>Clicking on a window brings it to the front.</p>
          </div>
          <ContainerGroup currentContainerIndex={this.state.activeWindowIndex}
                          onContainerSwitch={this.onContainerSwitch.bind(this)}
                          useDefaultContainer={false}>
            {this.renderWindow(0)}
            {this.renderWindow(1)}
          </ContainerGroup>
        </div>
      </HistoryRouter>)
    }
  }

  const AppWithZeroPage = () => <App customZeroPage={'MY CUBANS'} />
  const AppWithoutZeroPage = () => <App />

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

  it('uses a default zeroPage if not provided', () => {
    const app = mount(<AppWithoutZeroPage />)
    const zeroPage = getZeroPage()
    expect(zeroPage).toBe('/windows/1')
    app.unmount()
  })

  it('sets useDefaultContainer from props', () => {
    const app = mount(<AppWithZeroPage />)
    const container1 = app.find(Container).nodes[0]
    const action1:Action = getActions()[0]
    expect(container1.context.useDefaultContainer).toBe(false)
    expect(action1.type).toBe(CREATE_CONTAINER)
    expect(action1.data.useDefault).toBe(false)
    expect(getDerivedState().groups[0].containers[0].isDefault).toBe(false)
  })
})