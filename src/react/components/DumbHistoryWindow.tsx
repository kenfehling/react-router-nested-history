import * as React from 'react'
import {Component, ReactNode, ReactElement} from 'react'
import omit from 'lodash/omit'
import * as Draggable from 'react-draggable'

const noop = () => {}

export interface WindowPosition {
  x: number
  y: number
}

interface ChildrenFunctionArgs {
  switchTo: () => void
  open: () => void
  close: () => void
}

type ChildrenType = ReactNode & {props?:any} |
                    ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface BaseWindowProps {
  top?: number
  middle?: number
  bottom?:number
  left?: number
  center?: number
  right?: number
  draggable?: boolean
  draggableProps?: Object
  rememberPosition?: boolean
  children?: ChildrenType
  className?: string
  style?: Object
  topClassName?: string
  visible?: boolean
}

export type DumbWindowProps = BaseWindowProps & ChildrenFunctionArgs & {
  containerName: string

  windowGroupWidth: number
  windowGroupHeight: number

  zIndex: number
  isOnTop: boolean
  storedVisible: boolean
  storedPosition: {x:number, y:number}|undefined
  move: (data: {x:number, y:number}) => void
}

interface DumbWindowState {
  width: number,
  height: number
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
    if (element) {
      const width = element.offsetWidth
      const height = element.offsetHeight
      if (width > this.state.width || height > this.state.height) {
        this.setState({width, height})
      }
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
        return Math.round((windowGroupWidth - this.state.width) / 2) + center
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

  getClassName() {
    const {className, topClassName, isOnTop} = this.props
    return isOnTop ? [ topClassName, className ].join(' ') : className || ''
  }

  onMouseDown(event) {
    const {switchTo} = this.props
    switchTo()
    //event.stopPropagation()
  }

  onDragEnd(event:MouseEvent, data:any) {
    const {draggable, rememberPosition=draggable} = this.props
    if (rememberPosition) {
      this.props.move({x: data.x, y: data.y})
    }
  }

  render() {
    const {
      children,
      style={},
      zIndex,
      storedVisible,
      switchTo,
      open,
      close,
      draggable,
      draggableProps={},
      rememberPosition=draggable,
      ...divProps
    } = omit(this.props, [
      'store',
      'setCurrentContainerName',
      'loadedFromPersist',
      'isInitialized',
      'createWindow',
      'topClassName',
      'containerName',
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
      'isOnTop',
      'storedPosition',
      'storeSubscription'
    ])
    const drag:boolean = !!draggable && !!storedVisible
    const x:number|undefined = this.calculateX()
    const y:number|undefined = this.calculateY()

    //onTouchMove={e => e.preventDefault()}
    const w = (
      <div {...divProps}
          ref={(el:HTMLElement) => this.calculateDimensions(el)}
          className={this.getClassName()}
          onMouseDown={drag ? noop : this.onMouseDown.bind(this)}
          style={{
                ...style,
                zIndex,
                position: 'absolute',
                display: storedVisible ? 'block' : 'none',
                x: !drag ? x : undefined,
                y: !drag ? y : undefined
             }}
      >
        {children instanceof Function ? children({switchTo, open, close}) : children}
      </div>
    )
    const hasDefaultPosition = rememberPosition || this.state.width !== 0
    if (drag && hasDefaultPosition) {
      return (
        <Draggable grid={[1, 1]}
                   {...draggableProps}
                   onStop={this.onDragEnd.bind(this)}
                   onMouseDown={this.onMouseDown.bind(this)}
                   position={rememberPosition ? {x, y} : undefined}
                   defaultPosition={hasDefaultPosition ? {x, y} : undefined}
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