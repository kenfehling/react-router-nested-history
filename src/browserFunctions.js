// @flow
/* globals performance */
declare var performance:any
declare var Promise:any
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import type { Page } from './types'
import { canUseWindowLocation } from './util/location'

export let _history = canUseWindowLocation ?
    createBrowserHistory() :
    createMemoryHistory()

export const _resetHistory = () => {
  if (canUseWindowLocation) {
    throw new Error("This is only for tests")
  }
  else {
    _history = createMemoryHistory()
  }
}

export const push = (url:string, id:number) => _history.push(url, {id})
export const replace = (url:string, id:number) => _history.replace(url, {id})
export const go = (n:number) => _history.go(n)
export const back = (n:number=1) => go(0 - n)
export const forward = (n:number=1) => go(n)

export const setHistory = (h:Object) => _history = h
export const listen = (fn:Function) => _history.listen(fn)
export const listenBefore = (fn:Function) => _history.listenBefore(fn)

export const listenPromise = () : Promise => new Promise(resolve => {
  const unListen = _history.listen((location:Object) => {
    unListen()
    resolve(location)
  })
})

export const loadedFromRefresh = !!window.performance && performance.navigation.type == 1
