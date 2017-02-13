import React from 'react'
import { HistoryLink } from 'react-router-nested-history'
import Helmet from 'react-helmet'

export default () => (
  <div>
    <div className='title'>Tab 1</div>
    <HistoryLink to="/tabs/1/balloon">Balloon</HistoryLink>
    <Helmet title='Tab 1' />
  </div>
)