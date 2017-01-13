// @flow
declare var Promise:any
declare var CustomEvent:any
import * as actions from './actions/HistoryActions'
import * as browser from './browserFunctions'
import { listen, listenPromise } from './browserFunctions'
import * as actionsUtil from './util/actions'
import * as core from './util/core'
import store, { persist } from './store'
import * as _ from 'lodash'
import type { Step, Group, Container, Page, Action } from './types'
import { State, InitializedState } from './types'
import { createLocation } from "history"
import Queue from 'promise-queue'
import { canUseWindowLocation } from './util/location'
import { parseParamsFromPatterns } from "./util/url";

const maxConcurrent = 1
const maxQueue = Infinity
const queue = new Queue(maxConcurrent, maxQueue)
const needsPopListener = canUseWindowLocation ?
    [browser.back, browser.forward, browser.go] : []
let unlisten

export const getActions = () : Action[] => store.getState().actions
export const getLastUpdate = () : Date => store.getState().lastUpdate
export const getDerivedState = () : State =>
    actionsUtil.deriveState(getActions(), getZeroPage())
export const getInitializedState = () : InitializedState =>
    actionsUtil.deriveInitializedState(getActions(), getZeroPage())

export const getZeroPage = () : string => {
  const all = store.getState()
  if (all.zeroPage) {
    return all.zeroPage
  }
  else {
    const state = actionsUtil.deriveState(all.actions, 'whatever')
    return state.groups[0].containers[0].initialUrl
  }
}

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
    const state = actionsUtil.deriveState(actions, getZeroPage())
    return state.groups.length
  }
}

const createContainer = (groupIndex:number, initialUrl:string,
                         patterns:string[], useDefault:boolean,
                         keepHistory:boolean) : Container => {
  store.dispatch(actions.createContainer(
      groupIndex, initialUrl, patterns, useDefault, keepHistory))
  const state:State = getDerivedState()
  return _.last(state.groups[groupIndex].containers)
}

export const getOrCreateContainer = (groupIndex:number, initialUrl:string,
                                     patterns:string[], useDefault:boolean,
                                     keepHistory:boolean) : Container => {
  const create = () : Container =>
      createContainer(groupIndex, initialUrl, patterns, useDefault, keepHistory)
  const actions:Action[] = getActions()
  if (_.isEmpty(actions)) {
    return create()
  }
  const state:State = actionsUtil.deriveState(actions, getZeroPage())
  const group = state.groups[groupIndex]
  if (!group) {
    return create()
  }
  const existingContainer =
      _.find(group.containers, c => c.initialUrl === initialUrl)
  return existingContainer || create()
}

export const loadFromUrl = (url:string) =>
    persist(store, {whitelist: ['actions']}, () =>
        store.dispatch(actions.loadFromUrl(url, browser.loadedFromRefresh)))

export const addChangeListener = (fn:Function) => {
  return store.subscribe(() => {
    const state: State = getDerivedState()
    if (state instanceof InitializedState) {
      fn(state)
    }
  })
}

export const getLastAction = () : Action => _.last(getActions())

export const getGroupState = (groupIndex:number) : Object =>
    actionsUtil.getGroupState(getActions(), groupIndex, getZeroPage())

export const switchToContainer = (groupIndex:number,
                                  containerIndex:number) : Promise => {
  const state:InitializedState = getInitializedState()
  const from:Container = core.getActiveContainerInGroup(state, groupIndex)
  const switchFn:Function = () => {
    if (!core.isActiveContainer(state, groupIndex, containerIndex)) {
      store.dispatch(actions.switchToContainer(groupIndex, containerIndex))
    }
  }
  const topFn:Function = () : Promise => new Promise((resolve) => {
    store.dispatch(actions.top(groupIndex, from.index))
    return resolve()
  })
  if (from.keepHistory) {
    switchFn()
    return Promise.resolve()
  }
  else {
    return topFn().then(switchFn)
  }
}

export const push = (groupIndex:number, containerIndex:number, url:string,
                     patterns:string[]) => {
  const params:Object = parseParamsFromPatterns(patterns, url)
  store.dispatch(actions.push(url, params, groupIndex, containerIndex))
}

export const top = (groupIndex:number, containerIndex:number) =>
  store.dispatch(actions.top(groupIndex, containerIndex))

export const go = (n:number=1) => store.dispatch(actions.go(n))
export const back = (n:number=1) => store.dispatch(actions.back(n))
export const forward = (n:number=1) => store.dispatch(actions.forward(n))

export const getBackPage = () : ?Page => {
  const state:State = getDerivedState()
  if (state instanceof InitializedState) {
    return core.getBackPage(state)
  }
  else {
    return null
  }
}

export const getActivePageInGroup = (groupIndex:number) : Page =>
    core.getActivePageInGroup(getDerivedState(), groupIndex)

export const getActivePageInContainer = (groupIndex:number,
                                         containerIndex:number) : Page =>
  core.getActivePageInContainer(getDerivedState(), groupIndex, containerIndex)

function runStep(step:Step) {
  const stepPromise = () => {
    step.fn(...step.args)
    return _.includes(needsPopListener, step.fn) ?
        listenPromise() : Promise.resolve()
  }
  const ps = () => [unlistenPromise, stepPromise, startListeningPromise].reduce(
      (p, s) => p.then(s), Promise.resolve())
  return queue.add(ps)
}

export function runSteps(steps:Step[]) {
  return steps.reduce((p, step) => p.then(() => runStep(step)), Promise.resolve())
}

export const listenToStore = () => store.subscribe(() => {
  const actions:Action[] = getActions()
  const zeroPage:string = getZeroPage()
  const lastUpdate = getLastUpdate()
  const state:State = actionsUtil.deriveState(actions, zeroPage)
  if (state instanceof InitializedState) {
    const group:Group = core.getActiveGroup(state)
    const current:Page = group.history.current
    const steps:Step[] =
        actionsUtil.createStepsSinceUpdate(actions, zeroPage, lastUpdate)
    window.dispatchEvent(new CustomEvent('locationChange', {
      detail: {location: createLocation(current.url, {id: current.id})}
    }))
    runSteps(steps)
  }
})

export const setZeroPage = (zeroPage:string) =>
    store.dispatch(actions.setZeroPage(zeroPage))