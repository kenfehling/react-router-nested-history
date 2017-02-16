import * as React from 'react'
import {Children, ReactNode, ReactElement} from 'react'
import ContainerGroup from './ContainerGroup'
import {ContainerGroupProps} from './ContainerGroup'
import {ChildrenFunctionArgs} from './DumbContainerGroup'

const getWindowZIndex = (iOrder, index) =>
    iOrder.length > index ? iOrder.length - iOrder[index] + 1 : 1

const defaultToFalse = (p:boolean|undefined):boolean => p == null ? false : p

const changeDefaults = (props:ContainerGroupProps):ContainerGroupProps => ({
  ...props,
  useDefaultContainer: defaultToFalse(props.useDefaultContainer),
  hideInactiveContainers: defaultToFalse(props.hideInactiveContainers)
})

export default ({children, ...groupProps}:ContainerGroupProps) => (
  <ContainerGroup
    {...changeDefaults(groupProps)}
    children={(props:ChildrenFunctionArgs) => {
      const c:ReactNode = children instanceof Function ?
            children(props).props.children : children

      return (
        <div style={{position: 'relative'}}>
          {Children.map(c, (child:ReactElement<any>, i:number) => (
            <div key={i}
                 onClick={() => props.setCurrentContainerIndex(i)}
                 className={'rrnh-window-wrapper-' + (i + 1)}
                 style={{
                    zIndex: getWindowZIndex(props.indexedStackOrder, i),
                    position: 'absolute'
                 }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    }
  />
)