import React, {PropTypes, Component } from 'react'
import {Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel} from 'react-tabs'
import {
  Container, ContainerGroup, HistoryRoute, HistoryLink
} from 'react-router-nested-history'
import Helmet from 'react-helmet'
import './Tabs.css'

const TabMaster1 = () => (
  <div>
    <div className='tab-title'>Tab 1</div>
    <HistoryLink to="/tabs/1/balloon">Balloon</HistoryLink>
    <p>
      Clicking the link will push a new page to this tab's history.
    </p>
    <Helmet title='Tab 1' />
  </div>
)

const TabMaster2 = () => (
  <div>
    <div className='tab-title'>Tab 2</div>
    <HistoryLink to="/tabs/2/flower">flower</HistoryLink>
    <p>
      Using the browser's back button will go back to the default tab.
    </p>
    <Helmet title='Tab 2' />
  </div>
)

const TabMaster3 = () => (
  <div>
    <div className='tab-title'>Tab 3</div>
    <Helmet title='Tab 3' />
  </div>
)

const TabPage = ({match:{params:{page}}}) => (
  <div>
    <p className='page-content'>
      Page: {page}
    </p>
    <p>
      Using the browser's back button will go back to this tab's previous page.
    </p>
    <Helmet title={'Tabs: ' + page} />
  </div>
)

const Tab = ({name, initialUrl, patterns, masterComponent, useDefault=false}) => (
  <Container name={name}
             className={name}
             initialUrl={initialUrl}
             patterns={patterns}
             useDefault={useDefault}
  >
    <HistoryRoute exact path={patterns[0]} component={masterComponent} />
    <HistoryRoute exact path={patterns[1]} component={TabPage} />
  </Container>
)

const Tab1 = () => <Tab name='tab1'
                         initialUrl="/tabs/1"
                         patterns={['/tabs/1', '/tabs/1/:page']}
                         masterComponent={TabMaster1}
                         useDefault={true} />

const Tab2 = () => <Tab name='tab2'
                         initialUrl="/tabs/2"
                         patterns={['/tabs/2', '/tabs/2/:page']}
                         masterComponent={TabMaster2} />

const Tab3 = () => <Tab name='tab3'
                         initialUrl="/tabs/3"
                         patterns={['/tabs/3', '/tabs/3/:page']}
                         masterComponent={TabMaster3} />

class Tabs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0
    }
  }

  onContainerActivate({currentContainerIndex}) {
    this.setState({activeTabIndex: currentContainerIndex})
  }

  render() {
    return (
      <div>
        <h2>Tabs example</h2>
        <div className="description">
          <p>Each tab has its own individual history.</p>
          <p>Tab 1 is considered a default tab.</p>
          {/* <p>Clicking on an already active tab goes to the top of its history stack.</p> */}
        </div>
        <ContainerGroup name='tabs' className='tabs'
                        currentContainerIndex={this.state.activeTabIndex}
                        onContainerActivate={this.onContainerActivate.bind(this)}
                        gotoTopOnSelectActive={true}
        >
          <ReactTabs onSelect={activeTabIndex => this.setState({activeTabIndex})}
                     selectedIndex={this.state.activeTabIndex}>
            <TabList>
              <ReactTab>One</ReactTab>
              <ReactTab>Two</ReactTab>
              <ReactTab>Three</ReactTab>
            </TabList>
            <TabPanel><div className="tab-content"><Tab1 /></div></TabPanel>
            <TabPanel><div className="tab-content"><Tab2 /></div></TabPanel>
            <TabPanel><div className="tab-content"><Tab3 /></div></TabPanel>
          </ReactTabs>
        </ContainerGroup>
      </div>
    )
  }
}

export default Tabs