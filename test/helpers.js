import {BACK, SWITCH_TO_CONTAINER, PUSH, LOAD_FROM_URL, FORWARD} from "../src/constants/ActionTypes"

export const loadAction = (url:string, time:number=0, fromRefresh:boolean=false) => ({
  type: LOAD_FROM_URL, time: new Date(time), data: {url, fromRefresh}})

export const pushAction = (url:string, pattern:string, groupIndex:number, containerIndex:number, time:number=0) => ({
  type: PUSH, time: new Date(time), data: {url, pattern, groupIndex, containerIndex}})

export const switchAction = (groupIndex:number, containerIndex:number, time:number=0) => ({
  type: SWITCH_TO_CONTAINER, time: new Date(time), data: {groupIndex, containerIndex}})

export const backAction = (n:number=1, time:number=0) =>
    ({type: BACK, time: new Date(time), data: {n}})

export const forwardAction = (n:number=1, time:number=0) =>
    ({type: FORWARD, time: new Date(time), data: {n}})