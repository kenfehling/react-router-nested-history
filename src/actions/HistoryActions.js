// @flow
import { CREATE_CONTAINER, LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK,
  FORWARD, GO, POPSTATE, SET_ZERO_PAGE } from "../constants/ActionTypes"

export const createContainer = (groupIndex:number, initialUrl:string,
                                urlPatterns:string[], useDefault:boolean) => ({
  type: CREATE_CONTAINER,
  time: new Date(),
  data: {
    groupIndex,
    initialUrl,
    urlPatterns,
    useDefault
  },
})

export const loadFromUrl = (url:string, fromRefresh:boolean) => ({
  type: LOAD_FROM_URL,
  time: new Date(),
  data: {
    url,
    fromRefresh: fromRefresh || false
  }
})

export const switchToContainer = (groupIndex:number, containerIndex:number) => ({
  type: SWITCH_TO_CONTAINER,
  time: new Date(),
  data: {
    groupIndex,
    containerIndex
  }
})

export const push = (url: string, groupIndex:number, containerIndex:number) => ({
  type: PUSH,
  time: new Date(),
  data: {
    url,
    groupIndex,
    containerIndex
  }
})

export const back = (n: number) => ({
  type: BACK,
  time: new Date(),
  data: {
    n
  }
})

export const forward = (n: number) => ({
  type: FORWARD,
  time: new Date(),
  data: {
    n
  }
})

export const go = (n: number) => ({
  type: GO,
  time: new Date(),
  data: {
    n
  }
})

export const popstate = (id: number) => ({
  type: POPSTATE,
  time: new Date(),
  data: {
    id
  }
})

export const setZeroPage = (zeroPage: string) => ({
  type: SET_ZERO_PAGE,
  time: new Date(),
  data: {
    zeroPage
  }
})