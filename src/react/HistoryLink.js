import React from 'react';
import { push } from '../main';

export default ({to, children}) => (
  <a onClick={() => push(0, 0, to)}>{children}</a>
);