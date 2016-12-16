import React, { Component, PropTypes, Children, cloneElement } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import store from '../store'
import { getNextGroupIndex, switchToContainer } from '../../main'
import * as _ from "lodash"
import Container from "./Container"
import { getIndexedContainerStackOrder } from "../../main"

class ContainerGroup extends Component {
  static childContextTypes = {
    groupIndex: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired
  }

  static propTypes = {
    currentContainerIndex: PropTypes.number.isRequired,
    onContainerSwitch: PropTypes.func
  }

  getChildContext() {
    return {
      groupIndex: this.groupIndex,
      location: this.props.location
    }
  }

  componentWillMount() {
    const groupIndex = getNextGroupIndex()
    this.groupIndex = groupIndex
    const location = this.props.location

    class G extends Component {
      static childContextTypes = {
        groupIndex: PropTypes.number.isRequired,
        location: PropTypes.object.isRequired,
        initializing: PropTypes.bool
      }

      getChildContext() {
        return {
          groupIndex,
          location,
          initializing: true
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

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

    const children = getChildren(this)
    const div = document.createElement('div')
    children.forEach(c => {
      if (c instanceof Object) {
        render(<G>{c}</G>, div)  // Initialize the Containers in this group
      }                          // (since most tab libraries lazy load tabs)
    })
  }

  /*
  componentDidMount() {
    addGroupChangeListener(this.groupIndex, event => {
      const {currentContainerIndex, onContainerSwitch} = this.props
      //if (event.activeContainer.index !== currentContainerIndex) {
        onContainerSwitch(event)
      //}
    })
  }
  */

  componentWillReceiveProps(newProps) {
    if (newProps.currentContainerIndex !== this.props.currentContainerIndex) {
      switchToContainer(this.groupIndex, newProps.currentContainerIndex)
    }

    const {onContainerSwitch} = this.props
    const indexedStackOrder = getIndexedContainerStackOrder(this.groupIndex)
    if (!_.isEqual(this.indexedStackOrder, indexedStackOrder)) {
      onContainerSwitch({indexedStackOrder})
      this.indexedStackOrder = indexedStackOrder
    }
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