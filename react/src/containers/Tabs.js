import React, { PropTypes, Component } from 'react';
import { Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import { setContainers } from '../../../../dist/tab-history-library';
import { Match, Link } from 'react-router';
import './Tabs.css';
import TabMaster1 from "../components/TabMaster1";
import TabMaster2 from "../components/TabMaster2";
import TabMaster3 from "../components/TabMaster3";
import TabPage from "../components/TabPage";

const tabsConfig = [
  {initialUrl: '/tabs/1', urlPatterns: ['/tabs/1', '/tabs/1/*']},
  {initialUrl: '/tabs/2', urlPatterns: ['/tabs/2', '/tabs/2/*']},
  {initialUrl: '/tabs/3', urlPatterns: ['/tabs/3', '/tabs/3/*']}
];

const tabs = setContainers(tabsConfig);

export const Tab1 = () => (
  <div>
    <Match exactly pattern="/tabs/1" component={TabMaster1} />
    <Match exactly pattern="/tabs/1/:page" component={TabPage} />
  </div>
);

export const Tab2 = () => (
  <div>
    <Match exactly pattern="/tabs/2" component={TabMaster2} />
    <Match exactly pattern="/tabs/2/:page" component={TabPage} />
  </div>
);

export const Tab3 = () => (
  <div>
    <Match exactly pattern="/tabs/3" component={TabMaster3} />
    <Match exactly pattern="/tabs/3/:page" component={TabPage} />
  </div>
);

const onTabClick = (router, index) => {
  /*
  const containerPaths = getContainerPaths();
  const containerPath = `/tabs/${index + 1}`;
  if (isActiveTab(containerPath)) {
    router.replaceWith(containerPath);  // Go to the top path in this container
  }
  else {
  */
    tabs.switchTo(index);
  //}
};

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: tabs.getActive()
    };
  }

  componentWillMount() {
    tabs.addChangeListener(state => {

      console.log(state.active);

      this.setState({currentTab: state.active});
    })
  }

  render() {
    const {router, match:matchContext} = this.props;
    const onClick = onTabClick.bind(null, router);
    return (<div>
      <h2>Tabs example</h2>
      <div className="description">
        <p>Each tab has its own individual history.</p>
        <p>Clicking on an already active tab goes to the top of its history stack.</p>
      </div>
      <ReactTabs selectedIndex={this.state.currentTab.index}>
        <TabList>
          <ReactTab onClick={() => onClick(0)}>One</ReactTab>
          <ReactTab onClick={() => onClick(1)}>Two</ReactTab>
          <ReactTab onClick={() => onClick(2)}>Three</ReactTab>
        </TabList>
        <TabPanel>
          <div className="tab-content">
            <Tab1 />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab-content">
            <Tab2 />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab-content">
            <Tab3 />
          </div>
        </TabPanel>
      </ReactTabs>
    </div>);
  }
}

Tabs.contextTypes = {
  router: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired
};

export default Tabs;