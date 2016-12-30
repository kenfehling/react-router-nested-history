import React, { Component, PropTypes, Children, cloneElement } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import store from '../store'
import { getNextGroupIndex, switchToContainer } from '../../main'
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
    useDefaultContainer: PropTypes.bool
  }

  static propTypes = {
    currentContainerIndex: PropTypes.number.isRequired,
    onContainerSwitch: PropTypes.func,
    useDefaultContainer: PropTypes.bool
  }

  getChildContext() {
    return {
      groupIndex: this.groupIndex,
      location: this.props.location,
      useDefaultContainer: this.props.useDefaultContainer
    }
  }

  update() {
    const {onContainerSwitch} = this.props
    const groupState = getGroupState(this.groupIndex)
    if (!_.isEqual(this.indexedStackOrder, groupState.indexedStackOrder)) {
      onContainerSwitch(groupState)
      this.indexedStackOrder = groupState.indexedStackOrder
    }
  }

  componentWillMount() {
    const groupIndex = getNextGroupIndex()
    this.groupIndex = groupIndex
    const {location, useDefaultContainer} = this.props

    class G extends Component {
      static childContextTypes = {
        ...ContainerGroup.childContextTypes,
        initializing: PropTypes.bool
      }

      getChildContext() {
        return {
          groupIndex,
          location,
          useDefaultContainer,
          initializing: true
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    const children = getChildren(this)
    const div = document.createElement('div')
    children.forEach(c => {
      if (c instanceof Object) {
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

  componentWillReceiveProps(newProps) {
    this.setCurrentContainer(newProps.currentContainerIndex)
    this.update()
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

const ConnectedContainerGroup = connect(
  state => ({
    location: state.location
  }),
  {}
)(ContainerGroup)

export default props => <ConnectedContainerGroup store={store} {...props} />