import CreateContainer from '../../src/model/actions/CreateContainer'
import CreateGroup from '../../src/model/actions/CreateGroup'
import Group from '../../src/model/Group'
import Container from '../../src/model/Container'
import ISubGroup from '../../src/model/ISubGroup'
import UninitializedState from '../../src/model/UninitializedState'
import InitializedState from '../../src/model/InitializedState'
import LoadFromUrl from '../../src/model/actions/LoadFromUrl'
import {Map, fromJS} from 'immutable'

const createCreateGroup = (name:string):CreateGroup =>
    new CreateGroup({name, time: 500})

const createCreateSubGroup =
  ({name, parentGroupName, isDefault=false, allowInterContainerHistory=false}:
  {name:string, parentGroupName:string, isDefault?:boolean,
    allowInterContainerHistory?: boolean}):CreateGroup =>
    new CreateGroup({name, parentGroupName, isDefault,
      allowInterContainerHistory, time: 750})

const createCreateContainers =
  ({time, name_suffix, groupName, initialUrls, useDefault=false, resetOnLeave=false}:
  {time:number, name_suffix:string, groupName:string, initialUrls:string[],
    useDefault?:boolean, resetOnLeave?:boolean}):CreateContainer[] =>
    initialUrls.map((initialUrl:string, i:number) => new CreateContainer({
      groupName,
      name: 'Container ' + (i + 1) + name_suffix,
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
  name_suffix: 'A'
})

export const createContainers2:CreateContainer[] = createCreateContainers({
  time: 1005,
  groupName: 'Group 2',
  initialUrls: ['/e', '/f'],
  name_suffix: 'B'
})

export const createContainers3:CreateContainer[] = createCreateContainers({
  time: 1010,
  groupName: 'Group 3',
  initialUrls: ['/g', '/h'],
  useDefault: true,
  resetOnLeave: true,
  name_suffix: 'C'
})

const group1:Group = new Group({
  name: 'Group 1',
  containers: fromJS({
    'Container 1A': new Container({
      time: 1000,
      name: 'Container 1A',
      groupName: 'Group 1',
      initialUrl: '/a',
      patterns: ['/a', '/a/:id'],
      isDefault: true
    }),
    'Container 2A': new Container({
      time: 1001,
      name: 'Container 2A',
      groupName: 'Group 1',
      initialUrl: '/b',
      patterns: ['/b', '/b/:id']
    }),
    'Container 3A': new Container({
      time: 1002,
      name: 'Container 3A',
      groupName: 'Group 1',
      initialUrl: '/c',
      patterns: ['/c', '/c/:id']
    })
  })
})

const group2:Group = new Group({
  name: 'Group 2',
  containers: fromJS({
    'Container 1B': new Container({
      time: 1005,
      name: 'Container 1B',
      groupName: 'Group 2',
      initialUrl: '/e',
      patterns: ['/e', '/e/:id'],
    }),
    'Container 2B': new Container({
      time: 1006,
      name: 'Container 2B',
      groupName: 'Group 2',
      initialUrl: '/f',
      patterns: ['/f', '/f/:id'],
    })
  })
})

const group3:Group = new Group({
  name: 'Group 3',
  containers: fromJS({
    'Container 1C': new Container({
      time: 1010,
      name: 'Container 1C',
      groupName: 'Group 3',
      initialUrl: '/g',
      patterns: ['/g', '/g/:id'],
      isDefault: true
    }),
    'Container 2C': new Container({
      time: 1011,
      name: 'Container 2C',
      groupName: 'Group 3',
      initialUrl: '/h',
      patterns: ['/h', '/h/:id'],
    })
  })
})

export const simpleState = new UninitializedState({
  groups: fromJS({
    'Group 1': group1,
    'Group 2': group2,
    'Group 3': group3
  })
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
  groups: fromJS({
    'Nested Group 1':  new Group({
      name: 'Nested Group 1',
      containers: fromJS({
        'Group 1': nestedGroup1,
        'Group 2': nestedGroup2,
        'Group 3': nestedGroup3
      })
    })
  })
})

export const loadedSimpleState:InitializedState =
    new LoadFromUrl({url: '/a', time: 1250}).reduce(simpleState)

export const loadedNestedState:InitializedState =
    new LoadFromUrl({url: '/a', time: 1250}).reduce(nestedState)