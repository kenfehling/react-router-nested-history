import React from 'react'
import { HistoryLink } from 'react-router-nested-history'
import Helmet from 'react-helmet'

export default ({params:{page}}) => (
  <div >
    <p className='page-content'>
      Page: {page}
    </p>

    <Helmet title={'Tabs: ' + page} />
  </div>
)