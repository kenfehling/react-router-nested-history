import CreateContainer from '../../src/model/actions/CreateContainer'
import CreateGroup from '../../src/model/actions/CreateGroup'
import Group from '../../src/model/Group'
import Container from '../../src/model/Container'
import Load from '../../src/model/actions/Load'
import {Map, fromJS} from 'immutable'
import State from '../../src/model/State'

const createCreateGroup = (name:string):CreateGroup =>
    new CreateGroup({name, time: 500})

const createCreateSubGroup =
  ({name, parentGroup, isDefault=false, allowInterContainerHistory=false}:
  {name:string, parentGroup:string, isDefault?:boolean,
    allowInterContainerHistory?: boolean}):CreateGroup =>
    new CreateGroup({name, parentGroup, isDefault,
      allowInterContainerHistory, time: 750})

export const createCreateContainers =
  ({time, name_suffix, group, initialUrls, useDefault=false, resetOnLeave=false}:
  {time:number, name_suffix:string, group:string, initialUrls:string[],
    useDefault?:boolean, resetOnLeave?:boolean}):CreateContainer[] =>
    initialUrls.map((initialUrl:string, i:number) => new CreateContainer({
      group,
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
  parentGroup: 'Group 1'
})

export const createSubGroup2:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 2',
  parentGroup: 'Group 1',
})

export const createSubGroup3:CreateGroup = createCreateSubGroup({
  name: 'SubGroup 3',
  parentGroup: 'Group 1',
  allowInterContainerHistory: true
})

export const createContainers1:CreateContainer[] = createCreateContainers({
  time: 1001,
  group: 'Group 1',
  initialUrls: ['/a', '/b', '/c'],
  useDefault: true,
  name_suffix: 'A'
})

export const createContainers2:CreateContainer[] = createCreateContainers({
  time: 1005,
  group: 'Group 2',
  initialUrls: ['/e', '/f'],
  name_suffix: 'B'
})

export const createContainers3:CreateContainer[] = createCreateContainers({
  time: 1010,
  group: 'Group 3',
  initialUrls: ['/g', '/h'],
  useDefault: true,
  resetOnLeave: true,
  name_suffix: 'C'
})

const group1:Group = new Group({
  name: 'Group 1'
})

const containers1:Map<string, Container> = fromJS({
  'Container 1A': new Container({
    name: 'Container 1A',
    group: 'Group 1',
    initialUrl: '/a',
    patterns: ['/a', '/a/:id'],
    isDefault: true
  }),
  'Container 2A': new Container({
    name: 'Container 2A',
    group: 'Group 1',
    initialUrl: '/b',
    patterns: ['/b', '/b/:id']
  }),
  'Container 3A': new Container({
    name: 'Container 3A',
    group: 'Group 1',
    initialUrl: '/c',
    patterns: ['/c', '/c/:id']
  })
})

const group2:Group = new Group({
  name: 'Group 2',
})

const containers2:Map<string, Container> = fromJS({
  'Container 1B': new Container({
    name: 'Container 1B',
    group: 'Group 2',
    initialUrl: '/e',
    patterns: ['/e', '/e/:id'],
  }),
  'Container 2B': new Container({
    name: 'Container 2B',
    group: 'Group 2',
    initialUrl: '/f',
    patterns: ['/f', '/f/:id'],
  })
})

const group3:Group = new Group({
  name: 'Group 3',
})

const containers3:Map<string, Container> = fromJS({
  'Container 1C': new Container({
    name: 'Container 1C',
    group: 'Group 3',
    initialUrl: '/g',
    patterns: ['/g', '/g/:id'],
    isDefault: true
  }),
  'Container 2C': new Container({
    name: 'Container 2C',
    group: 'Group 3',
    initialUrl: '/h',
    patterns: ['/h', '/h/:id'],
  })
})

export const simpleState = new State({
  containers: fromJS({
    'Group 1': group1,
    'Group 2': group2,
    'Group 3': group3
  }).concat(containers1).concat(containers2).concat(containers3)
})

const nestedGroup1 = new Group({
  ...Object(group1),
  parentGroup: 'Nested Group 1'
})

const nestedGroup2 = new Group({
  ...Object(group2),
  parentGroup: 'Nested Group 1'
})

const nestedGroup3 = new Group({
  ...Object(group3),
  parentGroup: 'Nested Group 1',
  allowInterContainerHistory: true
})

export const nestedState = new State({
  containers: fromJS({
    'Nested Group 1':  new Group({
      name: 'Nested Group 1'
    }),
    'Group 1': nestedGroup1,
    'Group 2': nestedGroup2,
    'Group 3': nestedGroup3
  }).concat(containers1).concat(containers2).concat(containers3)
})