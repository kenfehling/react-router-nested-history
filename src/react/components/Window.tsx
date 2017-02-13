import * as React from 'react'
import { Component, Children, ReactNode, ReactElement, cloneElement } from 'react'

interface WindowProps {
  top: number,
  left: number,
  children?: ReactNode,
  className?: string
  style?: Object
}

export default ({top, left, children, className, style}:WindowProps) => (
  <div className={className}
       style={{
         ...style,
         position: 'absolute',
         top: top ? top + 'px' : '',
         left: left ? left + 'px' : ''
       }}
  >
    {children}
  </div>
)