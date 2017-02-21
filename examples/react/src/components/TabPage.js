import React from 'react'
import { HistoryLink } from 'react-router-nested-history'
import Helmet from 'react-helmet'

export default ({match:{params:{page}}}) => (
  <div >
    <p className='page-content'>
      Page: {page}
    </p>
    <HistoryLink to="/tabs/2/other">Other link</HistoryLink>
    <Helmet title={'Tabs: ' + page} />
  </div>
)