// @flow
import * as _ from 'lodash'
import type { History, Page, Container, Group } from '../types'
import { State, InitializedState, UninitialzedState } from '../types'

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

export function go(oldState:InitializedState, n:number, zeroPage:string) : InitializedState {
  if (n === 0) {
    return oldState
  }
  const state:InitializedState = _.cloneDeep(oldState)
  const group = state.groups[state.activeGroupIndex]
  const container = group.containers[group.history.current.containerIndex]
  const f = n < 0 ? back : forward
  const getStack = (h:History) : Page[] => n < 0 ? h.back : h.forward
  const nextN = n < 0 ? n + 1 : n - 1
  if (getStack(group.history).length > 0) {
    group.history = f(group.history)
    if (getStack(container.history).length > 0) {
      container.history = f(container.history)
    }
    state.browserHistory = toBrowserHistory(group.history, zeroPage)
  }
  return go(state, nextN, zeroPage)
}

export const pushPage = (oldState:InitializedState, page:Page) : State => {
  const state:InitializedState = _.cloneDeep(oldState)
  const group:Group = getActiveGroup(state)
  const container:Container = group.containers[page.containerIndex]
  container.history = pushToStack(container.history, page)
  group.history = pushToStack(group.history, page)
  state.browserHistory = pushToStack(state.browserHistory, page)
  state.lastPageId = Math.max(state.lastPageId, page.id)
  return state
}

export const replacePage = (oldState:InitializedState, page:Page) : State => {
  const state:InitializedState = _.cloneDeep(oldState)
  const group:Group = state.groups[state.activeGroupIndex]
  const container:Container = group.containers[page.containerIndex]
  container.history = replaceCurrent(container.history, page)
  group.history = replaceCurrent(group.history, page)
  state.browserHistory = replaceCurrent(state.browserHistory, page)
  state.lastPageId = Math.max(state.lastPageId, page.id)
  return state
}

export const _Url = (state:InitializedState, url:string,
                     containerIndex:?number,
                     fn:Function) : InitializedState => {
  const id:number = state.lastPageId + 1
  return fn(state, {
    url,
    id,
    containerIndex: containerIndex || getActiveContainer(state).index
  })
}

export const pushUrl = (state:InitializedState, url:string,
                        containerIndex:?number) : InitializedState =>
    _Url(state, url, containerIndex, pushPage)

export const replaceUrl = (state:InitializedState, url:string,
                           containerIndex:?number) : InitializedState =>
    _Url(state, url, containerIndex, replacePage)

export function getActiveGroup(state:InitializedState):Group {
  return state.groups[state.activeGroupIndex]
}

export function getActiveContainer(state:InitializedState):Container {
  const group = getActiveGroup(state)
  return group.containers[group.history.current.containerIndex]
}

export function getCurrentPageInGroup(state:State, groupIndex:number) {
  return state.groups[groupIndex].history.current
}

export function getActivePage(state:InitializedState) {
  return getCurrentPageInGroup(state, getActiveGroup(state).index)
}

export const findGroupWithCurrentUrl = (state:State, url:string) : Group =>
    _.find(state.groups, (g:Group) : boolean => g.history.current.url === url)

export const isZeroPage = (page:Page) : boolean => page.id === 0

export const isOnZeroPage = (state:InitializedState) : boolean =>
    isZeroPage(getActivePage(state))

export const filterZero = (pages:Page[]) => pages.filter(p => !!p.id)

export const toBrowserHistory = (history:History, zeroPage:string) : History => ({
  ...history,
  back: [{url: zeroPage, id: 0, containerIndex: 0}, ...history.back]
})

export function assureType<T>(value:any, Type:Class<T>, errorMsg:string) : T {
  if (value instanceof Type) {
    return value
  }
  else {
    throw new Error(errorMsg)
  }
}

export const getHistoryShiftAmount = (oldState:InitializedState, pageEquals:Function) : number => {
  const group:Group = oldState.groups[oldState.activeGroupIndex]
  const oldHistory = group.history
  if (!_.isEmpty(oldHistory.back)) {
    const i = _.findIndex(oldHistory.back, pageEquals)
    if (i !== -1) {
      return 0 - (_.size(oldHistory.back) - i)
    }
  }
  if (!_.isEmpty(oldHistory.forward)) {
    const i = _.findIndex(oldHistory.forward, pageEquals)
    if (i !== -1) {
      return i + 1
    }
  }
  return 0
}

export const getHistoryShiftAmountForId = (oldState:InitializedState, id:number) : number =>
    getHistoryShiftAmount(oldState, (p:Page) => p.id === id)

export const getHistoryShiftAmountForUrl = (oldState:InitializedState, url:string) : number =>
    getHistoryShiftAmount(oldState, (p:Page) => p.url === url)

export const createContainer  = (state:?UninitialzedState,
    {groupIndex, initialUrl, useDefault, urlPatterns} :
        {groupIndex:number} & {initialUrl:string} &
            {urlPatterns:string[]} & {useDefault:boolean}) : UninitialzedState => {
  const id = (state ? state.lastPageId : 0) + 1
  const existingGroup:?Group = state ? state.groups[groupIndex] : null
  const containerIndex = existingGroup ? existingGroup.containers.length : 0

  const history:History = {
    back: [],
    current: {url: initialUrl, id, containerIndex},
    forward: []
  }

  const container:Container = {
    initialUrl,
    urlPatterns,
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

  return new UninitialzedState({
    ...(state ? state : {}),
    groups: state ? [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ] : [group],
    lastPageId: id
  })
}

export const doesGroupUseDefault = (state:State, groupIndex:number) : boolean =>
    _.some(state.groups[groupIndex].containers, (c:Container) => c.isDefault)

export const resetState = (state:InitializedState) : UninitialzedState => {
  const containers:Container[] = _.flatMap(state.groups, (g:Group) => g.containers)
  return containers.reduce((newState:?UninitialzedState, container:Container) => {
    const useDefault:boolean = doesGroupUseDefault(state, container.groupIndex)
    return createContainer(newState, {...container, useDefault})
  }, null)
}