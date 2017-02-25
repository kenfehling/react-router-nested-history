import * as React from 'react'
import {
  Component, PropTypes, ReactNode, ReactElement, Children, cloneElement
} from 'react'

interface ChildrenFunctionArgs {
  isOnTop: boolean
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

interface WindowProps {
  top?: number
  left?: number
  children?: ChildrenType
  style?: Object
}

export default class Window extends Component<WindowProps, undefined> {
  static contextTypes = {
    zIndex: PropTypes.number.isRequired,
    isOnTop: PropTypes.bool.isRequired
  }

  render() {
    // Pass through all props you could want on a div
    const {top, left, children, style, ...divProps} = this.props
    const {zIndex, isOnTop} = this.context
    return (
      <div {...divProps}
           style={{
             ...style,
             zIndex,
             position: 'absolute',
             top: top ? top + 'px' : '',
             left: left ? left + 'px' : ''
           }}
      >
        {children instanceof Function ? children({isOnTop}) :
            cloneElement(Children.only(children), {isOnTop})}
      </div>
    )
  }
}