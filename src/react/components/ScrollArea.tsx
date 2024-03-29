import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import * as omit from 'lodash.omit'

interface ScrollAreaProps {
  resetOnLeave?: boolean,
  horizontal?: boolean,
  vertical?: boolean,
  style?: Object
}

export default class ScrollArea extends Component<ScrollAreaProps, undefined> {
  private static scrollLefts = {}
  private static scrollTops = {}
  private scrollArea: HTMLDivElement

  static contextTypes = {
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  checkProps() {
    if (this.context.groupName == null) {
      throw new Error('ScrollArea needs to be inside a ContainerGroup')
    }
    if (this.context.containerName == null) {
      throw new Error('ScrollArea needs to be inside a Container')
    }
  }

  getKey():string {
    const {groupName, containerName} = this.context
    return groupName + '_' + containerName
  }

  saveScrolls({left=0, top=0}) {
    const key:string = this.getKey()
    ScrollArea.scrollLefts[key] = left
    ScrollArea.scrollTops[key] = top
  }

  onScroll(event) {
    this.saveScrolls({
      left: event.target.scrollLeft,
      top: event.target.scrollTop
    })
  }

  loadScrolls() {
    const key:string = this.getKey()
    if (this.scrollArea) {
      this.scrollArea.scrollLeft = ScrollArea.scrollLefts[key] || 0
      this.scrollArea.scrollTop = ScrollArea.scrollTops[key] || 0
    }
  }

  clearScrolls() {
    this.saveScrolls({})
  }

  componentDidMount() {
    this.checkProps()
    this.loadScrolls()
  }

  componentWillUnmount() {
    if (this.props.resetOnLeave) {
      this.clearScrolls()
    }
  }

  render() {
    const {
      children,
      horizontal=false,
      vertical=false,
      style={},
      ...divProps
    } = omit(this.props, ['resetOnLeave'])
    return (
      <div ref={(ref) => this.scrollArea = ref}
           onScroll={this.onScroll.bind(this)}
           {...divProps}
           style={{
             ...style,
             overflowX: horizontal ? 'scroll' : 'hidden',
             overflowY: vertical ? 'scroll' : 'hidden',
             WebkitOverflowScrolling: 'touch'
           }}
      >
        {children}
      </div>
    )
  }
}