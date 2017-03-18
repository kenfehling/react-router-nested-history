import * as React from 'react'
import {Component, ReactNode, ReactElement} from 'react'
import IContainer from '../../model/IContainer'
import * as R from 'ramda'
import Container from '../../model/Container'

interface ChildrenFunctionArgs {
  open: () => void
  close: () => void
}

type ChildrenType = ReactNode & {props?:any} |
                    ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface DumbWindowProps {
  forName: string
  top?: number
  left?: number
  children: ChildrenType
  className?: string
  topClassName?: string
  visible?: boolean

  stackOrder: Container[]
  storedVisible: boolean
  open: () => void
  close: () => void
}

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

class DumbHistoryWindow extends Component<DumbWindowProps, undefined> {

  onMouseDown(event) {
    const {open} = this.props
    open()
    //event.stopPropagation()
  }

  getClassName() {
    const {className, topClassName, forName, stackOrder} = this.props
    const isOnTop = isWindowOnTop(stackOrder, forName)
    return isOnTop && topClassName ? topClassName : className || ''
  }

  componentWillReceiveProps(newProps) {
    const {visible, open, close} = newProps
    if (visible !== this.props.visible) {
      (visible ? open : close)()
    }
  }

  render() {
    const {
      forName,
      top,
      left,
      children,
      stackOrder,
      storedVisible,
      open,
      close
    } = this.props
    const zIndex = getWindowZIndex(stackOrder, forName)
    return (
      <div className={this.getClassName()}
           onMouseDown={this.onMouseDown.bind(this)}
           style={{
              zIndex,
              position: 'absolute',
              top: top ? top + 'px' : '',
              left: left ? left + 'px' : '',
              visibility: storedVisible ? 'visible' : 'hidden'
           }}
      >
        {children instanceof Function ? children({open, close}) : children}
      </div>
    )
  }
}

export default DumbHistoryWindow