import React from 'react'
import Helmet from 'react-helmet'
import {WhenActive} from 'react-router-nested-history'

const Head = ({title}) => (
  <WhenActive>
    <Helmet title={title} />
  </WhenActive>
)

export default Head