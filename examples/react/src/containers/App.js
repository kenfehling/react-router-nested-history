import React from 'react';
import Tabs from './Tabs';
import Windows from './Windows';
import './App.css';

export default props => (
  <div className="app-container">
    <div className="tabs-container"><Tabs {...props} /></div>
    <div className="windows-container"><Windows {...props} /></div>
  </div>
);