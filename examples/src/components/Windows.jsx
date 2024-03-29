import React from 'react'
import {
  Container, WindowGroup, HistoryWindow, HistoryRoute, HistoryLink, HeaderLink
} from 'react-router-nested-history'
import './Windows.css'
import Head from './Head'

const windowName = (index) => 'window' + (index + 1)
const windowUrl = (index) => '/windows/' + (index + 1)

const WindowMaster1 = () => (
  <div className='page'>
    <p>Hello</p>
    <HistoryLink to="/windows/1/boris">Boris</HistoryLink>
    <Head title='Window 1' />
  </div>
)

const WindowMaster2 = () => (
  <div className='page'>
    <p>World</p>
    <HistoryLink to="/windows/2/natasha">Natasha</HistoryLink>
    <Head title='Window 2' />
  </div>
)

const WindowPage = ({match:{params:{page}}}) => (
  <div className='page'>
    Page: {page}
    <Head title={'Windows: ' + page} />
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
                 draggable={true}
                 draggableProps={{
                   handle: '.toolbar'
                 }}
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

export default () => (
  <div className="windows">
    <h2>Window example</h2>
    <div className="description">
      <p>Each window has its own individual history.</p>
      <p>Clicking on a window brings it to the front.</p>
    </div>
    <WindowGroup name='windows'>
      {({resetWindowPositions}) => (
        <div>
          <div className='window-group'>
            <ExampleWindow index={0}
                           masterComponent={WindowMaster1}
            />
            <ExampleWindow index={1}
                           masterComponent={WindowMaster2}
                           middle={0}
                           center={0}
                           visible={false}
            />
          </div>
          <div className='window-menu'>
            <HeaderLink toContainer={windowName(0)}><button>{windowName(0)}</button></HeaderLink>
            <HeaderLink toContainer={windowName(1)}><button>{windowName(1)}</button></HeaderLink>
            <button onClick={resetWindowPositions}>Reset positions</button>
          </div>
        </div>
      )}
    </WindowGroup>
  </div>
)