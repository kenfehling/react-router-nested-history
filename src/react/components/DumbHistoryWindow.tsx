import * as React from 'react'
import {Component, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'
import {ComputedContainer} from '../../model/ComputedState'
import * as Dimensions from 'react-dimensions'

interface ChildrenFunctionArgs {
  open: () => void
  close: () => void
  zIndex: number
}

type ChildrenType = ReactNode & {props?:any} |
                    ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface DumbWindowProps {
  forName: string
  top?: number
  middle?: number
  bottom?:number
  left?: number
  center?: number
  right?: number
  children: ChildrenType
  className?: string
  style?: Object
  topClassName?: string
  visible?: boolean

  containerWidth: number,  // From react-dimensions
  containerHeight: number,

  stackOrder: ComputedContainer[]
  storedVisible: boolean
  open: () => void
  close: () => void
}

interface DumbWindowState {
  width: number,
  height: number
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

const countNonNulls = (...params:any[]):number =>
    params.reduce((n:number, param:any) => param != null ? n + 1 : n, 0)

class DumbHistoryWindow extends Component<DumbWindowProps, DumbWindowState> {

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

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

  componentWillMount() {
    const {
      top,
      middle,
      bottom,
      left,
      center,
      right
    } = this.props
    if (countNonNulls(top, middle, bottom) > 1) {
      throw new Error('You can only pass one: top, middle, or bottom')
    }
    if (countNonNulls(left, center, right) > 1) {
      throw new Error('You can only pass one: left, center, or right')
    }
  }

  componentWillReceiveProps(newProps) {
    const {visible, open, close} = newProps
    if (visible !== this.props.visible) {
      (visible ? open : close)()
    }
  }

  calculateDimensions(element:HTMLElement) {
    if (element && this.state.width === 0) {
      this.setState({
        width: element.offsetWidth,
        height: element.offsetHeight
      })
    }
  }

  calculateX():number|undefined {
    const {left, center, right, containerWidth} = this.props
    if (left != null) {
      return left
    }
    else if (right != null) {
      return containerWidth - right
    }
    else if (center != null) {
      return (containerWidth - this.state.width) / 2 + center
    }
  }

  calculateY():number|undefined {
    const {top, middle, bottom, containerHeight} = this.props
    if (top != null) {
      return top
    }
    else if (bottom != null) {
      return containerHeight - bottom
    }
    else if (middle != null) {
      return (containerHeight - this.state.height) / 2 + middle
    }
  }

  render() {
    const {
      forName,
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
      'visible',
      'containerWidth',
      'containerHeight',
      'updateDimensions',
      'top',
      'middle',
      'bottom',
      'left',
      'center',
      'right',
      'storeSubscription'
    ], this.props)
    const zIndex = getWindowZIndex(stackOrder, forName)
    const x:number|undefined = this.calculateX()
    const y:number|undefined = this.calculateY()
    return (
      <div {...divProps}
           ref={(element) => this.calculateDimensions(element)}
           className={this.getClassName()}
           onMouseDown={this.onMouseDown.bind(this)}
           style={{
              ...style,
              zIndex,
              position: 'absolute',
              left: x ? x + 'px' : '',
              top: y ? y + 'px' : '',
              display: storedVisible ? 'block' : 'none'
           }}
      >
        {children instanceof Function ? children({open, close, zIndex}) : children}
      </div>
    )
  }
}

export default Dimensions()(DumbHistoryWindow)