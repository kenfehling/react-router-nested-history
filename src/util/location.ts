import {Location, createLocation} from 'history'

declare const window:any

export function locationToString(location:string|Location):string {
  return typeof(location) === 'string' ? location : location.pathname
}

export function stringToLocation(location:string|Location):Location {
  return typeof(location) === 'string' ? createLocation(location) : location
}

export function modifyLocation(location, pathname):Location {
  if (location.href && location.origin) {
    return {...location, pathname, href: location.origin + pathname}
  }
  else {
    return {...location, pathname}
  }
}

export const canUseWindowLocation = window.location instanceof Object