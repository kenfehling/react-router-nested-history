// @flow
declare var Promise:any
declare var CustomEvent:any
import * as actions from './actions/HistoryActions'
import * as browser from './browserFunctions'
import { listen, listenPromise } from './browserFunctions'
import * as util from './util/history'
import { getCurrentPageInGroup, getActiveGroup } from './util/core'
import store, { persist } from './store'
import * as _ from 'lodash'
import type { Step, Group, Container, Page, Action } from './types'
import { State, InitializedState } from './types'
import { createLocation } from "history"
import Queue from 'promise-queue'
import { canUseWindowLocation } from './util/location'

const maxConcurrent = 1
const maxQueue = Infinity
const queue = new Queue(maxConcurrent, maxQueue)
const needsPopListener = canUseWindowLocation ? [browser.back, browser.forward, browser.go] : []
let unlisten, lastUpdate = new Date()

const getActions = () : Action[] => store.getState().actions
const getDerivedState = () : State => util.deriveState(getActions(), getZeroPage())
const getInitializedDerivedState = () : InitializedState =>
    util.deriveInitializedState(getActions(), getZeroPage())
const getZeroPage = () : string => store.getState().zeroPage

const startListening = () => {
  unlisten = listen(location => {
    const state:Object = location.state
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
  const actions:Action[] = getActions()
  if (_.isEmpty(actions)) {
    return 0
  }
  else {
    const state = util.deriveState(actions, getZeroPage())
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
  const actions:Action[] = getActions()
  if (_.isEmpty(actions)) {
    return create()
  }
  const state:State = util.deriveState(actions, getZeroPage())
  const group = state.groups[groupIndex]
  if (!group) {
    return create()
  }
  const existingContainer = _.find(group.containers, c => c.initialUrl === initialUrl)
  return existingContainer || create()
}

export const loadFromUrl = (url:string) => persist(store, {}, () =>
    store.dispatch(actions.loadFromUrl(url, browser.wasLoadedFromRefresh())))

export const addChangeListener = (fn:Function) =>
    store.subscribe(() => fn(getDerivedState()))

export const getGroupState = (groupIndex:number) : Object =>
    util.getGroupState(getActions(), groupIndex, getZeroPage())

export const switchToContainer = (groupIndex:number, containerIndex:number) => {
  if (!util.isActiveContainer(getInitializedDerivedState(), groupIndex, containerIndex)) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
  }
}

export const push = (groupIndex:number, containerIndex:number, url:string) => {
  if (!util.isActiveContainer(getInitializedDerivedState(), groupIndex, containerIndex)) {
    store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
  }
  store.dispatch(actions.push(url))
}

export const go = (n:number=1) => store.dispatch(actions.go(n))
export const back = (n:number=1) => store.dispatch(actions.back(n))
export const forward = (n:number=1) => store.dispatch(actions.forward(n))

export const getCurrentPageInGrouo = (groupIndex:number) =>
    getCurrentPageInGroup(getDerivedState(), groupIndex)

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

export function listenToStore() {
  store.subscribe(() => {
    const actions:Action[] = getActions()
    const zeroPage:string = getZeroPage()
    const state:State = util.deriveState(actions, zeroPage)
    if (state instanceof InitializedState) {
      const group:Group = getActiveGroup(state)
      const current:Page = group.history.current
      const steps:Step[] =util.createStepsSinceLastUpdate(actions, zeroPage, lastUpdate)
      lastUpdate = new Date()
      window.dispatchEvent(new CustomEvent('locationChange', {
        detail: {location: createLocation(current.url, {id: current.id})}
      }))
      runSteps(steps)
    }
  })
}

export const setZeroPage = (zeroPage:string) =>
    store.dispatch(actions.setZeroPage(zeroPage))