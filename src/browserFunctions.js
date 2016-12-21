// @flow

import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import type { Page } from './types'
import { canUseWindowLocation } from './util/location'

export let _history = canUseWindowLocation ?
    createBrowserHistory() :
    createMemoryHistory()

export const push = (page:Page) => {
  const state = {id: page.id}
  _history.push(page.url, state)
}

export const replace = (page: Page) => _history.replace(page.url, {id: page.id})
export const go = (n:number) => _history.go(n)
export const back = (n:number=1) => go(0 - n)
export const forward = (n:number=1) => go(n)

export const setHistory = (h) => _history = h
export const listen = (fn) => _history.listen(fn)
export const listenBefore = (fn) => _history.listenBefore(fn)

export const listenPromise = () => new Promise(resolve => {
  const unListen = _history.listen(location => {
    unListen()
    resolve(location)
  })
})