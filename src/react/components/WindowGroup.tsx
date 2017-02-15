import * as React from 'react'
import {Component, Children, ReactNode, ReactElement} from 'react'
import ContainerGroup from './ContainerGroup'
import {ContainerGroupProps} from './ContainerGroup'
import {ChildrenFunctionArgs} from './DumbContainerGroup'

function getWindowZIndex(indexedStackOrder, index) {
  if (indexedStackOrder.length > index) {
    return indexedStackOrder.length - indexedStackOrder[index] + 1
  }
  else {
    return 1
  }
}

export default ({children, ...groupProps}:ContainerGroupProps) => (
  <ContainerGroup
    {...groupProps}
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