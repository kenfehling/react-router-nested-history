import React, { Component, PropTypes } from 'react';
import { getNextGroupIndex, initGroup } from '../main';

export default (WrappedComponent) => {
  const groupIndex = getNextGroupIndex();

  class Group extends Component {
    static childContextTypes = {
      groupIndex: PropTypes.number.isRequired
    };

    getChildContext() {
      return {groupIndex};
    }

    componentDidMount() {
      initGroup(groupIndex);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Group;
};

// TODO: Use Redux to provide the `containers` to WrappedComponent