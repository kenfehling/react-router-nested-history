import React from 'react'
import {
  Container, WindowGroup, Window, HistoryMatch
} from 'react-router-nested-history'
import WindowMaster1 from '../components/WindowMaster1'
import WindowMaster2 from '../components/WindowMaster2'
import WindowPage from '../components/WindowPage'
import './Windows.css'

const windowName = (index:number) => 'window' + (index + 1)
const windowUrl = (index:number) => '/windows/' + (index + 1)

const ExampleWindow = ({index, masterComponent}) => (
  <Window className={`window ${windowName(index)}`}>
    <Container name={windowName(index)}
               initialUrl={windowUrl(index)}
               patterns={[windowUrl(index), windowUrl(index) + '/:page']}
    >
      <HistoryMatch exactly
                    pattern={windowUrl(index)}
                    component={masterComponent}
      />
      <HistoryMatch exactly
                    pattern={windowUrl(index) + '/:page'}
                    component={WindowPage}
      />
    </Container>
  </Window>
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