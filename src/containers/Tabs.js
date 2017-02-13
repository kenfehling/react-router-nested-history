import React, { PropTypes, Component } from 'react'
import { Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { Container, ContainerGroup, HistoryMatch } from 'react-router-nested-history'
import './Tabs.css'
import TabMaster1 from "../components/TabMaster1"
import TabMaster2 from "../components/TabMaster2"
import TabMaster3 from "../components/TabMaster3"
import TabPage from "../components/TabPage"

const Tab = ({name, initialUrl, patterns, masterComponent}) => (
  <Container name={name} initialUrl={initialUrl} patterns={patterns}>
    <HistoryMatch exactly pattern={patterns[0]} component={masterComponent} />
    <HistoryMatch exactly pattern={patterns[1]} component={TabPage} />
  </Container>
)

export const Tab1 = () => <Tab name='tab1'
                               initialUrl="/tabs/1"
                               patterns={['/tabs/1', '/tabs/1/:page']}
                               masterComponent={TabMaster1} />

export const Tab2 = () => <Tab name='tab2'
                               initialUrl="/tabs/2"
                               patterns={['/tabs/2', '/tabs/2/:page']}
                               masterComponent={TabMaster2} />

export const Tab3 = () => <Tab name='tab3'
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
    return (<div>
      <h2>Tabs example</h2>
      <div className="description">
        <p>Each tab has its own individual history.</p>
        <p>Tab 1 is considered a default tab.</p>
        {/* <p>Clicking on an already active tab goes to the top of its history stack.</p> */}
      </div>
      <ContainerGroup name='tabs'
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
    </div>)
  }
}

export default Tabs