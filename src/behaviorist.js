// @flow
import * as _ from 'lodash'
import { patternsMatch , patternMatches} from "./util/url"
import { pushToStack } from './util/core'
import type { State, Page, Group, Container, History } from './types'

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

function push(state:State, container:Container, url:string) : Page {
  const id:number = state.lastPageId + 1
  const page:Page = {url, id, containerIndex: container.index}
  container.history = pushToStack(container.history, page)
  state.lastPageId = id
  return page
}

export function loadGroupFromUrl(oldState:State, url:string, groupIndex:number) : State {
  const state:State = _.cloneDeep(oldState)
  const group = state.groups[groupIndex]
  const containers:Container[] = group.containers
  const useDefault:boolean = _.some(containers, c => c.isDefault)
  const defaultContainer:?Container = useDefault ? _.find(containers, c => c.isDefault) : null
  const A = defaultContainer ? defaultContainer.history.current : null
  const initialContainer:Container = _.find(containers, c => patternMatches(c.initialUrl, url))
  const matchingContainer:Container = _.find(containers, c => patternsMatch(c.urlPatterns, url))
  if (useDefault) {
    if (initialContainer) {
      if (useDefault && initialContainer.isDefault) {
        group.history = fromArray(defaultBehavior.load_A([A], []))
      }
      else {
        const B = initialContainer.history.current
        group.history = fromArray(defaultBehavior.load_B([A], [B]))
      }
    }
    else if (matchingContainer) {
      const P:Page = push(state, matchingContainer, url)
      if (useDefault && matchingContainer.isDefault) {
        group.history = fromArray(defaultBehavior.load_A1([A, P], []))
      }
      else {
        const B = matchingContainer.history.back[0]
        group.history = fromArray(defaultBehavior.load_B1([A], [B, P]))
      }
    }
  }
  return state
}

export const loadFromUrl = (oldState:State, url:string) : State =>
    oldState.groups.reduce((newState:State, group:Group) =>
      loadGroupFromUrl(newState, url, group.index), oldState)