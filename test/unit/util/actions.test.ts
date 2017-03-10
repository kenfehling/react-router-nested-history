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
import SetZeroPage from '../../../src/model/actions/SetZeroPage'
import Action from '../../../src/model/BaseAction'
import {createStepsSince} from '../../../src/util/actions'
import GoStep from '../../../src/model/steps/GoStep'
import Startup from '../../../src/model/actions/Startup'
import {
  createGroup1, createContainers1, createContainers3,
  createContainers2, createGroup2, createGroup3, createSubGroup1,
  createSubGroup2, createSubGroup3
} from '../fixtures'
import {expect} from 'chai'
import VisitedPage from '../../../src/model/VistedPage'
import InitializedState from '../../../src/model/InitializedState'
declare const describe:any
declare const it:any

describe('action utils', () => {
  const zeroPage:Page = InitializedState.createZeroPage('/zero')
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
      groupName: createSubGroup1.name,
      name: 'Container 3',
      initialUrl: '/c',
      patterns: ['/c', '/c/:id'],
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
      time: 1000,
      isDefault: true
    }),
    new CreateContainer({
      groupName: createSubGroup3.name,
      name: 'Container 2',
      initialUrl: '/h',
      patterns: ['/h', '/h/:id'],
      time: 1000
    })
  ]

  describe('createStepsSinceUpdate', () => {
    describe('simple group', () => {
      describe('load', () => {
        it('default', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new LoadFromUrl({
              url: '/a',
              time: 1500
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(zeroPage),
            new PushStep(new VisitedPage({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 1500, action: LoadFromUrl}
              ]
            }))
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new LoadFromUrl({
              url: '/b',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(zeroPage),
            new PushStep(new VisitedPage({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer}
              ]
            })),
            new PushStep(new VisitedPage({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2',
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 2000, action: LoadFromUrl}
              ]
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new LoadFromUrl({
              url: '/b/1',
              time: 1001
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(zeroPage),
            new PushStep(new VisitedPage({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer}
              ]
            })),
            new PushStep(new VisitedPage({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2',
              visits: [
                {time: 1000, action: CreateContainer}
              ]
            })),
            new PushStep(new VisitedPage({
              url: '/b/1',
              params: {id: '1'},
              groupName: 'Group 1',
              containerName: 'Container 2',
              visits: [
                {time: 1500, action: LoadFromUrl}
              ]
            }))
          ])
        })
      })

      describe('after load', () => {
        const loadActions:Action[] = [
          ...originalSimpleActions,
          new LoadFromUrl({
            url: '/a/1',
            time: 1200
          })
        ]

        it('back', () => {
          const actions:Action[] = [...loadActions, new Back({
            time: 1002
          })]
          expect(createStepsSince(actions, 1000)).to.deep.equal([
            new GoStep(-1)
          ])
        })

        it('switch to container', () => {
          const actions:Action[] = [
            ...loadActions,
            new SwitchToContainer({
              groupName: 'Group 1',
              name: 'Container 2',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 1000)).to.deep.equal([
            new PushStep(new VisitedPage({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2',
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 2000, action: SwitchToContainer}
              ]
            }))
          ])
        })

        it('handles pop back', () => {
          const actions:Action[] = [...loadActions, new PopState({
            n: -1,
            time: 1002
          })]
          expect(createStepsSince(actions, 1000)).to.deep.equal([])
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
          it('should keep tab 1 forward history, but not tab 2', () => {
            const actions:Action[] = [
              ...loadActions,
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
            expect(createStepsSince(actions, 4500)).to.deep.equal([
              new PushStep(new VisitedPage({
                url: '/a/1',
                params: {id: '1'},
                groupName: 'Group 1',
                containerName: 'Container 1',
                visits: [
                  {time: 1200, action: LoadFromUrl}
                ]
              })),
              new BackStep()
            ])
          })
        })

        describe('after switch container', () => {
          const switchActions:Action[] = [
            ...loadActions,
            new SwitchToContainer({
              groupName: 'Group 1',
              name: 'Container 2',
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
              new PushStep(new VisitedPage({
                url: '/a/1',
                params: {id: '1'},
                groupName: 'Group 1',
                containerName: 'Container 1',
                visits: [
                  {time: 1200, action: LoadFromUrl}
                ]
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
              const actions:Action[] = [
                ...loadActions,
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
              expect(createStepsSince(actions, 6500)).to.deep.equal([
                new BackStep(),
                new PushStep(new VisitedPage({
                  url: '/e',
                  params: {},
                  groupName: 'Group 2',
                  containerName: 'Container 1',
                  visits: [
                    {time: 1000, action: CreateContainer}
                  ]
                })),
                new PushStep(new VisitedPage({
                  url: '/e/1',
                  params: {id: '1'},
                  groupName: 'Group 2',
                  containerName: 'Container 1',
                  visits: [
                    {time: 1500, action: LoadFromUrl}
                  ]
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
            new LoadFromUrl({
              url: '/a',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(zeroPage),
            new PushStep(new VisitedPage({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: createContainers1[0].name,
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 2000, action: LoadFromUrl}
              ]
            })),
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalNestedActions,
            new LoadFromUrl({
              url: '/b',
              time: 1200
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(zeroPage),
            new PushStep(new VisitedPage({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer}
              ]
            })),
            new PushStep(new VisitedPage({
              url: '/b',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 2',
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 1200, action: LoadFromUrl}
              ]
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [
            ...originalNestedActions,
            new LoadFromUrl({
              url: '/b/1',
              time: 1001
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(zeroPage),
            new PushStep(new VisitedPage({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer}
              ]
            })),
            new PushStep(new VisitedPage({
              url: '/b',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 2',
              visits: [
                {time: 1000, action: CreateContainer}
              ]
            })),
            new PushStep(new VisitedPage({
              url: '/b/1',
              params: {id: '1'},
              groupName: createSubGroup1.name,
              containerName: 'Container 2',
              visits: [
                {time: 1200, action: LoadFromUrl}
              ]
            }))
          ])
        })
      })

      describe('after switch container', () => {
        const switchActions:Action[] = [
          ...originalNestedActions,
          new LoadFromUrl({
            url: '/a/1',
            time: 1200
          }),
          new SwitchToContainer({
            groupName: createSubGroup1.name,
            name: 'Container 2',
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
            new PushStep(new VisitedPage({
              url: '/a/1',
              params: {id: '1'},
              groupName: createSubGroup1.name,
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 1200, action: LoadFromUrl}
              ]
            }))
          ])
        })
      })
    })

    describe('inter-container history (mobile)', () => {
      describe('after switch container', () => {
        const switchActions:Action[] = [
          ...originalNestedActions,
          new LoadFromUrl({
            url: '/g/1',
            time: 1200
          }),
          new SwitchToContainer({
            groupName: createSubGroup3.name,
            name: 'Container 2',
            time: 2000
          })
        ]

        it('removes forward history after going back to default screen', () => {
          const actions:Action[] = [
            ...switchActions,
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
          expect(createStepsSince(actions, 3500)).to.deep.equal([
            new BackStep(),
            new PushStep(new VisitedPage({
              url: '/g/1',
              params: {id: '1'},
              groupName: createSubGroup3.name,
              containerName: 'Container 1',
              visits: [
                {time: 1000, action: CreateContainer},
                {time: 1200, action: LoadFromUrl},
                {time: 5000, action: PopState}
              ]
            }))
          ])
        })
      })
    })
  })
})