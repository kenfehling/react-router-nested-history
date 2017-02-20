import React from 'react'
import Helmet from 'react-helmet'

export default ({params:{page}}) => (
  <div >
    <p className='page-content'>
      Page: {page}
    </p>
    <p>
      Using the browser's back button will go back to this tab's previous page.
    </p>
    <Helmet title={'Tabs: ' + page} />
  </div>
)