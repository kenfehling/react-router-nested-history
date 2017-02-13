import * as React from 'react'
import { Component, PropTypes } from 'react'
import { LinkProps } from 'react-router'
import { createPath } from 'history/PathUtils'
import { push } from '../../main'

export default class HistoryLink extends Component<LinkProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired,
    patterns: PropTypes.arrayOf(PropTypes.string)
  }

  componentDidMount() {
    if (this.context.groupName == null) {
      throw new Error('HistoryLink needs to be inside a ContainerGroup')
    }
    if (this.context.containerName == null) {
      throw new Error('HistoryLink needs to be inside a Container')
    }
  }

  getUrl() {
    const {to} = this.props
    return typeof(to) === 'string' ? to : createPath(to)
  }

  onClick(event) {
    const {containerName, groupName, patterns} = this.context
    push(groupName, containerName, this.getUrl(), patterns)
    event.preventDefault()
  }

  render() {
    /*
    return <Link
        {...this.props}
        onClick={this.onClick.bind(this)}
    />
    */
    return (<a href={this.getUrl()} onClick={this.onClick.bind(this)}>
      {this.props.children}
    </a>)
  }
}