// @flow
import { CREATE_CONTAINER } from "../src/constants/ActionTypes"
import type { Action } from "../src/types"

export const createContainers : Action[] = [
  {type: CREATE_CONTAINER, time: new Date(0), data: {groupIndex: 0, initialUrl: '/a', urlPatterns: ['/a', '/a/:id']}},
  {type: CREATE_CONTAINER, time: new Date(0), data: {groupIndex: 0, initialUrl: '/b', urlPatterns: ['/b', '/b/:id']}},
  {type: CREATE_CONTAINER, time: new Date(0), data: {groupIndex: 0, initialUrl: '/c', urlPatterns: ['/c', '/c/:id']}}
]

export const createContainers2 : Action[] = [
  {type: CREATE_CONTAINER, time: new Date(0), data: {groupIndex: 1, initialUrl: '/e', urlPatterns: ['/e', '/e/:id']}},
  {type: CREATE_CONTAINER, time: new Date(0), data: {groupIndex: 1, initialUrl: '/f', urlPatterns: ['/f', '/f/:id']}}
]

export const zeroPage:string = '/zero'