import * as React from 'react'
import {Component, ReactNode, Children, cloneElement} from 'react'
import IContainer from '../../model/IContainer'
import * as R from 'ramda'
import Container from '../../model/Container'

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

export interface DumbWindowProps {
  forName: string
  top?: number
  left?: number
  children?: ReactNode
  className?: string
  topClassName?: string
  visible?: boolean

  stackOrder: Container[]
  storedVisible: boolean
  setCurrentContainerName: (name:string) => void
  close: () => void
}

class DumbHistoryWindow extends Component<DumbWindowProps, undefined> {

  onMouseDown(event) {
    const {forName, setCurrentContainerName} = this.props
    setCurrentContainerName(forName)
    //event.stopPropagation()
  }

  getClassName() {
    const {className, topClassName, forName, stackOrder} = this.props
    const isOnTop = isWindowOnTop(stackOrder, forName)
    return isOnTop && topClassName ? topClassName : className || ''
  }

  componentWillReceiveProps(newProps) {
    const {visible, forName, stackOrder} = newProps
    if (this.props.visible !== visible) {
      if (visible) {

      }
      else {

      }
    }
    else if (!this.props.visible && isWindowOnTop(stackOrder, forName)) {
      // make visible again
    }
  }

  render() {
    const {forName, top, left, children, stackOrder, visible=true} = this.props
    const zIndex = getWindowZIndex(stackOrder, forName)
    const props = {
      className: this.getClassName(),
      onMouseDown: this.onMouseDown.bind(this),
      style: {
        zIndex,
        position: 'absolute',
        top: top ? top + 'px' : '',
        left: left ? left + 'px' : '',
        visibility: visible ? 'visible' : 'hidden'
      }
    }
    return cloneElement(Children.only(children), props)
  }
}

export default DumbHistoryWindow