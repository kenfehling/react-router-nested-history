// @flow
declare var Promise:any
declare var CustomEvent:any

import { CREATE_CONTAINER, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes"
import * as actions from './actions/HistoryActions'
import * as browser from './browserFunctions'
import { listen, listenPromise } from './historyListener'
import * as util from './util/history'
import store from './store'
import * as _ from 'lodash'
import type { Step, State, Group, Container } from './types'
import {createLocation} from "history"

const needsPop = [browser.back, browser.forward, browser.go]
let unlisten

const getDerivedState = () : State => util.deriveState(store.getState())

const startListening = () => {
  unlisten = listen(location => {
    const state = location.state
    if (state) {
      store.dispatch(actions.popstate(location.state.id))
    }
  })
}

const unlistenPromise = () => new Promise(resolve => {
  unlisten()
  return resolve()
})

const startListeningPromise = () => new Promise(resolve => {
  startListening()
  return resolve()
})

startListening()

export const getNextGroupIndex = () => {
  const actions = store.getState()
  if (_.isEmpty(actions)) {
    return 0
  }
  else {
    const state = util.deriveState(actions)
    return state.groups.length
  }
}

const createContainer = (groupIndex:number, initialUrl:string, patterns:string[]) : Container => {
  store.dispatch(actions.createContainer(groupIndex, initialUrl, patterns))
  const state:State = getDerivedState()
  return _.last(state.groups[groupIndex].containers)
}

export const getOrCreateContainer = (groupIndex:number, initialUrl:string, patterns:string[]) : Container => {
  const create = () : Container => createContainer(groupIndex, initialUrl, patterns)
  const actions = store.getState()
  if (_.isEmpty(actions)) {
    return create()
  }
  const state:State = util.deriveState(actions)
  const group = state.groups[groupIndex]
  if (!group) {
    return create()
  }
  const existingContainer = _.find(group.containers, c => c.initialUrl === initialUrl)
  return existingContainer || create()
}

export const loadFromUrl = () => {
  const url:string = window.location.pathname
  store.dispatch(actions.loadFromUrl(url))
}

const addListener = (fn: Function, generateData: Function) => {
  const f = () => fn(generateData())
  f()
  return store.subscribe(f)
}

export const getGroupState = (groupIndex:number) => {
  const actions:Array<Object> = store.getState()
  const state:State = util.deriveState(actions)
  const group:Group = state.groups[groupIndex]
  const currentUrl:string = group.history.current.url
  const activeContainer:Container = group.containers[group.history.current.containerIndex]
  const activeGroup:Group = state.groups[state.activeGroupIndex]
  const stackOrder:Container[] = util.getContainerStackOrder(actions, groupIndex)
  const indexedStackOrder:number[] = util.getIndexedContainerStackOrder(actions, groupIndex)
  return {activeContainer, activeGroup, currentUrl, stackOrder, indexedStackOrder}
}

export const addChangeListener = (fn:Function) => addListener(fn, getDerivedState)

export const addGroupChangeListener = (groupIndex:number, fn:Function) =>
    addListener(fn, () => getGroupState(groupIndex))

export const getIndexedContainerStackOrder = (groupIndex:number) =>
    util.getIndexedContainerStackOrder(store.getState(), groupIndex)

function isActiveContainer(groupIndex:number, containerIndex:number) {
  const state = getDerivedState()
  const activeGroup = util.getActiveGroup(state)
  const activeContainer = util.getActiveContainer(activeGroup)
  return activeGroup.index === groupIndex && activeContainer.index === containerIndex
}

export const switchToContainer = (groupIndex:number, containerIndex:number) => {
  if (!isActiveContainer(groupIndex, containerIndex)) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
  }
}

export const push = (groupIndex:number, containerIndex:number, url:string) => {
  if (!isActiveContainer(groupIndex, containerIndex)) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
  }
  store.dispatch(actions.push(url))
}

export const go = (n:number=1) => store.dispatch(actions.go(n))
export const back = (n:number=1) => store.dispatch(actions.back(n))
export const forward = (n:number=1) => store.dispatch(actions.forward(n))

export const getCurrentPage = (groupIndex:number) =>
    util.getCurrentPage(getDerivedState(), groupIndex)

function runSteps(steps:Step[]) {
  if (steps.length === 1) {
    steps[0].fn(...steps[0].args)
  }
  else if (steps.length > 1) {
    const promisedSteps = steps.map(s => () => {
      s.fn(...s.args)
      return _.includes(needsPop, s.fn) ? listenPromise() : Promise.resolve()
    });
    [unlistenPromise, ...promisedSteps, startListeningPromise].reduce(
        (p, step) => p.then(step),
        Promise.resolve()
    )
  }
}

store.subscribe(() => {
  const actions = store.getState()
  const state = util.deriveState(actions)
  const group = util.getActiveGroup(state)
  const current = group.history.current
  const steps = util.createSteps(actions)
  if (!_.isEmpty(steps)) {
    window.dispatchEvent(new CustomEvent('locationChange', {
      detail: {location: createLocation(current.url, {id: current.id})}
    }))
    runSteps(steps)
  }
})