import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { render } from 'react-dom';
import { getNextGroupIndex, initGroup, switchToContainer, addChangeListener } from '../../main';
import { connect } from 'react-redux';
import store from '../store';
import * as _ from "lodash";
import Container from "./Container";

export default class extends Component {
  static childContextTypes = {
    groupIndex: PropTypes.number.isRequired
  };

  static propTypes = {
    currentContainerIndex: PropTypes.number.isRequired,
    onContainerSwitch: PropTypes.func
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

    function getChildren(component) {
      if (component.type === Container) {
        return [component];
      }
      else if (component.props.children) {
        const children = Children.map(component.props.children, c => c);
        return _.flatten(children.map(getChildren));
      }
      else {
        return [component];
      }
    }

    const children = getChildren(this);
    const div = document.createElement('div');
    children.forEach(c => render(<G><c.type /></G>, div));
    initGroup(this.groupIndex);
  }

  componentDidMount() {
    addChangeListener(state => {
      const {currentContainerIndex, onContainerSwitch} = this.props;
      const group = state.groups[this.groupIndex];
      const newContainerIndex = group.history.current.containerIndex;
      if (newContainerIndex !== currentContainerIndex) {
        onContainerSwitch(newContainerIndex);
      }
    });
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