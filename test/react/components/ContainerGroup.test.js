import React, { Component } from 'react'
import { shallow, mount, render } from 'enzyme'
import ContainerGroup from '../../../src/react/components/ContainerGroup'
import Container from '../../../src/react/components/Container'
import store from '../../../src/react/store'
import {locationChanged} from "../../../src/react/actions/LocationActions"

describe('ContainerGroup', () => {

  beforeEach(() => {
    store.dispatch(locationChanged({pathname: '/a'}))
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

  class Windows extends Component {
    constructor(props) {
      super(props)
      this.state = {
        activeWindowIndex: 0,
        indexedStackOrder: []
      }
    }

    onContainerSwitch({indexedStackOrder}) {
      this.setState({indexedStackOrder})
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
      return (<div className="windows">
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
      </div>)
    }
  }

  it('provides indexedStackOrder', () => {
    const windows = mount(<Windows />).find(Window).nodes
    const indexedStackOrder = windows[0].props.indexedStackOrder

    console.log(indexedStackOrder)
  })
})