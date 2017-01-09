// @flow
import * as _ from 'lodash'
import { patternsMatch , patternMatches, parseParamsFromPatterns } from "./util/url"
import { findGroupWithCurrentUrl, toBrowserHistory, resetState } from './util/core'
import * as historyUtil from './util/history'
import type { Page, Group, Container, History } from './types'
import { State, UninitializedState, InitializedState } from './types'

// TODO: Pass this in dynamically
import * as defaultBehavior from './behaviors/defaultBehavior'
import * as nonDefaultBehavior from './behaviors/nonDefaultBehavior'
import {KEEP_HISTORY_ON_FUTURE_VISIT} from "./constants/Settings"

const toArray = (h:History) : Array<any> => [h.back, h.current, h.forward]
const fromArray = ([back, current, forward]) : History => ({back, current, forward})

export function switchContainer(from:Container, to:Container,defaulT:?Container) : History {
  const fromHistory = toArray(from.history)
  const toHistory = toArray(to.history)
  if (defaulT) {
    const defaultHistory = toArray(defaulT.history)
    if (from.isDefault) {
      return fromArray(defaultBehavior.A_to_B(fromHistory, toHistory, []))
    }
    else {
      if (to.isDefault) {
        return fromArray(defaultBehavior.B_to_A(toHistory, fromHistory, []))
      }
      else {
        return fromArray(defaultBehavior.B_to_C(defaultHistory, fromHistory, toHistory))
      }
    }
  }
  else {
    return fromArray(nonDefaultBehavior.B_to_C([], fromHistory, toHistory))
  }
}

function push(state:UninitializedState, container:Container, url:string) : Page {
  const id:number = state.lastPageId + 1
  const params:Object = parseParamsFromPatterns(container.urlPatterns, url)
  const page:Page = {url, params, id, containerIndex: container.index}
  container.history = historyUtil.push(container.history, page)
  state.lastPageId = id
  return page
}

function loadGroupFromUrl(oldState:State, url:string,
                          groupIndex:number) : State {
  const state:UninitializedState = _.cloneDeep(oldState)
  const group:Group = state.groups[groupIndex]
  const containers:Container[] = group.containers
  const useDefault:boolean = _.some(containers, c => c.isDefault)
  const defaultContainer:?Container =
      useDefault ? _.find(containers, c => c.isDefault) : null
  const A:?Page = defaultContainer ? defaultContainer.history.current : null
  const containerWithInitial:Container =
      _.find(containers, c => patternMatches(c.initialUrl, url))
  const containerWithMatch:Container =
      _.find(containers, c => patternsMatch(c.urlPatterns, url))

  if (containerWithInitial) {
    if (useDefault) {
      if (containerWithInitial.isDefault) {
        group.history = fromArray(defaultBehavior.load_A([A], []))
      }
      else {
        const B:Page = containerWithInitial.history.current
        group.history = fromArray(defaultBehavior.load_B([A], [B]))
      }
    }
    else {
      const B:Page = containerWithInitial.history.current
      group.history = fromArray(nonDefaultBehavior.load_B([A], [B]))
    }
  }
  else if (containerWithMatch) {
    const P:Page = push(state, containerWithMatch, url)
    if (useDefault) {
      if (containerWithMatch.isDefault) {
        group.history = fromArray(defaultBehavior.load_A1([A, P], []))
      }
      else {
        const B:Page = containerWithMatch.history.back[0]
        group.history = fromArray(defaultBehavior.load_B1([A], [B, P]))
      }
    }
    else {
      const B:Page = containerWithMatch.history.back[0]
      group.history = fromArray(nonDefaultBehavior.load_B1([A], [B, P]))
    }
  }
  return state
}

export const loadFromUrl = (oldState:State, url:string,
                            zeroPage:string) : InitializedState => {
  const newState:State = oldState.groups.reduce((state:State, group:Group) : State =>
        loadGroupFromUrl(state, url, group.index), oldState)
  const activeGroup:Group = findGroupWithCurrentUrl(newState, url)
  const browserHistory:History = toBrowserHistory(activeGroup.history, zeroPage)
  return new InitializedState({
    groups: newState.groups,
    lastPageId: newState.lastPageId,
    browserHistory,
    activeGroupIndex: activeGroup.index,
    lastUpdate: new Date(0)
  })
  // TODO: Remove lastUpdate field and make a new more specific State type?
}

export const reloadFromUrl = (oldState:InitializedState, url:string,
                              zeroPage:string) : InitializedState => {
  if (KEEP_HISTORY_ON_FUTURE_VISIT) {
    return loadFromUrl(resetState(oldState), url, zeroPage)
  }
  else {
    return loadFromUrl(oldState, url, zeroPage)
  }
}