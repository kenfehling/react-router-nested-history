// @flow

import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import type { Container, ContainerConfig } from '../types';

export const setContainers = (containers: ContainerConfig[], currentUrl: string) => ({
  type: SET_CONTAINERS,
  containers,
  currentUrl
});

export const switchToContainer = (groupIndex:number, containerIndex:number) => ({
  type: SWITCH_TO_CONTAINER,
  groupIndex,
  containerIndex
});

export const push = (groupIndex:number, url: string) => ({
  type: PUSH,
  groupIndex,
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