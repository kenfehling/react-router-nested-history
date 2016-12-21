// @flow
declare var Promise:any
declare var CustomEvent:any

import { CREATE_CONTAINER, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "./constants/ActionTypes"
import * as actions from './actions/HistoryActions'
import * as browser from './browserFunctions'
import { listen, listenPromise } from './browserFunctions'
import * as util from './util/history'
import store, { persist } from './store'
import * as _ from 'lodash'
import type { Step, State, Group, Container } from './types'
import { createLocation } from "history"
import Queue from 'promise-queue'
import { canUseWindowLocation } from './util/location'

const maxConcurrent = 1
const maxQueue = Infinity
const queue = new Queue(maxConcurrent, maxQueue)
const needsPopListener = canUseWindowLocation ? [browser.back, browser.forward, browser.go] : []
let unlisten

const getActions = () : Object[] => store.getState().actions
const getDerivedState = () : State => util.deriveState(getActions())


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
  const actions = getActions()
  if (_.isEmpty(actions)) {
    return 0
  }
  else {
    const state = util.deriveState(actions)
    return state.groups.length
  }
}

const createContainer = (groupIndex:number, initialUrl:string, patterns:string[], useDefault:boolean) : Container => {
  store.dispatch(actions.createContainer(groupIndex, initialUrl, patterns, useDefault))
  const state:State = getDerivedState()
  return _.last(state.groups[groupIndex].containers)
}

export const getOrCreateContainer = (groupIndex:number, initialUrl:string, patterns:string[], useDefault:boolean) : Container => {
  const create = () : Container => createContainer(groupIndex, initialUrl, patterns, useDefault)
  const actions = getActions()
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

export const loadFromUrl = (url:string) =>
    persist(store, {}, () => store.dispatch(actions.loadFromUrl(url)))

export const addChangeListener = (fn:Function) => store.subscribe(() => fn(getDerivedState()))

export const getGroupState = (groupIndex:number) : Object =>
    util.getGroupState(getActions(), groupIndex)

export const switchToContainer = (groupIndex:number, containerIndex:number) => {
  if (!util.isActiveContainer(getDerivedState(), groupIndex, containerIndex)) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
  }
}

export const push = (groupIndex:number, containerIndex:number, url:string) => {
  if (!util.isActiveContainer(getDerivedState(), groupIndex, containerIndex)) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
  }
  store.dispatch(actions.push(url))
}

export const go = (n:number=1) => store.dispatch(actions.go(n))
export const back = (n:number=1) => store.dispatch(actions.back(n))
export const forward = (n:number=1) => store.dispatch(actions.forward(n))

export const getCurrentPageInGrouo = (groupIndex:number) =>
  util.getCurrentPageInGroup(getDerivedState(), groupIndex)

export const getCurrentPage = () => {
  const state = getDerivedState()
  return util.getCurrentPageInGroup(state, state.activeGroupIndex)
}

function runStep(step:Step) {
  const stepPromise = () => {
    step.fn(...step.args)
    return _.includes(needsPopListener, step.fn) ? listenPromise() : Promise.resolve()
  }
  const ps = () => [unlistenPromise, stepPromise, startListeningPromise].reduce(
      (p, s) => p.then(s), Promise.resolve())
  return queue.add(ps)
}

export function runSteps(steps:Step[]) {
  return steps.reduce((p, step) => p.then(() => runStep(step)), Promise.resolve())
}

store.subscribe(() => {
  const actions = getActions()
  const state = util.deriveState(actions)
  const group = util.getActiveGroup(state)
  const current = group.history.current
  const steps = util.createSteps(actions)
  if (state.lastAction.type !== CREATE_CONTAINER) {
    window.dispatchEvent(new CustomEvent('locationChange', {
      detail: {location: createLocation(current.url, {id: current.id})}
    }))
    runSteps(steps)
  }
})