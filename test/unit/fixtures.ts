import CreateContainer from '../../src/model/actions/CreateContainer'
import CreateGroup from '../../src/model/actions/CreateGroup'
import Group from '../../src/model/Group'
import Container from '../../src/model/Container'
import ISubGroup from '../../src/model/ISubGroup'
import UninitializedState from '../../src/model/UninitializedState'
import InitializedState from '../../src/model/InitializedState'
import LoadFromUrl from '../../src/model/actions/LoadFromUrl'

const createCreateGroup = (name:string):CreateGroup =>
    new CreateGroup({name, time: 500})

const createCreateSubGroup =
  ({name, parentGroupName, isDefault=false, allowInterContainerHistory=false}:
  {name:string, parentGroupName:string, isDefault?:boolean,
    allowInterContainerHistory?: boolean}):CreateGroup =>
    new CreateGroup({name, parentGroupName, isDefault,
      allowInterContainerHistory, time: 750})

const createCreateContainers =
  ({time, groupName, initialUrls, useDefault=false, resetOnLeave=false}:
  {time:number, groupName:string, initialUrls:string[], useDefault?:boolean,
  resetOnLeave?:boolean}):CreateContainer[] =>
    initialUrls.map((initialUrl:string, i:number) => new CreateContainer({
      groupName,
      name: 'Container ' + (i + 1),
      initialUrl,
      patterns: [initialUrl, `${initialUrl}/:id`, `${initialUrl}/:id/:name`],
      isDefault: useDefault && i === 0,
      resetOnLeave,
      time: time + i
    }))

export const createGroup1:CreateGroup = createCreateGroup('Group 1')
export const createGroup2:CreateGroup = createCreateGroup('Group 2')
export const createGroup3:CreateGroup = createCreateGroup('Group 3')

export const createSubGroup1:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 1',
  parentGroupName: 'Group 1'
})

export const createSubGroup2:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 2',
  parentGroupName: 'Group 1',
})

export const createSubGroup3:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 3',
  parentGroupName: 'Group 1',
  allowInterContainerHistory: true
})

export const createContainers1:CreateContainer[] = createCreateContainers({
  time: 1001,
  groupName: 'Group 1',
  initialUrls: ['/a', '/b', '/c'],
  useDefault: true,
})

export const createContainers2:CreateContainer[] = createCreateContainers({
  time: 1005,
  groupName: 'Group 2',
  initialUrls: ['/e', '/f'],
})

export const createContainers3:CreateContainer[] = createCreateContainers({
  time: 1010,
  groupName: 'Group 3',
  initialUrls: ['/g', '/h'],
  useDefault: true,
  resetOnLeave: true
})

const group1:Group = new Group({
  name: 'Group 1',
  containers: [
    new Container({
      time: 1000,
      name: 'Container 1',
      groupName: 'Group 1',
      initialUrl: '/a',
      patterns: ['/a', '/a/:id'],
      isDefault: true
    }),
    new Container({
      time: 1001,
      name: 'Container 2',
      groupName: 'Group 1',
      initialUrl: '/b',
      patterns: ['/b', '/b/:id']
    }),
    new Container({
      time: 1002,
      name: 'Container 3',
      groupName: 'Group 1',
      initialUrl: '/c',
      patterns: ['/c', '/c/:id']
    })
  ]
})

const group2:Group = new Group({
  name: 'Group 2',
  containers: [
    new Container({
      time: 1005,
      name: 'Container 1',
      groupName: 'Group 2',
      initialUrl: '/e',
      patterns: ['/e', '/e/:id'],
    }),
    new Container({
      time: 1006,
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
      time: 1010,
      name: 'Container 1',
      groupName: 'Group 3',
      initialUrl: '/g',
      patterns: ['/g', '/g/:id'],
      isDefault: true
    }),
    new Container({
      time: 1011,
      name: 'Container 2',
      groupName: 'Group 3',
      initialUrl: '/h',
      patterns: ['/h', '/h/:id'],
    })
  ]
})

export const simpleState = new UninitializedState({
  groups: [group1, group2, group3]
})

const nestedGroup1 = new Group({
  ...Object(group1),
  parentGroupName: 'Nested Group 1'
})

const nestedGroup2 = new Group({
  ...Object(group2),
  parentGroupName: 'Nested Group 1'
})

const nestedGroup3 = new Group({
  ...Object(group3),
  parentGroupName: 'Nested Group 1',
  allowInterContainerHistory: true
})

export const nestedState = new UninitializedState({
  groups: [
    new Group({
      name: 'Nested Group 1',
      containers: [
        nestedGroup1 as ISubGroup,
        nestedGroup2 as ISubGroup,
        nestedGroup3 as ISubGroup
      ]
    })
  ]
})

export const loadedSimpleState:InitializedState =
    new LoadFromUrl({url: '/a', time: 1250}).reduce(simpleState)

export const loadedNestedState:InitializedState =
    new LoadFromUrl({url: '/a', time: 1250}).reduce(nestedState)