import Group from './model/Group'
import Page from './model/Page'

export const getGroupByName = (name:string):Group =>
    store.getState().getGroupByName(name)

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
