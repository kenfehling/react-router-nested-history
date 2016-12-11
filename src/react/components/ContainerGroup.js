import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { getNextGroupIndex, initGroup, switchToContainer } from '../../main';
import { connect } from 'react-redux';
import store from '../store';
import * as _ from "lodash";
import {mount} from 'react-mounter';

export default class extends Component {
  static childContextTypes = {
    groupIndex: PropTypes.number.isRequired
  };

  static propTypes = {
    currentContainerIndex: PropTypes.number.isRequired
  };

  getChildContext() {
    return {groupIndex: this.groupIndex};
  }

  constructor(props) {
    super(props);

    const groupIndex = getNextGroupIndex();
    this.groupIndex = groupIndex;

    class G extends Component {
      static childContextTypes = {
        groupIndex: PropTypes.number.isRequired
      };

      getChildContext() {
        return {groupIndex};
      }

      render() {
        return <div>{this.props.children}</div>;
      }
    }

    const children = props.children;
    const cs = Children.map(children, c => c);
    const css = _.flatten(cs.map(cc => Children.map(cc.props.children, c => c)));
    const csss = _.flatten(css.map(cc => Children.map(cc.props.children, c => c)));
    const cssss = _.flatten(csss.map(cc => Children.map(cc.props.children, c => c)));

    cssss.forEach(c => mount(() => <G><c.type /></G>));
  }

  componentDidMount() {
    initGroup(this.groupIndex);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentContainerIndex !== this.props.currentContainerIndex) {
      switchToContainer(this.groupIndex, newProps.currentContainerIndex);
    }
  };

  render() {
    //const props = getGroupFunctions(this.groupIndex);
    //return <div>{Children.map(this.props.children, c => cloneElement(c, props))}</div>;
    return <div>{this.props.children}</div>;
  }
}

/*
const ConnectedGroup = connect(
  state => getGroupFunctions(state, this.groupIndex),
  {}
)(Group);

export default () => <ConnectedGroup store={store} />;
*/