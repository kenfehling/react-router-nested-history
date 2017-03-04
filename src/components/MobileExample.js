import React, {PropTypes, Component } from 'react'
import {
  Container, WindowGroup, HistoryRoute, HistoryLink, HistoryWindow, BackLink
} from 'react-router-nested-history'
import Helmet from 'react-helmet'
import './MobileExample.css'

const regex = a => `:app(${a})`
const toId = name => name.toLowerCase()
const toPath = name => `/mobile/${toId(name)}`
const toPattern = name => `/mobile/${regex(toId(name))}`

const MobilePage = ({title, children}) => (
  <div className='mobile-page'>
    <div className='nav'>
      <div className='back'>
        <BackLink>
          {({params: {app='Home', page=null}}) => (
            <div className='link'>
              <i className="fa fa-chevron-left" />
              <div className='text'>{page || app}</div>
            </div>
          )}
        </BackLink>
      </div>
      <h1 className='title'>{title}</h1>
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
)

const MobileWindow = ({name, path=toPath(name), pattern=toPattern(name),
                       component, children, isDefault=false}) => (
  <HistoryWindow forName={toId(name)} className='mobile-window'>
    <Container name={toId(name)}
               initialUrl={path}
               patterns={[pattern, `${[pattern]}/page`]}
               isDefault={isDefault}
    >
      {component ?
        <HistoryRoute path={pattern} exact component={component}/> :
        <HistoryRoute path={pattern} exact children={children} />
      }
      <HistoryRoute path={`${pattern}/:page`} exact>
        {({match:{params:{page}}}) => (
          <MobilePage title={page}>
            <div>{page}</div>
          </MobilePage>
        )}
      </HistoryRoute>
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
          <MobileWindow isDefault={true}
                        name='home'
                        path='/mobile'
                        pattern='/mobile'>
            {() => (
              <HomeScreen onIconClick={name => setCurrentContainerName(name)}/>
            )}
          </MobileWindow>
          {apps.map(app => (
            <MobileWindow key={app} name={app}>
              {() => (
                <MobilePage title={app}>
                  <div>{app}</div>
                  <p>
                    <HistoryLink to={`${toPath(app)}/page`}>page</HistoryLink>
                  </p>
                </MobilePage>
              )}
            </MobileWindow>
          ))}
        </div>
      )}
    </WindowGroup>
  </div>
)