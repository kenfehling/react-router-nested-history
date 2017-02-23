import React from 'react'
import {
  Container, WindowGroup, Window, HistoryRoute, HistoryLink
} from 'react-router-nested-history'
import Helmet from 'react-helmet'
import './Windows.css'

const windowName = (index:number) => 'window' + (index + 1)
const windowUrl = (index:number) => '/windows/' + (index + 1)

const WindowMaster1 = () => (
  <div>
    <p>Hello</p>
    <HistoryLink to="/windows/1/boris">Boris</HistoryLink>
    <Helmet title='Window 1' />
  </div>
)

const WindowMaster2 = () => (
  <div>
    <div>World</div>
    <Helmet title='Window 2' />
  </div>
)

const WindowPage = ({match:{params:{page}}}) => (
  <div>
    Page: {page}
    <Helmet title={'Windows: ' + page} />
  </div>
)

const ExampleWindow = ({index, masterComponent}) => (
  <Window className={`window ${windowName(index)}`} children={({isOnTop}) => (
    <Container name={windowName(index)}
               animate={false}
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