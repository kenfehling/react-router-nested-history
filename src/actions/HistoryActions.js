// @flow

import { CREATE_CONTAINER, INIT_GROUP, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";

export const createContainer = (groupIndex:number, initialUrl:string, urlPatterns:string[]) => ({
  type: CREATE_CONTAINER,
  groupIndex,
  initialUrl,
  urlPatterns
});

export const initGroup = (groupIndex:number, currentUrl:string) => ({
  type: INIT_GROUP,
  groupIndex,
  currentUrl
});

export const switchToContainer = (groupIndex:number, containerIndex:number) => ({
  type: SWITCH_TO_CONTAINER,
  groupIndex,
  containerIndex
});

export const push = (url: string) => ({
  type: PUSH,
  url
});

export const back = (n: number) => ({
  type: BACK,
  n
});

export const forward = (n: number) => ({
  type: FORWARD,
  n
});

export const go = (n: number) => ({
  type: GO,
  n
});

export const popstate = (id: number) => ({
  type: POPSTATE,
  id
});