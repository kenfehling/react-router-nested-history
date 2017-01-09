// @flow
import * as _ from 'lodash'
import type { History, Page } from '../types'

export const push = (h:History, page:Page) : History => ({
  back: [...h.back, h.current],
  current: page,
  forward: []
})

export const back = (h:History, n:number=1) : History =>
  n === 0 ? h : back({
    back: _.initial(h.back),
    current: _.last(h.back),
    forward: [h.current, ...h.forward]
  }, n - 1)

export const forward = (h:History, n:number=1) : History =>
  n === 0 ? h : forward({
    back: [...h.back, h.current],
    current: _.head(h.forward),
    forward: _.tail(h.forward)
  }, n - 1)

export const go = (h:History, n:number) : History =>
  n === 0 ? h : n < 0 ? back(h, 0 - n) : forward(h, n)

export const getShiftAmount = (h:History, pageEq:Function) : number => {
  if (!_.isEmpty(h.back)) {
    const i = _.findIndex(h.back, pageEq)
    if (i !== -1) {
      return 0 - (_.size(h.back) - i)
    }
  }
  if (!_.isEmpty(h.forward)) {
    const i = _.findIndex(h.forward, pageEq)
    if (i !== -1) {
      return i + 1
    }
  }
  return 0
}

export const getShiftAmountForId = (h:History, id:number) : number =>
  getShiftAmount(h, (p:Page) => p.id === id)

export const getShiftAmountForUrl = (h:History, url:string) : number =>
  getShiftAmount(h, (p:Page) => p.url === url)

export const shiftToId = (h:History, id:number) : History => {
  const shiftAmount = getShiftAmountForId(h, id)
  return shiftAmount === 0 ? h : go(h, shiftAmount)
}

export const getPagesBefore = (h:History, page:Page) : Page[] =>
  shiftToId(h, page.id).back
