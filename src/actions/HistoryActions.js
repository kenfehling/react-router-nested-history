import { SET_TABS, SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO, POPSTATE } from "../constants/ActionTypes";

export const setTabs = (initialTabUrls, currentUrl) => ({
  type: SET_TABS,
  initialTabUrls,
  currentUrl
});

export const switchToTab = (tab) => ({
  type: SWITCH_TO_TAB,
  tab
});

export const push = (url) => ({
  type: PUSH,
  url
});

export const back = (n) => ({
  type: BACK,
  n
});

export const forward = (n) => ({
  type: FORWARD,
  n
});

export const go = (n) => ({
  type: GO,
  n
});

export const popstate = (id) => ({
  type: POPSTATE,
  id
});