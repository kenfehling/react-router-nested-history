import IState from '../../../src/model/IState'
import CreateContainer from '../../../src/model/actions/CreateContainer'
import Push from '../../../src/model/actions/Push'
import Page from '../../../src/model/Page'
import PopState from '../../../src/model/actions/PopState'
import LoadFromUrl from '../../../src/model/actions/LoadFromUrl'
import ReplaceStep from '../../../src/model/steps/ReplaceStep'
import PushStep from '../../../src/model/steps/PushStep'
import SwitchToContainer from '../../../src/model/actions/SwitchToContainer'
import Back from '../../../src/model/actions/Back'
import BackStep from '../../../src/model/steps/BackStep'
import Forward from '../../../src/model/actions/Forward'
import ForwardStep from '../../../src/model/steps/ForwardStep'
import SetZeroPage from '../../../src/model/actions/SetZeroPage'
import Action from '../../../src/model/Action'
import {createStepsSince} from '../../../src/util/actions'
import * as store from '../../../src/store'
import GoStep from '../../../src/model/steps/GoStep'
import * as R from 'ramda'
import Startup from '../../../src/model/actions/Startup'
import {
  createGroup1, createContainers1, createContainers3,
  createContainers2, createGroup2, createGroup3, createSubGroup1,
  createSubGroup2, createSubGroup3
} from '../fixtures'
declare const describe:any
declare const it:any
declare const expect:any

describe('action utils', () => {
  const zeroPage:Page = Page.createZeroPage('/zero')
  const baseActions:Action[] = [
    new SetZeroPage({
      url: zeroPage.url,
      time: 1000
    }),
    new Startup({time: 1000})
  ]
  const originalSimpleActions:Action[] = [
    ...baseActions,
    createGroup1,
    ...createContainers1,
    createGroup2,
    ...createContainers2,
    createGroup3,
    ...createContainers3
  ]

  const originalNestedActions:Action[] = [
    ...baseActions,
    createGroup1,
    createSubGroup1,
    createSubGroup2,
    createSubGroup3,
    new CreateContainer({
      groupName: createSubGroup1.name,
      name: 'Container 1',
      initialUrl: '/a',
      patterns: ['/a', '/a/:id'],
      isDefault: true,
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup1.name,
      name: 'Container 2',
      initialUrl: '/b',
      patterns: ['/b', '/b/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup2.name,
      name: 'Container 1',
      initialUrl: '/e',
      patterns: ['/e', '/e/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup2.name,
      name: 'Container 2',
      initialUrl: '/f',
      patterns: ['/f', '/f/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup3.name,
      name: 'Container 1',
      initialUrl: '/g',
      patterns: ['/g', '/g/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup3.name,
      name: 'Container 2',
      initialUrl: '/h',
      patterns: ['/h', '/h/:id'],
      time: 1000
    })
  ]

  describe('derivedState', () => {
    it('derives IState from a list of Actions', () => {
      const state:IState = store.deriveState(originalSimpleActions)
      expect(state.groups.length).toBe(3)
      expect(state.groups[0].activePage.url).toBe('/a')
    })
  })

  describe('createStepsSinceUpdate', () => {
    describe('simple group', () => {
      describe('load', () => {
        it('default', () => {
          const actions: Action[] = [...originalSimpleActions, new LoadFromUrl({
            url: '/a',
            time: 1000
          })]
          expect(createStepsSince(actions, 0)).toEqual([
            new ReplaceStep(zeroPage),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1',
              lastVisited: 1000
            }))
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [...originalSimpleActions, new LoadFromUrl({
            url: '/b',
            time: 2000
          })]
          expect(createStepsSince(actions, 0)).toEqual([
            new ReplaceStep(zeroPage),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1',
              lastVisited: 1000
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2',
              lastVisited: 2000
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [...originalSimpleActions, new LoadFromUrl({
            url: '/b/1',
            time: 1001
          })]
          expect(createStepsSince(actions, 0)).toEqual([
            new ReplaceStep(zeroPage),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1',
              lastVisited: 1000
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2',
              lastVisited: 1000
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              groupName: 'Group 1',
              containerName: 'Container 2',
              lastVisited: 1001
            }))
          ])
        })
      })

      describe('after load', () => {
        const loadActions:Action[] = [...originalSimpleActions,
          new LoadFromUrl({
            url: '/a/1',
            time: 1000
          })
        ]

        it('back', () => {
          const actions:Action[] = [...loadActions, new Back({
            time: 1002
          })]
          expect(createStepsSince(actions, 1000)).toEqual([
            new GoStep(-1)
          ])
        })

        it('switch to container', () => {
          const actions:Action[] = [...loadActions, new SwitchToContainer({
            groupName: 'Group 1',
            name: 'Container 2',
            time: 1002
          })]
          expect(createStepsSince(actions, 1000)).toEqual([
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2',
              lastVisited: 1003
            }))
          ])
        })

        it('handles pop back', () => {
          const actions:Action[] = [...loadActions, new PopState({
            n: -1,
            time: 1002
          })]
          expect(createStepsSince(actions, 1000)).toEqual([])
        })

        it('handles pop back, then other stuff', () => {
          const actions:Action[] = [...loadActions, ...[
            new PopState({
              n: -1,
              time: 1002
            }),
            new Forward({
              n: 1,
              time: 1002
            })
          ]]

          expect(createStepsSince(actions, 1000)).toEqual([
            new ForwardStep()
          ])
        })

        describe('back, switch, pop', () => {
          it('should keep tab 1 forward history, but not tab 2', () => {
            const actions:Action[] = [...loadActions,
              new Back({
                time: 3000
              }),
              new SwitchToContainer({
                groupName: 'Group 1',
                name: 'Container 2',
                time: 4000
              }),
              new PopState({
                n: -1,
                time: 5000
              })
            ]
            expect(createStepsSince(actions, 4500)).toEqual([
              new PushStep(new Page({
                url: '/a/1',
                params: {id: '1'},
                groupName: 'Group 1',
                containerName: 'Container 1',
                lastVisited: 1000
              })),
              new BackStep()
            ])
          })
        })

        describe('after switch container', () => {
          const switchActions:Action[] = [...loadActions,
            new SwitchToContainer({
              groupName: 'Group 1',
              name: 'Container 2',
              time: 2000
            })
          ]

          it('removes forward history after going back to default tab', () => {
            const actions:Action[] = [...switchActions,
              new PopState({
                n: -1,
                time: 3000
              })
            ]
            expect(createStepsSince(actions, 2000)).toEqual([
              new BackStep(),
              new PushStep(new Page({
                url: '/a/1',
                params: {id: '1'},
                groupName: 'Group 1',
                containerName: 'Container 1',
                lastVisited: 3001
              }))
            ])
          })
        })
      })

      describe('with no default tab', () => {
        describe('after load', () => {
          const loadActions:Action[] = [...originalSimpleActions,
            new LoadFromUrl({
              url: '/e/1',
              time: 1500
            })
          ]

          describe('back, switch, push, back, switch', () => {
            it('should do back, push, push, back', () => {
              const actions:Action[] = [...loadActions,
                new Back({
                  time: 3000
                }),
                new SwitchToContainer({
                  groupName: 'Group 2',
                  name: 'Container 2',
                  time: 4000
                }),
                new Push({
                  url: '/f/1',
                  groupName: 'Group 2',
                  containerName: 'Container 2',
                  time: 5000
                }),
                new Back({
                  time: 6000
                }),
                new SwitchToContainer({
                  groupName: 'Group 2',
                  name: 'Container 1',
                  time: 7000
                }),
              ]
              expect(createStepsSince(actions, 6500)).toEqual([
                new BackStep(),
                new PushStep(new Page({
                  url: '/e',
                  params: {},
                  groupName: 'Group 2',
                  containerName: 'Container 1',
                  lastVisited: 7001
                })),
                new PushStep(new Page({
                  url: '/e/1',
                  params: {id: '1'},
                  groupName: 'Group 2',
                  containerName: 'Container 1',
                  lastVisited: 1500
                })),
                new BackStep()
              ])
            })
          })
        })
      })
    })

    describe('nested group', () => {
      describe('load', () => {
        it('default', () => {
          const actions: Action[] = [...originalNestedActions, new LoadFromUrl({
            url: '/a',
            time: 1000
          })]
          expect(createStepsSince(actions, 0)).toEqual([
            new ReplaceStep(zeroPage),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: createContainers1[0].name,
              lastVisited: 1000
            })),
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [...originalNestedActions, new LoadFromUrl({
            url: '/b',
            time: 1001
          })]
          expect(createStepsSince(actions, 0)).toEqual([
            new ReplaceStep(zeroPage),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 1',
              lastVisited: 1000
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 2',
              lastVisited: 1001
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [...originalNestedActions, new LoadFromUrl({
            url: '/b/1',
            time: 1001
          })]
          expect(createStepsSince(actions, 0)).toEqual([
            new ReplaceStep(zeroPage),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 1',
              lastVisited: 1000
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 2',
              lastVisited: 1000
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              groupName: createSubGroup1.name,
              containerName: 'Container 2',
              lastVisited: 1001
            }))
          ])
        })
      })

      describe('after switch container', () => {
        const switchActions:Action[] = [...originalNestedActions,
          new LoadFromUrl({
            url: '/a/1',
            time: 1000
          }),
          new SwitchToContainer({
            groupName: createSubGroup1.name,
            name: 'Container 2',
            time: 2000
          })
        ]

        it('removes forward history after going back to default tab', () => {
          const actions:Action[] = [...switchActions,
            new PopState({
              n: -1,
              time: 3000
            })
          ]
          expect(createStepsSince(actions, 2000)).toEqual([
            new BackStep(),
            new PushStep(new Page({
              url: '/a/1',
              params: {id: '1'},
              groupName: createSubGroup1.name,
              containerName: 'Container 1',
              lastVisited: 3001
            }))
          ])
        })
      })
    })

    describe('inter-container history (mobile)', () => {
      describe('after switch container', () => {
        const switchActions:Action[] = [...originalNestedActions,
          new LoadFromUrl({
            url: '/g/1',
            time: 1000
          }),
          new SwitchToContainer({
            groupName: createSubGroup3.name,
            name: 'Container 2',
            time: 2000
          })
        ]

        it('removes forward history after going back to default screen', () => {
          const actions:Action[] = [...switchActions,
            new Push({
              groupName: createSubGroup3.name,
              containerName: 'Container 2',
              url: '/h/1',
              time: 3000
            }),
            new PopState({
              n: -1,
              time: 4000
            }),
            new PopState({
              n: -1,
              time: 5000
            })
          ]
          expect(createStepsSince(actions, 4000)).toEqual([
            new BackStep(),
            new PushStep(new Page({
              url: '/g/1',
              params: {id: '1'},
              groupName: createSubGroup3.name,
              containerName: 'Container 1',
              lastVisited: 5001
            }))
          ])
        })
      })
    })
  })
})