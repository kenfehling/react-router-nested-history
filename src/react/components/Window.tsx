import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import ReactElement = React.ReactElement

interface WindowProps {
  top?: number,
  left?: number,
  children?: ReactNode,
  className?: string
  style?: Object
}

interface ChildrenFunctionArgs {
  isOnTop: boolean
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

export default class Window extends Component<WindowProps, undefined> {
  static contextTypes = {
    zIndex: PropTypes.number.isRequired,
    isOnTop: PropTypes.bool.isRequired
  }

  render() {
    const {top, left, children, className, style} = this.props
    const {zIndex, isOnTop} = this.context
    return (<div className={className}
         style={{
         ...style,
         zIndex,
         position: 'absolute',
         top: top ? top + 'px' : '',
         left: left ? left + 'px' : ''
       }}
    >
      {children instanceof Function ? children({isOnTop}) : children}
    </div>)
  }
}