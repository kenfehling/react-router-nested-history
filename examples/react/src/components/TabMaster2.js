import React from 'react';
import { Link } from 'react-router';
import { push } from '../../../../dist/tab-history-library';

export default () => (
    <div>
      <div>Tab 1</div>
      <a onClick={() => push("/tabs/2/flower")}>flower</a>
    </div>
);