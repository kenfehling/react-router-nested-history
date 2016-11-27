import React, { PropTypes } from 'react';
import { Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import { setTabs, switchToTab, getCurrentTab } from '../../../../dist/tab-history-library';
import { Match, Link } from 'react-router';
import './Tabs.css';
import TabMaster1 from "../components/TabMaster1";
import TabMaster2 from "../components/TabMaster2";
import TabMaster3 from "../components/TabMaster3";
import TabPage from "../components/TabPage";

setTabs('/tabs/1', '/tabs/2', '/tabs/3');

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

/*
const getActiveContainer = () => getLatestActiveMatchingContainer(path => path.startsWith('/tabs'));
const isActiveTab = (containerPath) => containerPath === getActiveContainer();

const getSelectedIndex = () => {
  const containerPaths = getContainerPaths();
  const activeContainer = getActiveContainer();
  for (let i = 0; i < containerPaths.length; i++) {
    if (containerPaths[i] === activeContainer) {
      return i;
    }
  }
};
*/

const onTabClick = (router, index) => {
  /*
  const containerPaths = getContainerPaths();
  const containerPath = `/tabs/${index + 1}`;
  if (isActiveTab(containerPath)) {
    router.replaceWith(containerPath);  // Go to the top path in this container
  }
  else {
  */
    switchToTab(index);
  //}
};

const Tabs = ({}, {router, match:matchContext}) => {
  const onClick = onTabClick.bind(null, router);
  return (<div>
    <h2>Tabs example</h2>
    <div className="description">
      <p>Each tab has its own individual history.</p>
      <p>Clicking on an already active tab goes to the top of its history stack.</p>
    </div>
    <ReactTabs selectedIndex={getCurrentTab()}>
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
};

Tabs.contextTypes = {
  router: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired
};

export default Tabs;