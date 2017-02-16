import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'

interface WindowProps {
  top?: number,
  left?: number,
  children?: ReactNode,
  className?: string
  style?: Object
}

export default class Window extends Component<WindowProps, undefined> {
  static contextTypes = {
    zIndex: PropTypes.number.isRequired
  }

  render() {
    const {top, left, children, className, style} = this.props
    const {zIndex} = this.context
    return (<div className={className}
         style={{
         ...style,
         zIndex,
         position: 'absolute',
         top: top ? top + 'px' : '',
         left: left ? left + 'px' : ''
       }}
    >
      {children}
    </div>)
  }
}