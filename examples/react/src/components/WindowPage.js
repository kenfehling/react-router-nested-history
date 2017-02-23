import React from 'react'
import Helmet from 'react-helmet'

export default ({match:{params:{page}}}) => (
  <div>
    Page: {page}
    <Helmet title={'Windows: ' + page} />
  </div>
)