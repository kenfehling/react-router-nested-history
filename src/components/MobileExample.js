import React, {PropTypes, Component } from 'react'
import {
  Container, WindowGroup, HistoryRoute, HistoryLink, HistoryWindow, BackLink
} from 'react-router-nested-history'
import Helmet from 'react-helmet'
import './MobileExample.css'

const toId = name => name.toLowerCase()
const toPath = name => `/mobile/${toId(name)}`

const MobilePage = ({title, children}) => (
  <div className='mobile-page'>
    <div className='nav'>
      <div className='back'>
        <BackLink nameFn={({page='Home'}) => (
          <div className='link'>
            <i className="fa fa-chevron-left" />
            <div className='text'>{page}</div>
          </div>
        )} />
      </div>
      <h1 className='title'>{title}</h1>
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
)

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
  <div className='mobile-example'>
    <h2>Mobile example</h2>
    <div className="description">
      <p>
        A window group with `allowInterContainerHistory` whose
        windows are 100% width and height, therefore hiding each other
      </p>
    </div>
    <WindowGroup name='mobile' allowInterContainerHistory={true}>
      {({setCurrentContainerName}) => (
        <div className='phone'>
          <MobileWindow isDefault={true} name='home' path='/mobile'>
            {() => (
              <HomeScreen onIconClick={name => setCurrentContainerName(name)}/>
            )}
          </MobileWindow>
          {apps.map(app => (
            <MobileWindow key={app} name={app}>
              {() => (
                <MobilePage title={app}>
                  <div>{app}</div>
                </MobilePage>
              )}
            </MobileWindow>
          ))}
        </div>
      )}
    </WindowGroup>
  </div>
)