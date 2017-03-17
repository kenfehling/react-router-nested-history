import * as React from 'react'
import {
  Component, PropTypes, ReactNode, ReactElement, Children, cloneElement
} from 'react'
import IContainer from '../../model/IContainer'
import * as R from 'ramda'

const getWindowZIndex = (stackOrder:IContainer[]|null, name:string) => {
  if (stackOrder && !R.isEmpty(stackOrder)) {
    const index = R.findIndex(c => c.name === name, stackOrder)
    if (index !== -1) {
      return stackOrder.length - index + 1
    }
  }
  return 1
}

const isWindowOnTop = (stackOrder:IContainer[]|null, name:string) => {
  if (stackOrder && !R.isEmpty(stackOrder)) {
    const index = R.findIndex(c => c.name === name, stackOrder)
    return index === 0
  }
  return false
}


interface ChildrenFunctionArgs {
  isOnTop: boolean
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

interface WindowProps {
  forName: string
  top?: number
  left?: number
  children?: ChildrenType
  className?: string
  topClassName?: string
}

export default class HistoryWindow extends Component<WindowProps, undefined> {
  static contextTypes = {
    stackOrder: PropTypes.arrayOf(PropTypes.object), //.isRequired,
    setCurrentContainerName: PropTypes.func //.isRequired
  }

  onMouseDown(event) {
    const {forName} = this.props
    const {setCurrentContainerName} = this.context
    setCurrentContainerName(forName)
    //event.stopPropagation()
  }

  getClassName() {
    const {className, topClassName, forName} = this.props
    const {stackOrder} = this.context
    const isOnTop = isWindowOnTop(stackOrder, forName)
    return isOnTop && topClassName ? topClassName : className || ''
  }

  render() {
    const {forName, top, left, children} = this.props
    const {stackOrder} = this.context
    const zIndex = getWindowZIndex(stackOrder, forName)
    const props = {
      className: this.getClassName(),
      onMouseDown: this.onMouseDown.bind(this),
      style: {
        zIndex,
        position: 'absolute',
        top: top ? top + 'px' : '',
        left: left ? left + 'px' : ''
      }
    }
    return cloneElement(Children.only(children), props)
  }
}