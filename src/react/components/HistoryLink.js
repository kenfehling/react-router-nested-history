import React, { Component, PropTypes } from 'react';
import { push } from '../../main';

export default class extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  };

  static contextTypes = {
    groupIndex: PropTypes.number.isRequired,
    containerIndex: PropTypes.number.isRequired
  };

  render() {
    const {to, children} = this.props;
    const {containerIndex, groupIndex} = this.context;
    return (<a onClick={() => push(groupIndex, containerIndex, to)}>
      {children}
    </a>);
  }
}