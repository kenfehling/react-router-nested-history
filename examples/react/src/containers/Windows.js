import React from 'react'
import {
  Container, WindowGroup, Window, HistoryRoute
} from 'react-router-nested-history'
import WindowMaster1 from '../components/WindowMaster1'
import WindowMaster2 from '../components/WindowMaster2'
import WindowPage from '../components/WindowPage'
import './Windows.css'

const windowName = (index:number) => 'window' + (index + 1)
const windowUrl = (index:number) => '/windows/' + (index + 1)

const ExampleWindow = ({index, masterComponent}) => (
  <Window className={`window ${windowName(index)}`} children={({isOnTop}) => (
    <Container name={windowName(index)}
               className={isOnTop ? 'top container' : 'container'}
               initialUrl={windowUrl(index)}
               patterns={[windowUrl(index), windowUrl(index) + '/:page']}
    >
      <HistoryRoute exact
                    path={windowUrl(index)}
                    component={masterComponent}
      />
      <HistoryRoute exact
                    path={windowUrl(index) + '/:page'}
                    component={WindowPage}
      />
    </Container>
  )} />
)

export default () => (
  <div className="windows">
    <h2>Windows example</h2>
    <div className="description">
      <p>Each window has its own individual history.</p>
      <p>Clicking on a window brings it to the front.</p>
    </div>
    <WindowGroup name='windows'>
      <ExampleWindow index={0} masterComponent={WindowMaster1} />
      <ExampleWindow index={1} masterComponent={WindowMaster2} />
    </WindowGroup>
  </div>
)