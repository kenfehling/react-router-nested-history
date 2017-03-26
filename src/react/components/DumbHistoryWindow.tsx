import * as React from 'react'
import {Component, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'
import {ComputedContainer} from '../../model/ComputedState'
import * as Draggable from 'react-draggable'

const noop = () => {}

interface ChildrenFunctionArgs {
  open: () => void
  close: () => void
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
  draggable?: boolean
  draggableProps?: Object
  children: ChildrenType
  className?: string
  style?: Object
  topClassName?: string
  visible?: boolean

  windowGroupWidth: number
  windowGroupHeight: number

  stackOrder: ComputedContainer[]
  storedVisible: boolean
  storedPosition: {x:number, y:number}|undefined
  open: () => void
  close: () => void
  move: (data: {x:number, y:number}) => void
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
    const {left, center, right, windowGroupWidth, storedPosition} = this.props
    if (storedPosition) {
      return storedPosition.x
    }
    else {
      if (left != null) {
        return left
      }
      else if (right != null) {
        return windowGroupWidth - right - this.state.width
      }
      else if (center != null) {
        return (windowGroupWidth - this.state.width) / 2 + center
      }
    }
    return 0
  }

  calculateY():number|undefined {
    const {top, middle, bottom, windowGroupHeight, storedPosition} = this.props
    if (storedPosition) {
      return storedPosition.y
    }
    else {
      if (top != null) {
        return top
      }
      else if (bottom != null) {
        return windowGroupHeight - bottom - this.state.height
      }
      else if (middle != null) {
        return Math.round((windowGroupHeight - this.state.height) / 2) + middle
      }
    }
    return 0
  }

  onDrag(event:MouseEvent, data:any) {
    this.props.move({x: data.x, y: data.y})
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
      draggable,
      draggableProps={},
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
      'windowGroupWidth',
      'windowGroupHeight',
      'updateDimensions',
      'top',
      'middle',
      'bottom',
      'left',
      'center',
      'right',
      'move',
      'storedPosition',
      'storeSubscription'
    ], this.props)
    const zIndex:number = getWindowZIndex(stackOrder, forName)
    const drag:boolean = !!draggable && !!storedVisible
    const w = (
      <div {...divProps}
          ref={drag ? (el:HTMLElement) => this.calculateDimensions(el) : noop}
          className={this.getClassName()}
          onMouseDown={drag ? noop : this.onMouseDown.bind(this)}
          style={{
                ...style,
                zIndex,
                position: 'absolute',
                display: storedVisible ? 'block' : 'none'
             }}
      >
        {children instanceof Function ? children({open, close}) : children}
      </div>
    )
    if (drag) {
      const x:number|undefined = this.calculateX()
      const y:number|undefined = this.calculateY()
      return (
        <Draggable {...draggableProps}
                    onStop={this.onDrag.bind(this)}
                    onMouseDown={this.onMouseDown.bind(this)}
                    position={{x, y}}
        >
          {w}
        </Draggable>
      )
    }
    else {
      return w
    }
  }
}

export default DumbHistoryWindow