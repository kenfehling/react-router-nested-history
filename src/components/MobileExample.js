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

const apps = [
  'Map',
  'Terminal',
  'Tools',
  'Editor',
  'Social',
  'Audio',
  'PDF'
]

const HomeScreenIcon = ({name, onClick}) => (
  <div className='icon' onClick={onClick}>
    {name}
  </div>
)

const HomeScreen = ({onIconClick}) => (
  <div className='home-screen'>
    {apps.map(name => (
      <HomeScreenIcon key={name}
                      name={name}
                      onClick={() => onIconClick(name.toLowerCase())}
      />
    ))}
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
        {apps.map(app => (
          <MobileWindow key={app} name={app}>
            {() => (
              <div>{app}</div>
            )}
          </MobileWindow>
        ))}
      </div>
    )}
  </WindowGroup>
)