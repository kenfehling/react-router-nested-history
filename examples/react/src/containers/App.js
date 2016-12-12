import React from 'react';
import Tabs from './Tabs';
//import Windows from './Windows';
import StateTree from './StateTree';
import './App.css';

export default props => (
  <div className="app-container">
    <div className="tabs-container"><Tabs /></div>
    {/* <div className="windows-container"><Windows /></div> */}
    <div className="state-tree-container"><StateTree /></div>
  </div>
);