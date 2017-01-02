import React from 'react'
import { HistoryLink } from '../../../../dist/react-router-nested-history'

export default () => (
    <div>
      <div>Tab 1</div>
      <HistoryLink to="/tabs/2/flower">flower</HistoryLink>
    </div>
)