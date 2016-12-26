// @flow
import * as _ from 'lodash'
import type { History, Page, State, Container, Group } from '../types'

export const pushToStack = (historyStack:History, page:Page) : History => ({
  back: [...historyStack.back, historyStack.current],
  current: page,
  forward: []
})

export const replaceCurrent = (historyStack:History, page:Page) : History => ({
  ...historyStack,
  current: page
})

export const back = (historyStack:History) : History => ({
  back: _.initial(historyStack.back),
  current: _.last(historyStack.back),
  forward: [historyStack.current, ...historyStack.forward]
})

export const forward = (historyStack:History) : History => ({
  back: [...historyStack.back, historyStack.current],
  current: _.head(historyStack.forward),
  forward: _.tail(historyStack.forward)
})

export function getActiveGroup(state:State):Group {
  return state.groups[state.activeGroupIndex]
}

export function getActiveContainer(state:State):Container {
  const group = getActiveGroup(state)
  return group.containers[group.history.current.containerIndex]
}

export function getCurrentPageInGroup(state:State, groupIndex:number) {
  return state.groups[groupIndex].history.current
}

export function getActivePage(state:State) {
  return getCurrentPageInGroup(state, getActiveGroup(state).index)
}

export const findGroupWithCurrentUrl = (state:State, url:string) : Group =>
    _.find(state.groups, (g:Group) : boolean => g.history.current.url === url)

export const isZeroPage = (page:Page) : boolean => page.id === 0

export const isOnZeroPage = (state:State) : boolean =>
    isZeroPage(getActivePage(state))

export const filterZero = (pages:Page[]) => pages.filter(p => !!p.id)

export const toBrowserHistory = (history:History, zeroPage:string) : History => ({
  ...history,
  back: [{url: zeroPage, id: 0, containerIndex: 0}, ...history.back]
})