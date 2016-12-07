import React from 'react';
import { Link } from 'react-router';
import { push } from '../../../../dist/tab-history-library';

export default () => (
    <div>
      <div>Tab 1</div>
      <a onClick={() => push(0, 1, "/tabs/2/flower")}>flower</a>
    </div>
);