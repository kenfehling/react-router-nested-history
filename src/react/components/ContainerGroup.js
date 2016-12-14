import React, { Component, PropTypes, Children, cloneElement } from 'react'
import { render } from 'react-dom'
import { getNextGroupIndex, switchToContainer, addGroupChangeListener } from '../../main'
import * as _ from "lodash"
import Container from "./Container"

export default class extends Component {
  static childContextTypes = {
    groupIndex: PropTypes.number.isRequired
  }

  static propTypes = {
    currentContainerIndex: PropTypes.number.isRequired,
    onContainerSwitch: PropTypes.func
  }

  getChildContext() {
    return {groupIndex: this.groupIndex}
  }

  componentWillMount() {
    const groupIndex = getNextGroupIndex()
    this.groupIndex = groupIndex

    class G extends Component {
      static childContextTypes = {
        groupIndex: PropTypes.number.isRequired,
        initializing: PropTypes.bool
      }

      getChildContext() {
        return {
          groupIndex,
          initializing: true
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    function getChildren(component) {
      if (!component.type) {
        return []
      }
      if (component.type === Container) {  // if you find a Container, stop
        return [component]
      }
      else if (component.props && component.props.children) {
        const children = Children.map(component.props.children, c => c)
        return _.flatten(children.map(getChildren))  // grandchildren
      }
      else {  // no children
        return [component]
      }
    }

    const children = getChildren(this)
    const div = document.createElement('div')
    children.forEach(c => {
      if (c instanceof Object) {
        render(<G><c.type /></G>, div)  // Initialize the Containers in group
      }                                 // (most tab libraries lazy load tabs)
    })
  }

  componentDidMount() {
    addGroupChangeListener(this.groupIndex, event => {
      const {currentContainerIndex, onContainerSwitch} = this.props
      //if (event.activeContainer.index !== currentContainerIndex) {
        onContainerSwitch(event)
      //}
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentContainerIndex !== this.props.currentContainerIndex) {
      switchToContainer(this.groupIndex, newProps.currentContainerIndex)
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}