import {createStepsSince} from './util/actions'
import * as browser from './browserFunctions'
import {Location} from 'history'
import * as Queue from 'promise-queue'
import {canUseWindowLocation} from './util/location'
import IState from './model/IState'
import Group from './model/Group'
import Page from './model/Page'
import Step from './model/interfaces/Step'
import Action from './model/Action'
import UpdateBrowser from './model/actions/UpdateBrowser'
import LoadFromUrl from './model/actions/LoadFromUrl'
import PopState from './model/actions/PopState'
import Startup from './model/actions/Startup'
import InitializedState from './model/InitializedState'
import IUpdateData from './model/interfaces/IUpdateData'

const queue = new Queue(1, Infinity)  // maxConcurrent = 1, maxQueue = Infinity
let unlisten
const stepListeners:({before:(currentUrl:string) => void,
                      after:(currentUrl:string) => void})[] = []
const changeListeners:((data:IUpdateData)=>void)[] = []

export const addStepListener = listener => stepListeners.push(listener)

export const addChangeListener = listener => {
  changeListeners.push(listener)
  if (isInitialized()) {
    updateChangeListeners()
  }
}

const startListeningForPopState = () => {
  unlisten = browser.listen((location:Location) => {
    if (location.state) {
      const page:Page = new Page(location.state)
      const state:IState = store.getState()
      store.dispatch(new PopState({n: state.getShiftAmount(page)}))
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

export const getGroupByName = (name:string):Group =>
    store.getState().getGroupByName(name)

export const startup = ():void =>
    store.dispatch(new Startup({fromRefresh: browser.wasLoadedFromRefresh}))

export const loadFromUrl = (url:string):void =>
    store.dispatch(new LoadFromUrl({
      url,
      fromRefresh: browser.wasLoadedFromRefresh
    }))


export const getLastAction = ():Action => store.getLastAction()
export const getLastActionType = ():string => getLastAction().type

export const getBackPageInGroup = (groupName:string):Page =>
  store.getState().getBackPageInGroup(groupName)

export const goBackInGroup = (groupName:string, n:number=1):void => {
  switchToGroup(groupName)
  back(n)
}

export const goForwardInGroup = (groupName:string, n:number=1):void => {
  switchToGroup(groupName)
  forward(n)
}

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

export const isGroupActive = (groupName:string): boolean =>
    store.getState().isGroupActive(groupName)

export const isInitialized = (): boolean =>
    store.getState() instanceof InitializedState

function runStep(step:Step):Promise<void> {
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
  return [unlistenPromise, stepPromise, startListeningPromise].reduce(
      (p:Promise<any>, s) => p.then(s), Promise.resolve())
}

export function runSteps(steps:Step[]):Promise<void> {
  const ps:() => Promise<void> = () =>
      steps.reduce((p, step) => p.then(() => runStep(step)), Promise.resolve())
  return queue.add(ps)
}

const updateChangeListeners = () => {
  const state:IState = store.getState()
  const data:IUpdateData = {
    lastAction: getLastAction(),
    state
  }
  changeListeners.forEach(listener => listener(data))
}

export const listenToStore = () => store.subscribe(() => {
  if (isInitialized()) {
    const state:IState = store.getState()
    const lastUpdate: number = state.lastUpdate
    const steps: Step[] = createStepsSince(store.actions, lastUpdate)
    if (steps.length > 0) {
      store.dispatch(new UpdateBrowser())
      runSteps(steps).then(updateChangeListeners)
    }
    else {
      updateChangeListeners()
      updateChangeListeners()  // For some reason this helps?
    }
  }
})

startListeningForPopState()