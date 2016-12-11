import React, { PropTypes, Component } from 'react';
import ReactTabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import { HistoryMatch, Container, ContainerGroup } from '../../../../dist/tab-history-library';
import { TransitionMotion, spring } from 'react-motion';
import './Tabs.css';
import TabMaster1 from "../components/TabMaster1";
import TabMaster2 from "../components/TabMaster2";
import TabMaster3 from "../components/TabMaster3";
import TabPage from "../components/TabPage";

const MatchWithFade = ({ component:Component, ...rest }) => {
  const willEnter = () => ({ opacity: spring(1) });
  const willLeave = () => ({ opacity: spring(0) });

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
};

const Tab = ({initialUrl, patterns, masterComponent}) => (
  <Container initialUrl={initialUrl} patterns={patterns}>
    <MatchWithFade exactly pattern="/tabs/1" component={masterComponent} />
    <MatchWithFade exactly pattern="/tabs/1/:page" component={TabPage} />
  </Container>
);

const Tab1 = () => <Tab initialUrl="/tabs/1"
                        patterns={['/tabs/1', '/tabs/1/*']}
                        masterComponent={TabMaster1} />;

const Tab2 = () => <Tab initialUrl="/tabs/2"
                        patterns={['/tabs/2', '/tabs/2/*']}
                        masterComponent={TabMaster2} />;

const Tab3 = () => <Tab initialUrl="/tabs/3"
                        patterns={['/tabs/3', '/tabs/3/*']}
                        masterComponent={TabMaster3} />;

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTabIndex: 0
    };
  }

  render() {
    return (<div>
      <h2>Tabs example</h2>
      <div className="description">
        <p>Each tab has its own individual history.</p>
        <p>Clicking on an already active tab goes to the top of its history stack.</p>
      </div>
      <ContainerGroup
          currentContainerIndex={this.state.currentTabIndex}
          onContainerSwitch={currentTabIndex => this.setState({currentTabIndex})}
      >
        <ReactTabs activeKey={String(this.state.currentTabIndex)}
                   renderTabBar={()=><ScrollableInkTabBar />}
                   renderTabContent={()=><TabContent />}
                   onChange={key => this.setState({currentTabIndex: parseInt(key)})}
        >
          <TabPane tab="One" key={0}>
            <div className="tab-content"><Tab1 /></div>
          </TabPane>
          <TabPane tab="Two" key={1}>
            <div className="tab-content"><Tab2 /></div>
          </TabPane>
          <TabPane tab="Three" key={2}>
            <div className="tab-content"><Tab3 /></div>
            </TabPane>
        </ReactTabs>
      </ContainerGroup>
    </div>);
  }
}

export default Tabs;