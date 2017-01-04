import React, { PropTypes, Component } from 'react'
import { Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { Container, ContainerGroup, HistoryMatch } from 'react-router-nested-history'
import { TransitionMotion, spring } from 'react-motion'
import './Tabs.css'
import TabMaster1 from "../components/TabMaster1"
import TabMaster2 from "../components/TabMaster2"
import TabMaster3 from "../components/TabMaster3"
import TabPage from "../components/TabPage"

const MatchWithFade = ({ component:Component, ...rest }) => {
  const willEnter = () => ({ opacity: spring(1) })
  const willLeave = () => ({ opacity: spring(0) })

  return (
    <HistoryMatch {...rest} children={({ matched, ...props }) => (
      <TransitionMotion
        willEnter={willEnter}
        willLeave={willLeave}
        styles={matched ? [ {
          key: props.location.pathname,
          style: { opacity: 1 },
          data: props
        } ] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => (
              <div
                key={config.key}
                style={config.style}
              >
                <Component {...config.data}/>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}/>
  )
}

const Tab = ({initialUrl, patterns, masterComponent}) => (
  <Container initialUrl={initialUrl} patterns={patterns}>
    <MatchWithFade exactly pattern={patterns[0]} component={masterComponent} />
    <MatchWithFade exactly pattern={patterns[1]} component={TabPage} />
  </Container>
)

const Tab1 = () => <Tab initialUrl="/tabs/1"
                        patterns={['/tabs/1', '/tabs/1/:page']}
                        masterComponent={TabMaster1} />

const Tab2 = () => <Tab initialUrl="/tabs/2"
                        patterns={['/tabs/2', '/tabs/2/:page']}
                        masterComponent={TabMaster2} />

const Tab3 = () => <Tab initialUrl="/tabs/3"
                        patterns={['/tabs/3', '/tabs/3/:page']}
                        masterComponent={TabMaster3} />

class Tabs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0
    }
  }

  onContainerSwitch({activeContainer:{index}}) {
    this.setState({activeTabIndex: index})
  }

  render() {
    return (<div>
      <h2>Tabs example</h2>
      <div className="description">
        <p>Each tab has its own individual history.</p>
        {/* <p>Clicking on an already active tab goes to the top of its history stack.</p> */}
      </div>
      <ContainerGroup currentContainerIndex={this.state.activeTabIndex}
          onContainerSwitch={this.onContainerSwitch.bind(this)}>
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