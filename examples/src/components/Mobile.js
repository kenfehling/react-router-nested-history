import React from 'react'
import {
  Container, WindowGroup, HistoryRoute, HistoryLink, HistoryWindow, BackLink,
  HeaderLink
} from 'react-router-nested-history'
import './Mobile.css'
import Head from './Head'
import SimpleRedirect from './SimpleRedirect'

const regex = a => `:app(${a})`
const toPath = name => `/mobile/${name}`
const toPattern = name => `/mobile/${regex(name)}`

const MobilePage = ({title, children}) => (
  <div className='mobile-page'>
    <div className='nav'>
      <div className='back'>
        <BackLink>
          {({params: {app='home', page=null}}) => (
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
    <Head title={'Mobile: ' + title} />
  </div>
)

const MobileWindow = ({name, path=toPath(name), pattern=toPattern(name),
                        children, isDefault=false}) => (
  <HistoryWindow forName={name} className='mobile-window'>
    <Container name={name}
               initialUrl={path}
               patterns={[pattern, `${[pattern]}/:page`]}
               isDefault={isDefault}
    >
      <HistoryRoute path={pattern} exact children={children} />
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
  'email',
  'music'
]

const HomeScreen = () => (
  <div className='home-screen'>
    {apps.map(app => (
      <HeaderLink key={app} className='icon' toContainer={app}>
        {app}
      </HeaderLink>
    ))}
    <Head title='Mobile: home' />
  </div>
)

export default () => (
  <div className='mobile-example'>
    <SimpleRedirect from='/mobile/audio' to='/mobile/music' />
    <h2>Mobile example</h2>
    <div className="description">
      <p>
        A window group with allowInterContainerHistory=true and whose
        windows are 100% width and height therefore hiding each other
      </p>
    </div>
    <WindowGroup name='mobile'
                 allowInterContainerHistory={true}
                 hideInactiveContainers={true}
    >
      <div className='phone'>
        <MobileWindow isDefault={true}
                      name='home'
                      path='/mobile'
                      pattern='/mobile'>
          <HomeScreen />
        </MobileWindow>
        {apps.map(app => (
          <MobileWindow key={app} name={app}>
            <MobilePage title={app}>
              <div>{app}</div>
              <p>
                <HistoryLink to={`${toPath(app)}/Hello`}>Hello</HistoryLink>
              </p>
            </MobilePage>
          </MobileWindow>
        ))}
      </div>
    </WindowGroup>
  </div>
)