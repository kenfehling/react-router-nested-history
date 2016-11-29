// @flow

import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";
import type { Container, ContainerConfig } from '../model';

export const setTabs = (tabs: ContainerConfig, currentUrl: string) => ({
  type: SET_TABS,
  tabs,
  currentUrl
});

export const switchToTab = (tab: Container) => ({
  type: SWITCH_TO_TAB,
  tab
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