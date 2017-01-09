// @flow
import { CREATE_CONTAINER } from "../src/constants/ActionTypes"
import type { Action } from "../src/types"

export const createContainers : Action[] = [{
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 0,
    initialUrl: '/a',
    urlPatterns: ['/a', '/a/:id', '/a/:id/:name'],
    useDefault: true,
    keepHistory: true
  }
}, {
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 0,
    initialUrl: '/b',
    urlPatterns: ['/b', '/b/:id', '/b/:id/:name'],
    useDefault: true,
    keepHistory: true
  }
}, {
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 0,
    initialUrl: '/c',
    urlPatterns: ['/c', '/c/:id', '/c/:id/:name'],
    useDefault: true,
    keepHistory: true
  }
}]

export const createContainers2 : Action[] = [{
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 1,
    initialUrl: '/e',
    urlPatterns: ['/e', '/e/:id', '/e/:id/:name'],
    useDefault: false,
    keepHistory: true
  }
}, {
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 1,
    initialUrl: '/f',
    urlPatterns: ['/f', '/f/:id', '/f/:id/:name'],
    useDefault: false,
    keepHistory: true
  }
}]

export const createContainers3 : Action[] = [{
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 0,
    initialUrl: '/j',
    urlPatterns: ['/j', '/j/:id', '/j/:id/:name'],
    useDefault: true,
    keepHistory: false
  }
}, {
  type: CREATE_CONTAINER,
  time: new Date(0),
  data: {
    groupIndex: 0,
    initialUrl: '/k',
    urlPatterns: ['/k', '/k/:id', '/k/:id/:name'],
    useDefault: true,
    keepHistory: false
  }
}]

export const zeroPage:string = '/zero'