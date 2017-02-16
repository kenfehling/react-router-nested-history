import * as React from 'react'
import {Component, PropTypes, Children, ReactNode, ReactElement} from 'react'
import ContainerGroup from './ContainerGroup'
import {ContainerGroupProps} from './ContainerGroup'
import {ChildrenFunctionArgs} from './DumbContainerGroup'
import * as R from 'ramda'

const getWindowZIndex = (iOrder, index) =>
    iOrder.length > index ? iOrder.length - iOrder[index] + 1 : 1

const defaultToFalse = (p:boolean|undefined):boolean => p == null ? false : p

const changeDefaults = (props:ContainerGroupProps):ContainerGroupProps => ({
  ...props,
  useDefaultContainer: defaultToFalse(props.useDefaultContainer),
  hideInactiveContainers: defaultToFalse(props.hideInactiveContainers)
})

interface WindowWrapperProps {
  zIndex: number,
  isOnTop: boolean,
  onClick: () => void
}

class WindowWrapper extends Component<WindowWrapperProps, undefined> {
  static childContextTypes = {
    zIndex: PropTypes.number.isRequired,
    isOnTop: PropTypes.bool.isRequired
  }

  getChildContext() {
    return R.pick(['zIndex', 'isOnTop'], this.props)
  }

  render() {
    const {onClick, children} = this.props
    return <div onClick={onClick}>{children}</div>
  }
}

export default ({children, ...groupProps}:ContainerGroupProps) => (
  <ContainerGroup
    {...changeDefaults(groupProps)}
    children={(props:ChildrenFunctionArgs) => {
      const c:ReactNode = children instanceof Function ?
            children(props).props.children : children

      return (
        <div style={{position: 'relative'}}>
          {Children.map(c, (child:ReactElement<any>, i:number) => (
            <WindowWrapper key={i}
                           onClick = {() => props.setCurrentContainerIndex(i)}
                           zIndex={getWindowZIndex(props.indexedStackOrder, i)}
                           isOnTop={props.indexedStackOrder[i] === 0}
            >
              {child}
            </WindowWrapper>
          ))}
        </div>
      )}
    }
  />
)