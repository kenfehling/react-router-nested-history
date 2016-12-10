import React, { PropTypes, Component } from 'react';
import { Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import { HistoryMatch, ContainerGroup, Container } from '../../../../dist/tab-history-library';
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

export const Tab1 = () => (
  <div>
    <Container initialUrl="/tabs/1" patterns={['/tabs/1', '/tabs/1/*']}>
      <MatchWithFade exactly pattern="/tabs/1" component={TabMaster1} />
      <MatchWithFade exactly pattern="/tabs/1/:page" component={TabPage} />
    </Container>
  </div>
);

export const Tab2 = () => (
  <div>
    <Container initialUrl="/tabs/2" patterns={['/tabs/2', '/tabs/2/*']}>
      <MatchWithFade exactly pattern="/tabs/2" component={TabMaster2} />
      <MatchWithFade exactly pattern="/tabs/2/:page" component={TabPage} />
    </Container>
  </div>
);

export const Tab3 = () => (
  <div>
    <Container initialUrl="/tabs/3" patterns={['/tabs/3', '/tabs/3/*']}>
      <MatchWithFade exactly pattern="/tabs/3" component={TabMaster3} />
      <MatchWithFade exactly pattern="/tabs/3/:page" component={TabPage} />
    </Container>
  </div>
);

class Tabs extends Component {

  constructor(props) {
    super(props);
    const {containers} = props;
    this.state = {
      currentTab: containers.getActive()
    };
  }

  componentWillMount() {
    const {containers} = this.props;
    containers.addChangeListener(state => {
      this.setState({currentTab: state.activeContainer});
    })
  }

  render() {
    const {containers} = this.props;
    return (<div>
      <h2>Tabs example</h2>
      <div className="description">
        <p>Each tab has its own individual history.</p>
        <p>Clicking on an already active tab goes to the top of its history stack.</p>
      </div>
      <ContainerGroup>
        <ReactTabs selectedIndex={this.state.currentTab.index}>
          <TabList>
            <ReactTab onClick={() => containers.switchTo(0)}>One</ReactTab>
            <ReactTab onClick={() => containers.switchTo(1)}>Two</ReactTab>
            <ReactTab onClick={() => containers.switchTo(2)}>Three</ReactTab>
          </TabList>
          <TabPanel><div className="tab-content"><Tab1 /></div></TabPanel>
          <TabPanel><div className="tab-content"><Tab2 /></div></TabPanel>
          <TabPanel><div className="tab-content"><Tab3 /></div></TabPanel>
        </ReactTabs>
      </ContainerGroup>
    </div>);
  }
}

Tabs.contextTypes = {
  router: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired
};

export default createGroup(Tabs);