import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from '../../main';

export default class HistoryLink extends Component {
  static propTypes = Link.propTypes;

  static contextTypes = {
    ...Link.contextTypes,
    groupIndex: PropTypes.number.isRequired,
    containerIndex: PropTypes.number.isRequired
  };

  render() {
    const {to, children} = this.props;
    const {containerIndex, groupIndex} = this.context;
    return (<Link to={to} onClick={() => push(groupIndex, containerIndex, to)}>
      {children}
    </Link>);
  }
}