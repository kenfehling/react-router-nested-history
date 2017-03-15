import * as React from 'react'
import {Component, ReactNode, Children, createElement} from 'react'
import * as R from 'ramda'

const match = (comp:any, C:any):boolean => comp instanceof C || comp.type === C

function _processChildren(component:any, next:Function) {
  const children = component.props.children
  if (children instanceof Function) {
    return next(createElement(children))
  }
  else {
    const cs = Array.isArray(children) ?
        R.flatten(children) : Children.toArray(children)
    return R.flatten(cs.map((c:ReactNode) => next(c)))
  }
}

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
  else if (component.type instanceof Function) {
    try {
      return next(component.type(component.props))
    }
    catch(e) {
      try {
        return next(new component.type(component.props).render())
      }
      catch(e) {}
    }
  }
  else if (component.props && component.props.children) {
    return _processChildren(component, next)
  }
  //else if (component.type.children) {
  //  return _processChildren(component.type, next)
  //}
  return [component]
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