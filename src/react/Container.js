import React, { Component, PropTypes } from 'react';
import { createContainer } from '../main';

export default class extends Component {
  static contextTypes = {
    groupIndex: PropTypes.number.isRequired
  };

  static propTypes = {
    children: PropTypes.object.isRequired,
    initialUrl: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props);
    const {groupIndex} = this.context;
    const {initialUrl, pattern=[], patterns=[]} = props;
    createContainer(groupIndex, initialUrl, [...patterns, ...([pattern] || [])]);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}