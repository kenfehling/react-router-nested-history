import React, {Component} from 'react'
import {
  Container, WindowGroup, HistoryWindow, HistoryRoute, HistoryLink
} from 'react-router-nested-history'
import Helmet from 'react-helmet'
import './Windows.css'

const windowName = (index:number) => 'window' + (index + 1)
const windowUrl = (index:number) => '/windows/' + (index + 1)

const WindowMaster1 = () => (
  <div className='page'>
    <p>Hello</p>
    <HistoryLink to="/windows/1/boris">Boris</HistoryLink>
    <Helmet title='Window 1' />
  </div>
)

const WindowMaster2 = () => (
  <div className='page'>
    <div>World</div>
    <Helmet title='Window 2' />
  </div>
)

const WindowPage = ({match:{params:{page}}}) => (
  <div className='page'>
    Page: {page}
    <Helmet title={'Windows: ' + page} />
  </div>
)

const CloseButton = ({onClick}) => (
  <div onClick={onClick} className='close-btn'>X</div>
)

const Toolbar = ({name, onCloseClick}) => (
  <div className='toolbar'>
    <div className='title'>{name}</div>
    <CloseButton onClick={onCloseClick} />
  </div>
)

const ExampleWindow = ({index, masterComponent, name=windowName(index),
                        url=windowUrl(index), ...windowProps}) => (
  <HistoryWindow forName={name}
                 className={`window ${name}`}
                 topClassName={`top window ${name}`}
                 {...windowProps}
  >
    {({close}) => (
      <div>
        <Toolbar name={name} onCloseClick={close} />
        <Container name={name}
                   animate={false}
                   initialUrl={url}
                   patterns={[url, url + '/:page']}
        >
          <HistoryRoute exact
                        path={url}
                        component={masterComponent}
          />
          <HistoryRoute exact
                        path={url + '/:page'}
                        component={WindowPage}
          />
        </Container>
      </div>
    )}
  </HistoryWindow>
)

export default class Windows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentWindow: null,
      currentIndex: null
    }
  }

  onNameClick(index) {
    this.setState({currentName: windowName(index)})
  }

  onIndexClick(index) {
    this.setState({currentIndex: index})
  }

  render() {
    return (
      <div className="windows">
        <h2>Windows example</h2>
        <div className="description">
          <p>Each window has its own individual history.</p>
          <p>Clicking on a window brings it to the front.</p>
        </div>
        <div className='window-group'>
          <WindowGroup name='windows'
                       currentContainerName={this.state.currentName}
                       currentContainerIndex={this.state.currentIndex}>
            <ExampleWindow index={0}
                           masterComponent={WindowMaster1}
                           top={0}
                           left={15}

            />
            <ExampleWindow index={1}
                           masterComponent={WindowMaster2}
                           middle={0}
                           center={0}
            />
          </WindowGroup>
        </div>
        <div className='window-menu'>
          <button onClick={() => this.onNameClick(0)}>{windowName(0)}</button>
          <button onClick={() => this.onNameClick(1)}>{windowName(1)}</button>
          <button onClick={() => this.onIndexClick(0)}>0</button>
          <button onClick={() => this.onIndexClick(1)}>1</button>
        </div>
      </div>
    )
  }
}