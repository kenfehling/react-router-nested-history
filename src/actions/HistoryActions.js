// @flow

import { SET_CONTAINERS, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import type { Container, ContainerConfig } from '../types';

export const setContainers = (containers: Container[], currentUrl: string) => ({
  type: SET_CONTAINERS,
  containers,
  currentUrl
});

export const switchToContainer = (container: Container) => ({
  type: SWITCH_TO_CONTAINER,
  container
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