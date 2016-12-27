// @flow
import * as _ from 'lodash'
import { patternsMatch , patternMatches} from "./util/url"
import { pushToStack, findGroupWithCurrentUrl, toBrowserHistory} from './util/core'
import type { Page, Group, Container, History } from './types'
import { State, UninitialzedState, InitializedState } from './types'

// TODO: Pass this in dynamically
import * as defaultBehavior from './behaviors/defaultBehavior'
import * as nonDefaultBehavior from './behaviors/nonDefaultBehavior'

const toArray = (h:History) : Array<any> => [h.back, h.current, h.forward]
const fromArray = ([back, current, forward]) : History => ({back, current, forward})

export function switchContainer(from:Container, to:Container, defaulT:?Container) : History {
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

function push(state:UninitialzedState, container:Container, url:string) : Page {
  const id:number = state.lastPageId + 1
  const page:Page = {url, id, containerIndex: container.index}
  container.history = pushToStack(container.history, page)
  state.lastPageId = id
  return page
}

function loadGroupFromUrl(oldState:UninitialzedState, url:string, groupIndex:number) : UninitialzedState {
  const state:UninitialzedState = _.cloneDeep(oldState)
  const group:Group = state.groups[groupIndex]
  const containers:Container[] = group.containers
  const useDefault:boolean = _.some(containers, c => c.isDefault)
  const defaultContainer:?Container = useDefault ? _.find(containers, c => c.isDefault) : null
  const A:?Page = defaultContainer ? defaultContainer.history.current : null
  const initialContainer:Container = _.find(containers, c => patternMatches(c.initialUrl, url))
  const matchingContainer:Container = _.find(containers, c => patternsMatch(c.urlPatterns, url))
  if (useDefault) {
    if (initialContainer) {
      if (useDefault && initialContainer.isDefault) {
        group.history = fromArray(defaultBehavior.load_A([A], []))
      }
      else {
        const B:Page = initialContainer.history.current
        group.history = fromArray(defaultBehavior.load_B([A], [B]))
      }
    }
    else if (matchingContainer) {
      const P:Page = push(state, matchingContainer, url)
      if (useDefault && matchingContainer.isDefault) {
        group.history = fromArray(defaultBehavior.load_A1([A, P], []))
      }
      else {
        const B:Page = matchingContainer.history.back[0]
        group.history = fromArray(defaultBehavior.load_B1([A], [B, P]))
      }
    }
  }
  return state
}

export const loadFromUrl = (oldState:UninitialzedState, url:string, zeroPage:string) : InitializedState => {
  const newState:UninitialzedState =
      oldState.groups.reduce((state:UninitialzedState, group:Group) : UninitialzedState =>
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