import React from 'react'
import Tabs from './Tabs'
import Windows from './Windows'
import NestedGroup from './NestedGroup'
import StateTree from './StateTree'
import './App.css'

export default () => (
  <div className="app-container">
    <div className='left-container'>
      <div className='top-container'>
        <div className="tabs-container"><Tabs /></div>
        <div className="windows-container"><Windows /></div>
      </div>
      <div className='nested-group-container'>
        <NestedGroup />
      </div>
    </div>
    <div className="state-tree-container"><StateTree /></div>
  </div>
)