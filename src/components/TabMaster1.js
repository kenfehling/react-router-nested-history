import React from 'react'
import { HistoryLink } from 'react-router-nested-history'

export default () => (
    <div>
      <div>Tab 1</div>
      <HistoryLink to="/tabs/1/balloon">Balloon</HistoryLink>
    </div>
)