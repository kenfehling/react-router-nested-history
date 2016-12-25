import React, { Component } from 'react'
import { shallow, mount, render } from 'enzyme'
import ContainerGroup from '../../../src/react/components/ContainerGroup'
import Container from '../../../src/react/components/Container'
import HistoryRouter from '../../../src/react/components/HistoryRouter'
import { zeroPage } from '../../fixtures'

describe('ContainerGroup', () => {

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

    renderWindow(index, masterComponent) {
      return (<Window className={'window' + (index + 1)}
                      initialUrl={'/windows/' + (index + 1)}
                      index={index}
                      masterComponent={masterComponent}
                      indexedStackOrder={this.state.indexedStackOrder}
                      switchTo={() => this.setState({activeWindowIndex: index})} />)
    }

    render() {
      return (<HistoryRouter location='/windows/2' zeroPage={zeroPage}>
        <div className="windows">
          <h2>Windows example</h2>
          <div className="description">
            <p>Each window has its own individual history.</p>
            <p>Clicking on a window brings it to the front.</p>
          </div>
          <ContainerGroup currentContainerIndex={this.state.activeWindowIndex}
                          onContainerSwitch={this.onContainerSwitch.bind(this)}>
            {this.renderWindow(0)}
            {this.renderWindow(1)}
          </ContainerGroup>
        </div>
      </HistoryRouter>)
    }
  }

  it('provides indexedStackOrder', () => {
    const app = mount(<App />)
    const group = app.find(ContainerGroup)
    const window1 = app.find(Window).nodes[0]
    const indexedStackOrder = window1.props.indexedStackOrder
    const currentContainerIndex = group.props().currentContainerIndex

    // TODO: Make work with redux-persist's async nature
    //expect(indexedStackOrder).toEqual([1, 0])
    //expect(currentContainerIndex).toBe(1)
  })
})