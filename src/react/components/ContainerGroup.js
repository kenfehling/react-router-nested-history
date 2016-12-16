import React, { Component, PropTypes, Children } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import store from '../store'
import { getNextGroupIndex, switchToContainer } from '../../main'
import * as _ from "lodash"
import Container from "./Container"
import {getIndexedContainerStackOrder} from "../../util/history";

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

    console.log('CWRP', newProps)

    if (newProps.currentContainerIndex !== this.props.currentContainerIndex) {
      switchToContainer(this.groupIndex, newProps.currentContainerIndex)
    }
    else {
      const f = getIndexedContainerStackOrder
      const {historyActions, onContainerSwitch} = this.props
      const oldIndexedStackOrder = f(historyActions, this.groupIndex)
      const newIndexedStackOrder = f(newProps.historyActions, this.groupIndex)
      if (_.isEqual(oldIndexedStackOrder, newIndexedStackOrder)) {
        onContainerSwitch({
          indexedStackOrder: newIndexedStackOrder
        })
      }
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

const ConnectedContainerGroup = connect(
  state => ({
    location: state.location,
    historyActions: state.history
  }),
  {}
)(ContainerGroup)

export default props => <ConnectedContainerGroup store={store} {...props} />