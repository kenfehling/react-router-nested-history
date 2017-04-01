import CreateContainer from '../../../src/model/actions/CreateContainer'
import Push from '../../../src/model/actions/Push'
import PopState from '../../../src/model/actions/PopState'
import Load from '../../../src/model/actions/Load'
import ReplaceStep from '../../../src/model/steps/ReplaceStep'
import PushStep from '../../../src/model/steps/PushStep'
import SwitchToContainer from '../../../src/model/actions/SwitchToContainer'
import Back from '../../../src/model/actions/Back'
import BackStep from '../../../src/model/steps/BackStep'
import Forward from '../../../src/model/actions/Forward'
import SetZeroPage from '../../../src/model/actions/SetZeroPage'
import Action from '../../../src/model/BaseAction'
import GoStep from '../../../src/model/steps/GoStep'
import {
  createGroup1, createContainers1, createContainers3, createContainers2,
  createGroup2, createGroup3, createSubGroup1, createSubGroup2, createSubGroup3
} from '../fixtures'
import {expect} from 'chai'
import VisitedPage from '../../../src/model/VistedPage'
import State from '../../../src/model/State'
import Page from '../../../src/model/Page'
import {createSteps} from '../../../src/util/reconciler'
import {deriveState} from '../../../src/store/store'
declare const describe:any
declare const it:any

describe('reconciler', () => {
  const zero:VisitedPage = State.createZeroPage('/zero')
  const baseActions:Action[] = [
    new SetZeroPage({
      url: zero.url,
      time: 1000
    })
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
      name: 'Container 1A',
      initialUrl: '/a',
      patterns: ['/a', '/a/:id'],
      isDefault: true,
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup1.name,
      name: 'Container 2A',
      initialUrl: '/b',
      patterns: ['/b', '/b/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup1.name,
      name: 'Container 3A',
      initialUrl: '/c',
      patterns: ['/c', '/c/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup2.name,
      name: 'Container 1B',
      initialUrl: '/e',
      patterns: ['/e', '/e/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup2.name,
      name: 'Container 2B',
      initialUrl: '/f',
      patterns: ['/f', '/f/:id'],
      time: 1000
    }),
    new CreateContainer({
      groupName: createSubGroup3.name,
      name: 'Container 1C',
      initialUrl: '/g',
      patterns: ['/g', '/g/:id'],
      time: 1000,
      isDefault: true
    }),
    new CreateContainer({
      groupName: createSubGroup3.name,
      name: 'Container 2C',
      initialUrl: '/h',
      patterns: ['/h', '/h/:id'],
      time: 1000
    })
  ]

  describe('createStepsSinceUpdate', () => {
    const createStepsSince = (actions, time) => {
      const oldActions:Action[] = actions.filter(a => a.time <= time)
      const newActions:Action[] = actions.filter(a => a.time > time)
      const oldState:State = deriveState(oldActions, new UninitializedState())
      return createSteps(oldState, newActions)
    }

    describe('simple group', () => {
      describe('load', () => {
        it('default', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new Load({
              url: '/a',
              time: 1500
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              containerName: 'Container 1A'
            }))
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new Load({
              url: '/b',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              containerName: 'Container 2A'
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new Load({
              url: '/b/1',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              containerName: 'Container 2A'
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              containerName: 'Container 2A'
            }))
          ])
        })
      })

      describe('after load', () => {
        const loadActions:Action[] = [
          ...originalSimpleActions,
          new Load({
            url: '/a/1',
            time: 1200
          })
        ]

        it('back', () => {
          const actions:Action[] = [...loadActions, new Back({time: 5000})]
          expect(createStepsSince(actions, 4000)).to.deep.equal([
            new GoStep(-1)
          ])
        })

        it('switch to container', () => {
          const actions:Action[] = [
            ...loadActions,
            new SwitchToContainer({
              name: 'Container 2A',
              time: 5000
            })
          ]
          expect(createStepsSince(actions, 4000)).to.deep.equal([
            new PushStep(new Page({
              url: '/b',
              params: {},
              containerName: 'Container 2A'
            }))
          ])
        })

        it('handles pop back', () => {
          const actions:Action[] = [...loadActions, new PopState({
            n: -1,
            time: 5000
          })]
          expect(createStepsSince(actions, 4000)).to.deep.equal([])
        })

        it('handles pop back, then other stuff', () => {
          const actions:Action[] = [
            ...loadActions,
            new PopState({
              n: -1,
              time: 2000
            }),
            new Forward({
              n: 1,
              time: 3000
            })
          ]
          expect(createStepsSince(actions, 1900)).to.deep.equal([
            new GoStep(1)
          ])
        })

        describe('back, switch, pop', () => {
          const backSwitchActions:Action[] = [
            ...loadActions,
            new Back({
              time: 3000
            }),
            new SwitchToContainer({
              name: 'Container 2A',
              time: 4000
            })
          ]

          it('should remove tab 2 history', () => {
            const actions:Action[] = [
              ...backSwitchActions,
              new PopState({
                n: -1,
                time: 5000
              })
            ]
            expect(createStepsSince(actions, 4500)).to.deep.equal([
              new PushStep(new Page({
                url: '/a/1',
                params: {id: '1'},
                containerName: 'Container 1A'
              })),
              new BackStep()
            ])
          })

          it('should keep tab 1 forward history, but not tab 2', () => {
            const actions:Action[] = [
              ...backSwitchActions,
              new Push({
                containerName: 'Container 2A',
                url: '/b/1',
                time: 4200
              }),
              new PopState({
                n: -2,
                time: 5000
              })
            ]
            expect(createStepsSince(actions, 4500)).to.deep.equal([
              new PushStep(new Page({
                url: '/a/1',
                params: {id: '1'},
                containerName: 'Container 1A'
              })),
              new BackStep()
            ])
          })
        })

        describe('after switch container', () => {
          const switchActions:Action[] = [
            ...loadActions,
            new SwitchToContainer({
              name: 'Container 2A',
              time: 2000
            })
          ]

          it('removes forward history after going back to default tab', () => {
            const actions:Action[] = [
              ...switchActions,
              new PopState({
                n: -1,
                time: 3000
              })
            ]
            expect(createStepsSince(actions, 2000)).to.deep.equal([
              new BackStep(),
              new PushStep(new Page({
                url: '/a/1',
                params: {id: '1'},
                containerName: 'Container 1A'
              }))
            ])
          })
        })
      })

      describe('with no default tab', () => {
        describe('after load', () => {
          const loadActions:Action[] = [...originalSimpleActions,
            new Load({
              url: '/e/1',
              time: 1500
            })
          ]

          describe('back, switch, push, back, switch', () => {
            it('should do back, push, push, back', () => {
              const actions:Action[] = [
                ...loadActions,
                new Back({
                  time: 3000
                }),
                new SwitchToContainer({
                  name: 'Container 2B',
                  time: 4000
                }),
                new Push({
                  url: '/f/1',
                  containerName: 'Container 2B',
                  time: 5000
                }),
                new Back({
                  time: 6000
                }),
                new SwitchToContainer({
                  name: 'Container 1B',
                  time: 7000
                }),
              ]
              expect(createStepsSince(actions, 6500)).to.deep.equal([
                new BackStep(),
                new PushStep(new Page({
                  url: '/e',
                  params: {},
                  containerName: 'Container 1B'
                })),
                new PushStep(new Page({
                  url: '/e/1',
                  params: {id: '1'},
                  containerName: 'Container 1B'
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
          const actions: Action[] = [
            ...originalNestedActions,
            new Load({
              url: '/a',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              containerName: createContainers1[0].name
            })),
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalNestedActions,
            new Load({
              url: '/b',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              containerName: 'Container 2A'
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [
            ...originalNestedActions,
            new Load({
              url: '/b/1',
              time: 1001
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              containerName: 'Container 2A'
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              containerName: 'Container 2A'
            }))
          ])
        })
      })

      describe('after switch container', () => {
        const switchActions:Action[] = [
          ...originalNestedActions,
          new Load({
            url: '/a/1',
            time: 1200
          }),
          new SwitchToContainer({
            name: 'Container 2A',
            time: 2000
          })
        ]

        it('removes forward history after going back to default tab', () => {
          const actions:Action[] = [
            ...switchActions,
            new PopState({
              n: -1,
              time: 3000
            })
          ]
          expect(createStepsSince(actions, 2000)).to.deep.equal([
            new BackStep(),
            new PushStep(new Page({
              url: '/a/1',
              params: {id: '1'},
              containerName: 'Container 1A'
            }))
          ])
        })
      })
    })

    describe('inter-container history (mobile)', () => {
      describe('after load into non-default container', () => {
        const switchActions:Action[] = [
          ...originalNestedActions,
          new Load({
            url: '/h',
            time: 1200
          })
        ]
        it('removes forward history after going back to default screen', () => {
          const actions:Action[] = [
            ...switchActions,
            new PopState({
              n: -1,
              time: 4000
            }),
          ]
          expect(createStepsSince(actions, 3500)).to.deep.equal([
            new BackStep(),
            new PushStep(new Page({
              url: '/g',
              params: {},
              containerName: 'Container 1C'
            }))
          ])
        })
      })
    })
  })
})