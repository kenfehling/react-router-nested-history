// @flow

import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes"

export const createContainer = (groupIndex:number, initialUrl:string, urlPatterns:string[]) => ({
  type: CREATE_CONTAINER,
  groupIndex,
  initialUrl,
  urlPatterns
})

export const loadFromUrl = (url:string) => ({
  type: LOAD_FROM_URL,
  url
})

export const switchToContainer = (groupIndex:number, containerIndex:number) => ({
  type: SWITCH_TO_CONTAINER,
  groupIndex,
  containerIndex
})

export const push = (url: string) => ({
  type: PUSH,
  url
})

export const back = (n: number) => ({
  type: BACK,
  n
})

export const forward = (n: number) => ({
  type: FORWARD,
  n
})

export const go = (n: number) => ({
  type: GO,
  n
})

export const popstate = (id: number) => ({
  type: POPSTATE,
  id
})