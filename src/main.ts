import {createStepsSince} from './util/actions'
import * as browser from './browserFunctions'
import { Location } from 'history'
import store from './store'
import {createLocation} from 'history'
import * as Queue from 'promise-queue'
import {canUseWindowLocation} from './util/location'
import {parseParamsFromPatterns} from './util/url'
import * as R from 'ramda'
import IState from './model/IState'
import Group from './model/Group'
import Page from './model/Page'
import Step from './model/interfaces/Step'
import Action from './model/Action'
import UpdateBrowser from './model/actions/UpdateBrowser'
import LoadFromUrl from './model/actions/LoadFromUrl'
import IContainer from './model/interfaces/IContainer'
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
import Container from './model/Container'
import InitializedState from './model/InitializedState'
declare const window
declare const CustomEvent

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

export const addChangeListener = (callback:(state:IState)=>void) => {
  const fn:Function = () => {
    const state:IState = store.getState()
    if (state instanceof InitializedState) {
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

export const getGroupByName = (name:string):Group =>
    store.getState().getGroupByName(name)

export const hasGroupWithName = (name:string):boolean =>
    store.getState().hasGroupWithName(name)

const createGroup = (action:CreateGroup):Promise<Group> => {
  return store.dispatch(action).then(
    (state:IState) => Promise.resolve(state.getGroupByName(action.name)))
}

export const getOrCreateGroup = (action:CreateGroup):Promise<Group> => {
  if (hasGroupWithName(action.name)) {
    return Promise.resolve(getGroupByName(action.name))
  }
  else {
    return createGroup(action)
  }
}

const createContainer = (action:CreateContainer):Promise<IContainer> => {
  return store.dispatch(action).then((state:IState) =>
         state.getGroupByName(action.groupName).getContainerByName(action.name))
}

export const getOrCreateContainer = (action:CreateContainer):Promise<IContainer> => {
  const state:IState = store.getState()
  const group:Group = state.getGroupByName(action.groupName)
  if (group.hasContainerWithName(action.name)) {
    return Promise.resolve(group.getContainerByName(action.name))
  }
  else {
    return createContainer(action)
  }
}

export const switchToGroup = (groupName:string):Promise<IState> =>
    store.dispatch(new SwitchToGroup({groupName}))

export const switchToContainerName = (act:SwitchToContainer):Promise<IState> => {
  return store.dispatch(act)
}

export const switchToContainerIndex = (groupName:string,
                                       index:number):Promise<IState> => {
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
                     patterns:string[]):Promise<IState> => {
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

export const startup = ():Promise<IState> =>
    store.persist({whitelist: ['actions']}).then(() =>
    store.dispatch(new Startup({fromRefresh: browser.wasLoadedFromRefresh})))

export const loadFromUrl = (url:string):Promise<IState> =>
    store.dispatch(new LoadFromUrl({
      url,
      fromRefresh: browser.wasLoadedFromRefresh
    }))

export const setZeroPage = (url:string|null):Promise<IState> =>
    store.dispatch(new SetZeroPage({url}))

export const top = (action:Top):Promise<IState> => store.dispatch(action)

export const go = (n:number=1):Promise<IState> => store.dispatch(new Go({n}))

export const back = (n:number=1):Promise<IState> => store.dispatch(new Back({n}))

export const forward = (n:number=1):Promise<IState> =>
    store.dispatch(new Forward({n}))

export const getBackPage = ():Page => store.getState().backPage

export const getActivePageInGroup = (groupName:string):Page =>
    store.getState().getActivePageInGroup(groupName)

export const getActiveUrlInGroup = (groupName:string):string =>
    store.getState().getActivePageInGroup(groupName).url

export const urlMatchesGroup = (url:string, groupName:string):boolean =>
    getGroupByName(groupName).patternsMatch(url)

export const getActivePageInContainer = (groupName:string,
                                         containerName:string):Page =>
    store.getState().getActivePageInContainer(groupName, containerName)

export const getActiveUrlInContainer = (groupName:string,
                                        containerName:string):string =>
  store.getState().getActiveUrlInContainer(groupName, containerName)

export const getContainerLinkUrl = (groupName:string,
                                    containerName:string):string =>
  store.getState().getContainerLinkUrl(groupName, containerName)

export const isContainerActive = (groupName:string,
                               containerName:string):boolean =>
  store.getState().isContainerActive(groupName, containerName)

export const getIndexedContainerStackOrder = (groupName:string) : number[] =>
    store.getState().getIndexedContainerStackOrderForGroup(groupName)

export const getActiveContainerIndexInGroup = (groupName:string): number =>
    store.getState().getActiveContainerIndexInGroup(groupName)

export const getActiveContainerNameInGroup = (groupName:string): string =>
    store.getState().getActiveContainerNameInGroup(groupName)

export const getActiveGroup = (): Group => store.getState().activeGroup
export const getActiveGroupName = (): string => store.getState().activeGroupName

export const isInitialized = (): boolean =>
    store.getState() instanceof InitializedState

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
  if (isInitialized()) {
    const actions:Action[] = store.getActions()
    const state:IState = store.deriveState(actions)
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