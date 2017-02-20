import React from 'react'
import { HistoryLink } from 'react-router-nested-history'
import Helmet from 'react-helmet'

export default () => (
  <div>
    <div className='tab-title'>Tab 1</div>
    <HistoryLink to="/tabs/1/balloon">Balloon</HistoryLink>
    <p>
      Clicking the link will push a new page to this tab's history.
    </p>
    <Helmet title='Tab 1' />
  </div>
)