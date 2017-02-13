import * as React from 'react'
import { Component, PropTypes } from 'react'
import { shallow, mount, render } from 'enzyme'
import ContainerGroup from '../../../../src/react/components/ContainerGroup'
import Container from '../../../../src/react/components/Container'
import HistoryRouter from '../../../../src/react/components/HistoryRouter'
import {_resetHistory} from '../../../../src/browserFunctions'
import store from '../../../../src/store'
import {waitFor} from '../../helpers'
import SetZeroPage from '../../../../src/model/actions/SetZeroPage'
import ClearActions from '../../../../src/model/actions/ClearActions'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('HistoryRouter', () => {

  afterEach(async () => {
    _resetHistory()
    await store.dispatch(new SetZeroPage({url: null}))
    await store.dispatch(new ClearActions())
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
    return <Container name='Container 1'
                      initialUrl={initialUrl}
                      patterns={[initialUrl, initialUrl + '/:page']}>
      <div className={`window ${className}`} onClick={() => switchTo(index)}
           style={{zIndex: getWindowZIndex(indexedStackOrder, index)}}>
      </div>
    </Container>
  }

  interface AppProps {
    customZeroPage?: string
  }

  interface AppState {
    activeWindowIndex: number,
    indexedStackOrder: number[]
  }

  class App extends Component<AppProps, AppState> {
    constructor(props) {
      super(props)
      this.state = {
        activeWindowIndex: 0,
        indexedStackOrder: []
      }
    }

    onContainerActivate({activeContainerIndex, indexedStackOrder}) {
      this.setState({
        activeWindowIndex: activeContainerIndex,
        indexedStackOrder
      })
    }

    renderWindow(index) {
      return (<Window
          className={'window' + (index + 1)}
          initialUrl={'/windows/' + (index + 1)}
          index={index}
          indexedStackOrder={this.state.indexedStackOrder}
          switchTo={() => this.setState({activeWindowIndex: index})} />)
    }

    render() {
      const {customZeroPage} = this.props
      return (<HistoryRouter location='/windows/2' zeroPage={customZeroPage}>
        <div className='windows'>
          <h2>Windows example</h2>
          <div className='description'>
            <p>Each window has its own individual history.</p>
            <p>Clicking on a window brings it to the front.</p>
          </div>
          <ContainerGroup
              name='Group 1'
              currentContainerIndex={this.state.activeWindowIndex}
              onContainerActivate={this.onContainerActivate.bind(this)}
              useDefaultContainer={false}
          >
            {this.renderWindow(0)}
            {this.renderWindow(1)}
          </ContainerGroup>
        </div>
      </HistoryRouter>)
    }
  }

  const AppWithZeroPage = () => <App customZeroPage='/kramer' />
  const AppWithoutZeroPage = () => <App />

  it('uses a default zeroPage if not provided', () => {
    const app = mount(<AppWithoutZeroPage />)
    return waitFor(() => store.getActions().length > 3).then(() => {
      const zeroPage = store.getState().getZeroPage()
      expect(zeroPage.url).toBe('/windows/1')
      app.unmount()
    })
  })
})