import CreateContainer from '../../src/model/actions/CreateContainer'
import CreateGroup from '../../src/model/actions/CreateGroup'
import Container from '../../src/model/Container'
import Load from '../../src/model/actions/Load'
import State from '../../src/model/State'
import Action from '../../src/model/Action'
import {deriveState} from '../../src/store/store'
import VisitedPage from '../../src/model/VisitedPage'
import SetZeroPage from '../../src/model/actions/SetZeroPage'
import CreateWindow from '../../src/model/actions/CreateWindow'

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

export const zero:VisitedPage = State.createZeroPage('/zero')
export const baseActions:Action[] = [
  new SetZeroPage({
    url: zero.url,
    time: 100
  })
]

export const originalSimpleActionsWithoutLoad:Action[] = [
  ...baseActions,
  createGroup1,
  createGroup2,
  createGroup3,
  ...createContainers1,
  ...createContainers2,
  ...createContainers3
]

export const originalSimpleActions:Action[] = [
  ...originalSimpleActionsWithoutLoad,
  new Load({
    url: '/a',
    time: 1250
  })
]

export const originalNestedActionsWithoutLoad:Action[] = [
  ...baseActions,
  createGroup1,
  createGroup2,
  createGroup3,
  createSubGroup1,
  createSubGroup2,
  createSubGroup3,
  ...createCreateContainers({
    time: 1000,
    group: createSubGroup1.name,
    initialUrls: ['/a', '/b', '/c'],
    useDefault: true,
    name_suffix: 'A'
  }),
  ...createCreateContainers({
    time: 1000,
    group: createSubGroup2.name,
    initialUrls: ['/e', '/f'],
    name_suffix: 'B'
  }),
  ...createCreateContainers({
    time: 1000,
    group: createSubGroup3.name,
    initialUrls: ['/g', '/h'],
    useDefault: true,
    name_suffix: 'C'
  })
]

export const originalNestedActions:Action[] = [
  ...originalNestedActionsWithoutLoad,
  new Load({
    url: '/a',
    time: 1250
  })
]

export const originalBlankActionsWithoutLoad:Action[] = [
  ...baseActions,
  createGroup2,
  ...createContainers2,
  new CreateWindow({forName: 'Container 1B', visible: false}),
  new CreateWindow({forName: 'Container 2B', visible: false})
]

export const originalBlankActions:Action[] = [
  ...originalBlankActionsWithoutLoad,
  new Load({
    url: '/b',
    time: 1250
  })
]

export const simpleState = deriveState(originalSimpleActions, new State())
export const nestedState = deriveState(originalNestedActions, new State())
export const blankStateBeforeLoad =
    deriveState(originalBlankActionsWithoutLoad, new State())
export const blankState = deriveState(originalBlankActions, new State())