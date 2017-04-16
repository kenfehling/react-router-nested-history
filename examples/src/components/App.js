import React from 'react'
import {Route} from 'react-router'
import {HistoryRedirect} from 'react-router-nested-history'
import Tabs from './Tabs'
import Windows from './Windows'
import NestedGroup from './NestedGroup'
import ScrollAreaExample from './ScrollAreaExample'
import MobileExample from './Mobile'
import StateTree from './StateTree'
import './App.css'

export default () => (
  <div>
    <Route path='/' exact render={() => <HistoryRedirect to="/windows/1" />} />
    <Route path='/tabs' exact render={() => <HistoryRedirect to="/tabs/1" />} />
    <Route path='/windows' exact render={() => <HistoryRedirect to="/windows/1" />} />
    <Route path='/foods' exact render={() => <HistoryRedirect to="/foods/Fruit" />} />
    <div className="app-container">
      <div className='left-container'>
        <div className='top-container'>
          {/*
           <div className="example-container tabs-container"><Tabs /></div>
           */}
          <div className="example-container windows-container">
            <Windows />
          </div>
          <div className='example-container mobile-container'>
            <MobileExample />
          </div>
        </div>
        <div className='bottom-container'>
          <div className='example-container nested-group-container'>
            <NestedGroup />
          </div>
          {/*
           <div className='example-container scroll-area-container'>
           <ScrollAreaExample />
           </div>
           */}
        </div>
      </div>
      {/*
      <div className="state-tree-container"><StateTree /></div>
       */}
    </div>
  </div>
)