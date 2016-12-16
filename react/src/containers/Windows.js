import React, { Component } from 'react'
import { Container, ContainerGroup, HistoryMatch } from '../../../../dist/tab-history-library'
import WindowMaster1 from '../components/WindowMaster1'
import WindowMaster2 from '../components/WindowMaster2'
import WindowPage from '../components/WindowPage'
import './Windows.css'

function getWindowZIndex(indexedStackOrder, index) {
  if (indexedStackOrder.length > index) {
    return indexedStackOrder.length - indexedStackOrder[index] + 1
  }
  else {
    return 1
  }
}

const Window = ({className, initialUrl, masterComponent, index, indexedStackOrder, switchTo}) => (
  <Container initialUrl={initialUrl} patterns={[initialUrl, initialUrl + '/:page']}>
    <div className={`window ${className}`} onClick={() => switchTo(index)}
         style={{zIndex: getWindowZIndex(indexedStackOrder, index)}}>
      <HistoryMatch exactly pattern={initialUrl} component={masterComponent}/>
      <HistoryMatch exactly pattern={initialUrl + '/:page'} component={WindowPage}/>
    </div>
  </Container>
)

export default class Windows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeWindowIndex: 0,
      indexedStackOrder: []
    }
  }

  onContainerSwitch(state) {
    this.setState({
      indexedStackOrder: state.indexedStackOrder
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
    return (<div className="windows">
      <h2>Windows example</h2>
      <div className="description">
        <p>Each window has its own individual history.</p>
        <p>Clicking on a window brings it to the front.</p>
      </div>
      <ContainerGroup currentContainerIndex={this.state.activeWindowIndex}
                      onContainerSwitch={this.onContainerSwitch.bind(this)}>
        {this.renderWindow(0, WindowMaster1)}
        {this.renderWindow(1, WindowMaster2)}
      </ContainerGroup>
    </div>)
  }
}