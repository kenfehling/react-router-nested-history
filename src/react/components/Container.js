import React, { Component, PropTypes } from 'react';
import { createContainer } from '../../main';

export default class extends Component {
  static contextTypes = {
    groupIndex: PropTypes.number.isRequired
  };

  static childContextTypes = {
    containerIndex: PropTypes.number.isRequired
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    initialUrl: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string)
  };

  getChildContext() {
    return {containerIndex: this.containerIndex};
  }

  componentWillMount() {
    const {groupIndex} = this.context;
    const {initialUrl, pattern=[], patterns=[]} = this.props;
    const container = createContainer(groupIndex, initialUrl, [...patterns, ...([pattern] || [])]);

    console.log(container);

    this.containerIndex = container.index;
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}