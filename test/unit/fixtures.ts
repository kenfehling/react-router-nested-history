import CreateContainer from '../../src/model/actions/CreateContainer'
import CreateGroup from '../../src/model/actions/CreateGroup'
import Group from '../../src/model/Group'
import Container from '../../src/model/Container'
import IState from '../../src/model/IState'
import ISubGroup from '../../src/model/interfaces/ISubGroup'
import UninitializedState from '../../src/model/UninitializedState'
import InitializedState from '../../src/model/InitializedState'
import LoadFromUrl from '../../src/model/actions/LoadFromUrl'
import Page from '../../src/model/Page'

const TIME:number = 1000

export const createPage = (url:string) => new Page({
  url,
  params: {},
  groupName: 'Group 1',
  containerName: 'Container 1',
  firstVisited: 1000
})

const createCreateGroup = (name:string):CreateGroup =>
    new CreateGroup({name, time: TIME})

const createCreateSubGroup =
  ({name, parentGroupName, isDefault=false}:
  {name:string, parentGroupName:string, isDefault?:boolean}):CreateGroup =>
    new CreateGroup({name, parentGroupName, isDefault, time: TIME})

const createCreateContainers =
  ({groupName, initialUrls, useDefault=false, resetOnLeave=false}:
  {groupName:string, initialUrls:string[], useDefault?:boolean,
  resetOnLeave?:boolean}):CreateContainer[] =>
    initialUrls.map((initialUrl:string, i:number) => new CreateContainer({
      groupName,
      name: 'Container ' + (i + 1),
      initialUrl,
      patterns: [initialUrl, `${initialUrl}/:id`, `${initialUrl}/:id/:name`],
      isDefault: useDefault && i === 0,
      resetOnLeave,
      time: TIME
    }))

export const createGroup1:CreateGroup = createCreateGroup('Group 1')
export const createGroup2:CreateGroup = createCreateGroup('Group 2')
export const createGroup3:CreateGroup = createCreateGroup('Group 3')

export const createSubGroup1:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 1',
  parentGroupName: 'Group 1',
  isDefault: true
})

export const createSubGroup2:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 2',
  parentGroupName: 'Group 1',
})

export const createContainers1:CreateContainer[] = createCreateContainers({
  groupName: 'Group 1',
  initialUrls: ['/a', '/b', '/c'],
  useDefault: true,
})

export const createContainers2:CreateContainer[] = createCreateContainers({
  groupName: 'Group 2',
  initialUrls: ['/e', '/f'],
})

export const createContainers3:CreateContainer[] = createCreateContainers({
  groupName: 'Group 3',
  initialUrls: ['/j', '/k'],
  useDefault: true,
  resetOnLeave: true
})

const group1:Group = new Group({
  name: 'Group 1',
  containers: [
    new Container({
      name: 'Container 1',
      groupName: 'Group 1',
      initialUrl: '/a',
      patterns: ['/a', '/a/:id'],
      isDefault: true
    }),
    new Container({
      name: 'Container 2',
      groupName: 'Group 1',
      initialUrl: '/b',
      patterns: ['/b', '/b/:id'],
      isDefault: false
    }),
    new Container({
      name: 'Container 3',
      groupName: 'Group 1',
      initialUrl: '/c',
      patterns: ['/c', '/c/:id'],
      isDefault: false
    })
  ]
})

const group2:Group = new Group({
  name: 'Group 2',
  containers: [
    new Container({
      name: 'Container 1',
      groupName: 'Group 2',
      initialUrl: '/e',
      patterns: ['/e', '/e/:id'],
    }),
    new Container({
      name: 'Container 2',
      groupName: 'Group 2',
      initialUrl: '/f',
      patterns: ['/f', '/f/:id'],
    }),
  ]
})

const group3:Group = new Group({
  name: 'Group 3',
  containers: [
    new Container({
      name: 'Container 1',
      groupName: 'Group 3',
      initialUrl: '/g',
      patterns: ['/g', '/a/:id'],
      isDefault: true
    }),
    new Container({
      name: 'Container 2',
      groupName: 'Group 3',
      initialUrl: '/h',
      patterns: ['/h', '/a/1'],
    })
  ]
})

export const simpleState = new UninitializedState({
  groups: [group1, group2, group3]
})

const nestedGroup1 = new Group({
  ...Object(group1),
  parentGroupName: 'Nested Group 1',
  isDefault: true
})

const nestedGroup2 = new Group({
  ...Object(group2),
  parentGroupName: 'Nested Group 1'
})

export const nestedState = new UninitializedState({
  groups: [
    new Group({
      name: 'Nested Group 1',
      containers: [
        nestedGroup1 as ISubGroup,
        nestedGroup2 as ISubGroup
      ]
    }),
    group3
  ]
})

export const loadedSimpleState:InitializedState =
  new LoadFromUrl({url: '/a', time: TIME}).reduce(simpleState)

export const loadedNestedState:InitializedState =
    new LoadFromUrl({url: '/a', time: TIME}).reduce(nestedState)