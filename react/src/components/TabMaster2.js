import React from 'react'
import { HistoryLink } from 'react-router-nested-history'
import Helmet from 'react-helmet'

export default () => (
  <div>
    <div className='tab-title'>Tab 2</div>
    <HistoryLink to="/tabs/2/flower">flower</HistoryLink>
    <Helmet title='Tab 2' />
  </div>
)