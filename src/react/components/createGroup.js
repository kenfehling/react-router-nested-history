import React, { Component, PropTypes } from 'react';
import { getNextGroupIndex, initGroup, getGroupFunctions} from '../../main';
import { connect } from 'react-redux';
import store from '../store';

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

  const ConnectedGroup = connect(
    state => getGroupFunctions(state, groupIndex),
    {}
  )(Group);

  return () => <ConnectedGroup store={store} />;
};