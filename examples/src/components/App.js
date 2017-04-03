import React from 'react'
import {Route, Redirect} from 'react-router'
import Tabs from './Tabs'
import Windows from './Windows'
import NestedGroup from './NestedGroup'
import ScrollAreaExample from './ScrollAreaExample'
import MobileExample from './Mobile'
import StateTree from './StateTree'
import './App.css'

export default () => (
  <div>
    <Route path='/' exact render={() => <Redirect to="/windows/1" />} />
    <Route path='/tabs' exact render={() => <Redirect to="/tabs/1" />} />
    <Route path='/windows' exact render={() => <Redirect to="/windows/1" />} />
    <Route path='/foods' exact render={() => <Redirect to="/foods/Fruit" />} />
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