import React, {PropTypes, Component } from 'react'
import {
  Container, WindowGroup, HistoryRoute, HistoryLink, HistoryWindow
} from 'react-router-nested-history'
import Helmet from 'react-helmet'
import './MobileExample.css'

const toId = name => name.toLowerCase()
const toPath = name => `/mobile/${toId(name)}`

const MobileWindow = ({name, path=toPath(name), component, children, isDefault=false}) => (
  <HistoryWindow forName={toId(name)} className='mobile-window'>
    <Container name={toId(name)}
               initialUrl={path}
               patterns={[path]}
               isDefault={isDefault}
    >
      {component ?
        <HistoryRoute path={path} exact component={component}/> :
        <HistoryRoute path={path} exact children={children} />
      }
    </Container>
  </HistoryWindow>
)

const homeScreenIcons = [
  'Map',
  'Terminal',
  'Tools',
  'Editor',
  'Social',
  'Audio',
  'PDF',
  'Mobile'
]

const HomeScreenIcon = ({name, onClick}) => (
  <div className='icon' onClick={onClick}>
    {name}
  </div>
)

const HomeScreen = ({onIconClick}) => (
  <div className={'home-screen'}>
    <div className="inner-container">
      <div className="back-container"></div>
      <div className="front-container">
        {homeScreenIcons.map(name => (
          <HomeScreenIcon key={name}
                          name={name}
                          onClick={() => onIconClick(name.toLowerCase())}
          />
        ))}
      </div>
    </div>
  </div>
)

const App1 = ({}) => (
  <div>
    App 1
  </div>
)

export default () => (
  <WindowGroup name='mobile' allowInterContainerHistory={true}>
    {({setCurrentContainerName}) => (
      <div className='mobile'>
        <MobileWindow isDefault={true} name='home' path='/mobile'>
          {() => (
            <HomeScreen onIconClick={name => setCurrentContainerName(name)}/>
          )}
        </MobileWindow>
        <MobileWindow name='app1' component={App1}/>
      </div>
    )}
  </WindowGroup>
)