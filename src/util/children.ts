import * as React from 'react'
import {Component, ReactNode, Children, createElement} from 'react'
import * as R from 'ramda'

const match = (comp:any, C:any):boolean => comp instanceof C || comp.type === C

function _getChildren(component:any,
                      stopAt:any[],
                      stopAtNested:any[]=[], depth:number):ReactNode[] {
  const matchAny = cs => R.any(c => match(component, c), cs)
  const next = c => _getChildren(c, stopAt, stopAtNested, depth + 1)

  if (!(component instanceof Component) && !component.type) {
    return []
  }
  else if (matchAny(stopAt) || (depth > 0 && matchAny(stopAtNested))) {
    return [component]  // Stop if you find one of the stop classes
  }
  else if (component.props && component.props.children) {
    if (component.props.children instanceof Function) {
      return next(createElement(component.props.children))
    }
    else {
      const children = Children.toArray(component.props.children)
      return R.flatten(children.map((c:ReactNode) => next(c)))
    }
  }
  else if (component.type instanceof Function && !component.type.name) {
    try {
      return next(component.type(component.props))
    }
    catch(e) {
      console.log(component.type)
      return next(new component.type(component.props).render())
    }

  }
  else {  // no children
    return [component]
  }
}

/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
export function getChildren(component:any,
                            stopAt:any[],
                            stopAtNested:any[]=[]) {
  return _getChildren(component, stopAt, stopAtNested, 0)
}