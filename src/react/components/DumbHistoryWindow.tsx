import * as React from 'react'
import {Component, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'
import {ComputedContainer} from '../../model/ComputedState'

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
  style?: Object
  topClassName?: string
  visible?: boolean

  stackOrder: ComputedContainer[]
  storedVisible: boolean
  open: () => void
  close: () => void
}

const getWindowZIndex = (stackOrder:ComputedContainer[]|null, name:string) => {
  if (stackOrder && !R.isEmpty(stackOrder)) {
    const index = R.findIndex(c => c.name === name, stackOrder)
    if (index !== -1) {
      return stackOrder.length - index + 1
    }
  }
  return 1
}

const isWindowOnTop = (stackOrder:ComputedContainer[]|null, name:string) => {
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
      style={},
      stackOrder,
      storedVisible,
      open,
      close,
      ...divProps
    } = R.omit([
      'store',
      'setCurrentContainerName',
      'loadedFromRefresh',
      'isInitialized',
      'createWindow',
      'initializing',
      'topClassName',
      'storeSubscription'
    ], this.props)
    const zIndex = getWindowZIndex(stackOrder, forName)
    return (
      <div className={this.getClassName()}
           onMouseDown={this.onMouseDown.bind(this)}
           {...divProps}
           style={{
              ...style,
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