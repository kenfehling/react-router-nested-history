import Page from '../model/Page'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import {Location, History} from 'history'
import * as bowser from 'bowser'
declare const performance:any
declare const Promise:any
declare const window:any

export const needsPopstateConfirmation =
  canUseDOM &&
  !bowser.gecko &&
  !bowser.msedge &&
  !bowser.msie

export const wasLoadedFromRefresh =
  canUseDOM &&
  window.performance &&
  window.performance.navigation.type === 1

export let _history:History = canUseDOM ?
    createBrowserHistory() :
    createMemoryHistory()

export const _resetHistory = () => {
  if (canUseDOM) {
    throw new Error('This is only for tests')
  }
  else {
    _history = createMemoryHistory()
  }
}

export const push = (page:Page) => _history.push(page.url, page.state)
export const replace = (page:Page) => _history.replace(page.url, page.state)
export const go = (n:number) => _history.go(n)
export const back = (n:number=1) => go(0 - n)
export const forward = (n:number=1) => go(n)

//export const setHistory = (h:History) => _history = h
export const listen = (fn:(loc:Location) => void) : () => void => _history.listen(fn)

export const listenPromise = () : Promise<Location> => new Promise(resolve => {
  const unListen = _history.listen((location:Object) => {
    unListen()
    return resolve(location)
  })
})
