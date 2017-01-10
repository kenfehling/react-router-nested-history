// @flow
import * as _ from 'lodash'
import type { History, Page, Container, Group } from '../types'
import { State, InitializedState, UninitializedState } from '../types'
import { switchContainer } from "../behaviorist"
import { parseParamsFromPatterns } from "./url";
import * as historyUtil from './history'

export function go(oldState:InitializedState, n:number) : InitializedState {
  if (n === 0) {
    return oldState
  }
  const state:InitializedState = _.cloneDeep(oldState)
  const group = getActiveGroup(state)
  const container:Container = getActiveContainerInGroup(state, group.index)
  const f = n < 0 ? historyUtil.back : historyUtil.forward
  const getStack = (h:History) : Page[] => n < 0 ? h.back : h.forward
  const nextN = n < 0 ? n + 1 : n - 1
  if (getStack(group.history).length > 0) {
    group.history = f(group.history)
    if (getStack(container.history).length > 0) {
      container.history = f(container.history)
    }
    state.browserHistory = f(state.browserHistory)
  }
  return go(state, nextN)
}

export const shiftToId = (state:InitializedState, id:number) : InitializedState => {
  const shiftAmount = getShiftAmountForId(state, id)
  if (shiftAmount === 0) {
    return state
  }
  else {
    return go(state, shiftAmount)
  }
}

export const top = (oldState:InitializedState, groupIndex:number,
                    containerIndex:number) : InitializedState => {
  const state:InitializedState = _.cloneDeep(oldState)
  const group:Group = state.groups[groupIndex]
  const container:Container = getContainer(state, groupIndex, containerIndex)
  const newCurrentPage:Page = _.find(
      [...container.history.back, container.history.current],
      (p:Page) => p.url === container.initialUrl)
  container.history = historyUtil.top(container.history)
  group.history = {
    back: historyUtil.getPagesBefore(group.history, newCurrentPage),
    current: newCurrentPage,
    forward: []
  }
  state.browserHistory = {
    back: historyUtil.getPagesBefore(state.browserHistory, newCurrentPage),
    current: newCurrentPage,
    forward: []
  }
  return state
}

export function switchToContainer(state:InitializedState, groupIndex:number,
                                  containerIndex:number,
                                  zeroPage:string) : InitializedState {
  const newState:InitializedState = isOnZeroPage(state) ?
      _.cloneDeep(go(state, 1, zeroPage)) : _.cloneDeep(state)
  const group:Group = newState.groups[groupIndex]
  const oldContainerIndex = group.history.current.containerIndex
  const from:Container = group.containers[oldContainerIndex]
  const to:Container = getContainer(newState, groupIndex, containerIndex)
  const defaulT:?Container =
      _.find(group.containers, (c:Container) => c.isDefault)
  group.history = switchContainer(from, to, defaulT)
  newState.browserHistory = toBrowserHistory(group.history, zeroPage)
  newState.activeGroupIndex = group.index
  return newState
}

export const pushPage = (oldState:InitializedState, groupIndex:number,
                         page:Page) : State => {
  const state:InitializedState = _.cloneDeep(oldState)
  const group:Group = state.groups[groupIndex]
  const container:Container = group.containers[page.containerIndex]
  container.history = historyUtil.push(container.history, page)
  group.history = historyUtil.push(group.history, page)
  state.browserHistory = historyUtil.push(state.browserHistory, page)
  state.lastPageId = Math.max(state.lastPageId, page.id)
  return state
}

export const pushUrl = (state:InitializedState, url:string, params:Object,
                        groupIndex:number, containerIndex:number,
                        zeroPage:string) : InitializedState => {
  const f:Function = (s:InitializedState) => pushPage(s, groupIndex, {
    url,
    params,
    id: s.lastPageId + 1,
    containerIndex: containerIndex
  })
  const active:Container = getActiveContainer(state)
  if (groupIndex !== active.groupIndex || containerIndex !== active.index) {
    return f(switchToContainer(state, groupIndex, containerIndex, zeroPage))
  }
  else {
    return f(state)
  }
}

export function getActiveGroup(state:InitializedState) : Group {
  return state.groups[state.activeGroupIndex]
}

export const getBackPage = (state:InitializedState) : ?Page => {
  const group:Group = getActiveGroup(state)
  return _.last(group.history.back)
}

export const getActiveContainerInGroup = (state:State,
                                          groupIndex:number) : Container => {
  const group = state.groups[groupIndex]
  return group.containers[group.history.current.containerIndex]
}

export const getActivePageInGroup = (state:State, groupIndex:number) : Page =>
  state.groups[groupIndex].history.current

export const getActivePageInContainer = (state:State, groupIndex:number,
                                         containerIndex:number) : Page =>
  state.groups[groupIndex].containers[containerIndex].history.current

export const getActiveContainer = (state:InitializedState) : Container =>
  getActiveContainerInGroup(state, state.activeGroupIndex)


export const getCurrentPageInGroup = (state:State, groupIndex:number) =>
    state.groups[groupIndex].history.current

export const getActivePage = (state:InitializedState) : Page =>
    getCurrentPageInGroup(state, getActiveGroup(state).index)

export const findGroupWithCurrentUrl = (state:State, url:string) : Group =>
    _.find(state.groups, (g:Group) : boolean => g.history.current.url === url)

export const isZeroPage = (page:Page) : boolean => page.id === 0

export const isOnZeroPage = (state:InitializedState) : boolean =>
    isZeroPage(getActivePage(state))

export const filterZero = (pages:Page[]) => pages.filter(p => !!p.id)

export const toBrowserHistory = (history:History, zeroPage:string) : History => ({
  ...history,
  back: [{url: zeroPage, id: 0, params: {}, containerIndex: 0}, ...history.back]
})

export function assureType<T>(value:any, Type:Class<T>, errorMsg:string) : T {
  if (value instanceof Type) {
    return value
  }
  else {
    throw new Error(errorMsg)
  }
}

export const getShiftAmount = (s:InitializedState, pageEq:Function) : number =>
    historyUtil.getShiftAmount(getActiveGroup(s).history, pageEq)

export const getShiftAmountForId = (s:InitializedState, id:number) : number =>
    historyUtil.getShiftAmountForId(getActiveGroup(s).history, id)

export const getShiftAmountForUrl = (s:InitializedState, url:string) : number =>
    historyUtil.getShiftAmountForUrl(getActiveGroup(s).history, url)

export const createContainer = (state:?UninitializedState,
    {groupIndex, initialUrl, useDefault, keepHistory, urlPatterns} :
        {groupIndex:number} & {initialUrl:string} & {urlPatterns:string[]} &
        {useDefault:boolean} & {keepHistory:boolean}) : UninitializedState => {
  const id = (state ? state.lastPageId : 0) + 1
  const existingGroup:?Group = state ? state.groups[groupIndex] : null
  const containerIndex = existingGroup ? existingGroup.containers.length : 0
  const initialParams = parseParamsFromPatterns(urlPatterns, initialUrl)

  const history:History = {
    back: [],
    current: {url: initialUrl, params: initialParams, id, containerIndex},
    forward: []
  }

  const container:Container = {
    initialUrl,
    urlPatterns,
    keepHistory,
    history,
    groupIndex,
    index: containerIndex,
    isDefault: containerIndex === 0 && useDefault
  }

  const group = existingGroup ? {
        ...existingGroup,
        containers: [...existingGroup.containers, container]
      } : {
        index: groupIndex,
        history: history,
        containers: [container]
      }

  return new UninitializedState({
    ...(state ? state : {}),
    groups: state ? [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ] : [group],
    lastPageId: id
  })
}

export const getContainer = (state:State, groupIndex:number,
                             index:number) : Container =>
    state.groups[groupIndex].containers[index]

export function hasSameActiveContainer(oldState:?State,
                                       newState:InitializedState) : boolean {
  if (!oldState || !(oldState instanceof InitializedState)) return false
  const o:Container = getActiveContainer(oldState)
  const n:Container = getActiveContainer(newState)
  return o.groupIndex === n.groupIndex && o.index === n.index
}

export function isActiveContainer(state:InitializedState, groupIndex:number,
                                  containerIndex:number) {
  const c = getActiveContainer(state)
  return c.groupIndex === groupIndex && c.index === containerIndex
}

export const doesGroupUseDefault = (state:State, groupIndex:number) : boolean =>
    _.some(state.groups[groupIndex].containers, (c:Container) => c.isDefault)

export const resetState = (state:InitializedState) : UninitializedState => {
  const cs:Container[] = _.flatMap(state.groups, (g:Group) => g.containers)
  return cs.reduce((newState:?UninitializedState, container:Container) => {
    const useDefault:boolean = doesGroupUseDefault(state, container.groupIndex)
    return createContainer(newState, {...container, useDefault})
  }, null)
}