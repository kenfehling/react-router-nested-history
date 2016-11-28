import React from 'react';
import { Link } from 'react-router';
import { push } from '../../../../dist/tab-history-library';

export default () => (
  <div>
    <p>Hello</p>
    <a onClick={() => push("/windows/1/boris")}>Boris</a>
  </div>
);