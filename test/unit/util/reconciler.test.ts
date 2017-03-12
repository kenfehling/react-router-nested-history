import CreateContainer from '../../../src/model/actions/CreateContainer'
import Push from '../../../src/model/actions/Push'
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
import {
  createStepsSince, diffToSteps, HistoryDiff, diffHistory
} from '../../../src/util/reconciler'
import GoStep from '../../../src/model/steps/GoStep'
import {
  createGroup1, createContainers1, createContainers3, createContainers2,
  createGroup2, createGroup3, createSubGroup1, createSubGroup2, createSubGroup3
} from '../fixtures'
import {expect} from 'chai'
import VisitedPage from '../../../src/model/VistedPage'
import State from '../../../src/model/State'
import {VisitType} from '../../../src/model/PageVisit'
import Pages from '../../../src/model/Pages'
import Page from '../../../src/model/Page'
declare const describe:any
declare const it:any

describe('action utils', () => {
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

  describe('fundamental tests', () => {
    const a:VisitedPage = new VisitedPage({
      url: '/a',
      params: {},
      groupName: 'Group 1',
      containerName: 'Container 1A',
      visits: [
        {time: 1000, type: VisitType.AUTO},
        {time: 1001, type: VisitType.MANUAL},
        {time: 4000, type: VisitType.MANUAL},
        {time: 6000, type: VisitType.MANUAL}
      ]
    })
    const a1:VisitedPage = new VisitedPage({
      url: '/a/1',
      params: {id: '1'},
      groupName: 'Group 1',
      containerName: 'Container 1A',
      visits: [
        {time: 2000, type: VisitType.MANUAL}
      ]
    })
    const a2:VisitedPage = new VisitedPage({
      url: '/a/2',
      params: {id: '2'},
      groupName: 'Group 1',
      containerName: 'Container 1A',
      visits: [
        {time: 3000, type: VisitType.MANUAL}
      ]
    })
    const b:VisitedPage = new VisitedPage({
      url: '/b',
      params: {},
      groupName: 'Group 1',
      containerName: 'Container 2A',
      visits: [
        {time: 1000, type: VisitType.AUTO},
        {time: 5000, type: VisitType.MANUAL}
      ]
    })
    const c:VisitedPage = new VisitedPage({
      url: '/c',
      params: {},
      groupName: 'Group 1',
      containerName: 'Container 2A',
      visits: [
        {time: 1000, type: VisitType.AUTO},
        {time: 7000, type: VisitType.MANUAL}
      ]
    })

    describe('diffHistory', () => {
      it('returns all same if histories are identical', () => {
        const ps1:Pages = new Pages([zero, a, b])
        expect(diffHistory(ps1, ps1)).to.deep.equal(new HistoryDiff({
          same: [new Page(zero), new Page(a), new Page(b)],
          oldCurrentIndex: 1,
          newCurrentIndex: 1
        }))
      })

      it('returns an added item', () => {
        const ps1:Pages = new Pages([zero, a])
        const ps2:Pages = new Pages([zero, a, c])
        expect(diffHistory(ps1, ps2)).to.deep.equal(new HistoryDiff({
          same: [new Page(zero), new Page(a)],
          added: [new Page(c)],
          oldCurrentIndex: 1,
          newCurrentIndex: 2
        }))
      })

      it('returns adds for h2 if h1 is blank', () => {
        const ps1:Pages = new Pages()
        const ps2:Pages = new Pages([zero, a])
        expect(diffHistory(ps1, ps2)).to.deep.equal(new HistoryDiff({
          added: [new Page(zero), new Page(a)],
          oldCurrentIndex: -1,
          newCurrentIndex: 1
        }))
      })

      it('removes forward history', () => {
        const ps1:Pages = new Pages([zero, a, a1, b])
        const ps2:Pages = new Pages([zero, a, a1])
        expect(diffHistory(ps1, ps2)).to.deep.equal(new HistoryDiff({
          same: [new Page(zero), new Page(a), new Page(a1)],
          removed: [new Page(b)],
          oldCurrentIndex: 1,
          newCurrentIndex: 1
        }))
      })
    })

    describe('diffToSteps', () => {
      it('removes forward history', () => {
        const diff:HistoryDiff = new HistoryDiff({
          same: [zero, a, a1],
          removed: [b],
          oldCurrentIndex: 2,
          newCurrentIndex: 2
        })
        expect(diffToSteps(diff)).to.deep.equal([
          new BackStep(),
          new PushStep(a1)
        ])
      })

      it('keeps default container as a back page', () => {
        const diff:HistoryDiff = new HistoryDiff({
          same: [zero, a],
          removed: [a1],
          added: [b],
          oldCurrentIndex: 1,
          newCurrentIndex: 2
        })
        expect(diffToSteps(diff)).to.deep.equal([
          new PushStep(b)
        ])
      })

      it('does a PUSH after a TOP', () => {
        const diff:HistoryDiff = new HistoryDiff({
          same: [zero, a],
          removed: [a1, a2],
          added: [b],
          oldCurrentIndex: 1,
          newCurrentIndex: 2
        })
        expect(diffToSteps(diff)).to.deep.equal([
          new PushStep(b)
        ])
      })
    })
  })

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
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1A'
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
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2A'
            }))
          ])
        })

        it('non-default 2', () => {
          const actions: Action[] = [
            ...originalSimpleActions,
            new LoadFromUrl({
              url: '/b/1',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: 'Group 1',
              containerName: 'Container 2A'
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              groupName: 'Group 1',
              containerName: 'Container 2A'
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
          const actions:Action[] = [...loadActions, new Back({time: 5000})]
          expect(createStepsSince(actions, 4000)).to.deep.equal([
            new GoStep(-1)
          ])
        })

        it('switch to container', () => {
          const actions:Action[] = [
            ...loadActions,
            new SwitchToContainer({
              groupName: 'Group 1',
              name: 'Container 2A',
              time: 5000
            })
          ]
          expect(createStepsSince(actions, 4000)).to.deep.equal([
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: 'Group 1',
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
          it('should keep tab 1 forward history, but not tab 2', () => {
            const actions:Action[] = [
              ...loadActions,
              new Back({
                time: 3000
              }),
              new SwitchToContainer({
                groupName: 'Group 1',
                name: 'Container 2A',
                time: 4000
              }),
              new PopState({
                n: -1,
                time: 5000
              })
            ]
            expect(createStepsSince(actions, 4500)).to.deep.equal([
              new PushStep(new Page({
                url: '/a/1',
                params: {id: '1'},
                groupName: 'Group 1',
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
              groupName: 'Group 1',
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
                groupName: 'Group 1',
                containerName: 'Container 1A'
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
                  name: 'Container 2B',
                  time: 4000
                }),
                new Push({
                  url: '/f/1',
                  groupName: 'Group 2',
                  containerName: 'Container 2B',
                  time: 5000
                }),
                new Back({
                  time: 6000
                }),
                new SwitchToContainer({
                  groupName: 'Group 2',
                  name: 'Container 1B',
                  time: 7000
                }),
              ]
              expect(createStepsSince(actions, 6500)).to.deep.equal([
                new BackStep(),
                new PushStep(new Page({
                  url: '/e',
                  params: {},
                  groupName: 'Group 2',
                  containerName: 'Container 1B'
                })),
                new PushStep(new Page({
                  url: '/e/1',
                  params: {id: '1'},
                  groupName: 'Group 2',
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
            new LoadFromUrl({
              url: '/a',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: createContainers1[0].name
            })),
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalNestedActions,
            new LoadFromUrl({
              url: '/b',
              time: 2000
            })
          ]
          expect(createStepsSince(actions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 2A'
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
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              groupName: createSubGroup1.name,
              containerName: 'Container 2A'
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              groupName: createSubGroup1.name,
              containerName: 'Container 2A'
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
              groupName: createSubGroup1.name,
              containerName: 'Container 1A'
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
            name: 'Container 2C',
            time: 2000
          })
        ]

        it('removes forward history after going back to default screen', () => {
          const actions:Action[] = [
            ...switchActions,
            new Push({
              groupName: createSubGroup3.name,
              containerName: 'Container 2C',
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
            new PushStep(new Page({
              url: '/g/1',
              params: {id: '1'},
              groupName: createSubGroup3.name,
              containerName: 'Container 1C'
            }))
          ])
        })
      })
    })
  })
})