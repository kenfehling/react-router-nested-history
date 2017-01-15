import React, { Component, PropTypes, Children, cloneElement } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import store from '../store'
import { getNextGroupIndex, switchToContainer, getLastAction, getActivePageInGroup } from '../../main'
import * as _ from "lodash"
import Container from "./Container"
import { getGroupState } from "../../main"

/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
function getChildren(component) {
  if (!(component instanceof Component) && !component.type) {
    return []
  }
  if (component instanceof Container || component.type === Container) {
    return [component]  // Stop if you find a Container
  }
  else if (component.props && component.props.children) {
    const children = Children.map(component.props.children, c => c)
    return _.flatten(children.map(getChildren))  // grandchildren
  }
  else {  // no children
    return [component]
  }
}

class ContainerGroup extends Component {
  static childContextTypes = {
    groupIndex: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    useDefaultContainer: PropTypes.bool,
    activePage: PropTypes.object.isRequired,
    lastAction: PropTypes.string.isRequired
  }

  static propTypes = {
    currentContainerIndex: PropTypes.number,
    onContainerSwitch: PropTypes.func,
    useDefaultContainer: PropTypes.bool,
    children: PropTypes.node.isRequired
  }

  getChildContext() {
    return {
      groupIndex: this.groupIndex,
      location: this.props.location,
      useDefaultContainer: this.props.useDefaultContainer,
      activePage: getActivePageInGroup(this.groupIndex),
      lastAction: getLastAction().type
    }
  }

  update() {
    const {onContainerSwitch} = this.props
    const groupState = getGroupState(this.groupIndex)
    if (!_.isEqual(this.indexedStackOrder, groupState.indexedStackOrder)) {
      if (onContainerSwitch) {
        onContainerSwitch(groupState)
      }
      this.indexedStackOrder = groupState.indexedStackOrder
    }
  }

  componentWillMount() {
    const groupIndex = getNextGroupIndex()
    this.groupIndex = groupIndex
    const {location, useDefaultContainer} = this.props

    class G extends Component {
      static childContextTypes = {
        groupIndex: PropTypes.number.isRequired,
        location: PropTypes.object.isRequired,
        useDefaultContainer: PropTypes.bool,
        initializing: PropTypes.bool
      }

      getChildContext() {
        return {
          groupIndex,
          location,
          useDefaultContainer,
          initializing: true,
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    const children = getChildren(this)
    children.forEach(c => {
      if (c instanceof Object) {
        const div = document.createElement('div')
        render(<G>{c}</G>, div)  // Initialize the Containers in this group
      }                          // (since most tab libraries lazy load tabs)
    })
  }

  setCurrentContainer(index) {
    if (index !== this.props.currentContainerIndex) {
      switchToContainer(this.groupIndex, index)
    }
  }

  componentDidMount() {
    this.setCurrentContainer(this.props.currentContainerIndex)
  }

  shouldComponentUpdate(newProps) {
    return this.props.location.pathname !== newProps.location.pathname ||
        (newProps.currentContainerIndex != null &&
         newProps.currentContainerIndex !== this.props.currentContainerIndex)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentContainerIndex) {
      this.setCurrentContainer(newProps.currentContainerIndex)
    }
    if (!_.isEqual(this.props, newProps)) {
      this.update()
    }
  }

  render() {
    return Array.isArray(this.props.children) ?
        <div>{this.props.children}</div> :
        this.props.children
  }
}

const ConnectedContainerGroup = connect(
  state => ({
    location: state.location
  }),
  {}
)(ContainerGroup)

export default props => <ConnectedContainerGroup store={store} {...props} />