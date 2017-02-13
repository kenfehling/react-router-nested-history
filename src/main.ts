import {createStepsSince} from './util/actions'
declare const window
declare const CustomEvent
import * as browser from './browserFunctions'
import { Location } from 'history'
import store from './store'
import { createLocation } from 'history'
import * as Queue from 'promise-queue'
import { canUseWindowLocation } from './util/location'
import { parseParamsFromPatterns } from './util/url'
import * as R from 'ramda'
import State from './model/State'
import Group from './model/Group'
import Page from './model/Page'
import Step from './model/interfaces/Step'
import Action from './model/Action'
import UpdateBrowser from './model/actions/UpdateBrowser'
import LoadFromUrl from './model/actions/LoadFromUrl'
import IContainer from './model/interfaces/IContainer'
import GroupNotFound from './model/errors/GroupNotFound'
import ContainerNotFound from './model/errors/ContainerNotFound'
import {catchTypes, catchType} from './util/misc'
import CreateGroup from './model/actions/CreateGroup'
import Go from './model/actions/Go'
import Back from './model/actions/Back'
import Forward from './model/actions/Forward'
import Top from './model/actions/Top'
import SetZeroPage from './model/actions/SetZeroPage'
import Push from './model/actions/Push'
import SwitchToContainer from './model/actions/SwitchToContainer'
import PopState from './model/actions/PopState'
import CreateContainer from './model/actions/CreateContainer'
import SwitchToGroup from './model/actions/SwitchToGroup'
import Startup from './model/actions/Startup'

const queue = new Queue(1, Infinity)  // maxConcurrent = 1, maxQueue = Infinity
let unlisten
const stepListeners:({before:(currentUrl:string) => void,
                      after:(currentUrl:string) => void})[] = []
export const addStepListener = listener => stepListeners.push(listener)

const startListeningForPopState = () => {
  unlisten = browser.listen((location:Location) => {
    const state:Page = location.state
    if (state) {
      store.dispatch(new PopState({page: new Page(state)}))
    }
  })
}

const unlistenPromise = () => new Promise(resolve => {
  unlisten()
  return resolve()
})

const startListeningPromise = () => new Promise(resolve => {
  startListeningForPopState()
  return resolve()
})

export const addChangeListener = (callback:(state:State)=>void) => {
  const fn:Function = () => {
    const state:State = store.getState()
    if (state.isInitialized) {
      callback(state)
    }
  }
  fn()  // If state is already initialized (from persist) call right away
  return store.subscribe(fn)
}

const listenToLocation = fn => event => fn(event.detail.location)

export const addLocationChangeListener = (fn:(location:Location)=>void) => {
  window.addEventListener('locationChange', listenToLocation(fn))
}

export const removeLocationChangeListener = (fn:(location:Location)=>void) => {
  window.removeEventListener('locationChange', listenToLocation(fn))
}

const getGroupByName = (name:string):Group => {
  return store.getState().getGroupByName(name)
}

const createGroup = (action:CreateGroup):Promise<Group> => {
  return store.dispatch(action).then(
    (state:State) => Promise.resolve(state.getGroupByName(action.name)))
}

export const getOrCreateGroup = (action:CreateGroup):Promise<Group> => {
  try {
    const group:Group = getGroupByName(action.name)
    return Promise.resolve(group)
  }
  catch(e) {
    return catchType(e, GroupNotFound, () => createGroup(action))
  }
}

const createContainer = (action:CreateContainer):Promise<IContainer> => {
  return store.dispatch(action).then((state:State) =>
         state.getGroupByName(action.groupName).getContainerByName(action.name))
}

export const getOrCreateContainer = (action:CreateContainer):Promise<IContainer> => {
  const state:State = store.getState()
  const group:Group = state.getGroupByName(action.groupName)
  try {
    const container = group.getContainerByName(action.name)
    return Promise.resolve(container)
  }
  catch (e) {
    return catchType(e, ContainerNotFound, () => createContainer(action))
  }
}

export const switchToGroup = (groupName:string):Promise<State> =>
    store.dispatch(new SwitchToGroup({groupName}))

export const switchToContainerName = (act:SwitchToContainer):Promise<State> => {
  return store.dispatch(act)
}

export const switchToContainerIndex = (groupName:string,
                                       index:number):Promise<State> => {
  const group:Group = getGroupByName(groupName)
  const container:IContainer = group.containers[index]
  if (container) {
    const a = new SwitchToContainer({groupName, containerName: container.name})
    return switchToContainerName(a)
  }
  else {
    throw new Error(`No container found at index ${index} in '${groupName}' ` +
                    `(size: ${group.containers.length})`)
  }
}

export const push = (groupName:string, containerName:string, url:string,
                     patterns:string[]):Promise<State> => {
  const params:Object = parseParamsFromPatterns(patterns, url)
  const page:Page = new Page({
    url,
    params,
    groupName,
    containerName,
    lastVisited: new Date().getTime()
  })
  return store.dispatch(new Push({page}))
}

export const startup = ():Promise<State> =>
    store.persist({whitelist: ['actions']}).then(() =>
    store.dispatch(new Startup({fromRefresh: browser.wasLoadedFromRefresh})))

export const loadFromUrl = (url:string):Promise<State> =>
    store.dispatch(new LoadFromUrl({
      url,
      fromRefresh: browser.wasLoadedFromRefresh
    }))

export const setZeroPage = (url:string|null):Promise<State> =>
    store.dispatch(new SetZeroPage({url}))

export const top = (action:Top):Promise<State> => store.dispatch(action)

export const go = (n:number=1):Promise<State> => store.dispatch(new Go({n}))

export const back = (n:number=1):Promise<State> => store.dispatch(new Back({n}))

export const forward = (n:number=1):Promise<State> =>
    store.dispatch(new Forward({n}))

export const getBackPage = ():Page => store.getState().backPage

export const getActivePageInGroup = (groupName:string):Page|null =>
    store.getState().getActivePageInGroup(groupName)

export const getActiveUrlInGroup = (groupName:string):string|null => {
  const page:Page|null = getActivePageInGroup(groupName)
  return page ? page.url : null
}

export const urlMatchesGroup = (url:string, groupName:string):boolean => {
  return getGroupByName(groupName).patternsMatch(url)
}

export const getActivePageInContainer = (groupName:string,
                                         containerName:string):Page =>
    store.getState().getActivePageInContainer(groupName, containerName)

export const getActiveUrlInContainer = (groupName:string,
                                        containerName:string):string|null => {
  try {
    const page:Page|null = getActivePageInContainer(groupName, containerName)
    return page ? page.url : null
  }
  catch(e) {
    return catchTypes(e, [GroupNotFound, ContainerNotFound], null)
  }
}

export const getContainerLinkUrl = (groupName:string,
                                    containerName:string):string => {
  try {
    return store.getState().getContainerLinkUrl(groupName, containerName)
  }
  catch(e) {
    return catchTypes(e, [GroupNotFound, ContainerNotFound], '')
  }
}

export const isContainerActive = (groupName:string,
                               containerName:string):boolean => {
  try {
    return store.getState().isContainerActive(groupName, containerName)
  }
  catch(e) {
    return catchType(e, GroupNotFound, false)
  }
}

export const getIndexedContainerStackOrder = (groupName:string) : number[] =>
    store.getState().getIndexedContainerStackOrderForGroup(groupName)

export const getActiveContainerIndexInGroup = (groupName:string): number =>
    store.getState().getActiveContainerIndexInGroup(groupName)

export const getActiveGroup = (): Group => store.getState().activeGroup
export const getActiveGroupName = (): string => store.getState().activeGroupName
export const isInitialized = (): boolean => store.getState().isInitialized

export const hasLoadedFromUrl = (): boolean =>
    R.any(a => a instanceof LoadFromUrl, store.getActions())

function runStep(step:Step) {
  const stepPromise = ():Promise<any> => {
    const currentUrl = browser.getLocation().pathname
    stepListeners.forEach(listener => listener.before(currentUrl))
    step.run()
    const p:Promise<any> = canUseWindowLocation && step.needsPopListener ?
      browser.listenPromise() : Promise.resolve()
    return p.then(() => {
      const currentUrl = browser.getLocation().pathname
      stepListeners.forEach(listener => listener.after(currentUrl))
    })
  }
  const ps = () => [unlistenPromise, stepPromise, startListeningPromise].reduce(
      (p:Promise<any>, s) => p.then(s), Promise.resolve())
  return queue.add(ps)
}

export function runSteps(steps:Step[]):Promise<void> {
  return steps.reduce((p, step) => p.then(() => runStep(step)), Promise.resolve())
}

export const listenToStore = () : () => void => store.subscribe(() => {
  if (isInitialized() && hasLoadedFromUrl()) {
    const actions:Action[] = store.getActions()
    const state:State = store.deriveState(actions)
    const lastUpdate: number = state.lastUpdate
    const current = state.activePage
    const steps: Step[] = createStepsSince(actions, lastUpdate)
    const updateLocation:() => Promise<void> = () => {
      window.dispatchEvent(new CustomEvent('locationChange', {
        detail: {location: createLocation(current.url, current.state)}
      }))
      return Promise.resolve()
    }
    if (steps.length > 0) {
      store.dispatch(new UpdateBrowser())
        .then(() => runSteps(steps))
        .then(updateLocation)
    }
    else {
      updateLocation()
    }
  }
})

startListeningForPopState()