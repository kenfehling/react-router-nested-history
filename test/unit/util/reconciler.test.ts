import Push from '../../../src/model/actions/Push'
import PopState from '../../../src/model/actions/PopState'
import Load from '../../../src/model/actions/Load'
import ReplaceStep from '../../../src/model/steps/ReplaceStep'
import PushStep from '../../../src/model/steps/PushStep'
import SwitchToContainer from '../../../src/model/actions/SwitchToContainer'
import Back from '../../../src/model/actions/Back'
import BackStep from '../../../src/model/steps/BackStep'
import Forward from '../../../src/model/actions/Forward'
import Action from '../../../src/model/BaseAction'
import GoStep from '../../../src/model/steps/GoStep'
import {
  createContainers1, createSubGroup1, createSubGroup3, originalSimpleActions,
  zero, originalSimpleActionsWithoutLoad, originalNestedActionsWithoutLoad,
  originalNestedActions
} from '../fixtures'
import {expect} from 'chai'
import State from '../../../src/model/State'
import Page from '../../../src/model/Page'
import {createSteps} from '../../../src/util/reconciler'
import {deriveState} from '../../../src/store/store'
declare const describe:any
declare const it:any

describe('reconciler', () => {
  describe('createSteps', () => {
    const createStepsSince = (actions, time) => {
      const oldActions:Action[] = actions.filter(a => a.time <= time)
      const newActions:Action[] = actions.filter(a => a.time > time)
      const oldState:State = deriveState(oldActions, new State())
      return createSteps(oldState, newActions)
    }

    describe('simple group', () => {
      describe('load', () => {
        it('default', () => {
          expect(createStepsSince(originalSimpleActions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              group: 'Group 1',
              container: 'Container 1A'
            }))
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalSimpleActionsWithoutLoad,
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
              group: 'Group 1',
              container: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              group: 'Group 1',
              container: 'Container 2A'
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
              group: 'Group 1',
              container: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              group: 'Group 1',
              container: 'Container 2A'
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              group: 'Group 1',
              container: 'Container 2A'
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
              group: 'Group 1',
              container: 'Container 2A'
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
                group: 'Group 1',
                container: 'Container 1A'
              })),
              new BackStep()
            ])
          })

          it('should keep tab 1 forward history, but not tab 2', () => {
            const actions:Action[] = [
              ...backSwitchActions,
              new Push({
                container: 'Container 2A',
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
                group: 'Group 1',
                container: 'Container 1A'
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
                group: 'Group 1',
                container: 'Container 1A'
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
                  container: 'Container 2B',
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
                  group: 'Group 2',
                  container: 'Container 1B'
                })),
                new PushStep(new Page({
                  url: '/e/1',
                  params: {id: '1'},
                  group: 'Group 2',
                  container: 'Container 1B'
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
          expect(createStepsSince(originalNestedActions, 0)).to.deep.equal([
            new ReplaceStep(new Page(zero)),
            new PushStep(new Page({
              url: '/a',
              params: {},
              group: createSubGroup1.name,
              container: createContainers1[0].name
            })),
          ])
        })

        it('non-default', () => {
          const actions: Action[] = [
            ...originalNestedActionsWithoutLoad,
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
              group: createSubGroup1.name,
              container: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              group: createSubGroup1.name,
              container: 'Container 2A'
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
              group: createSubGroup1.name,
              container: 'Container 1A'
            })),
            new PushStep(new Page({
              url: '/b',
              params: {},
              group: createSubGroup1.name,
              container: 'Container 2A'
            })),
            new PushStep(new Page({
              url: '/b/1',
              params: {id: '1'},
              group: createSubGroup1.name,
              container: 'Container 2A'
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
              group: createSubGroup1.name,
              container: 'Container 1A'
            }))
          ])
        })
      })
    })

    describe('inter-container history (mobile)', () => {
      describe('after load into non-default container', () => {
        const switchActions:Action[] = [
          ...originalNestedActionsWithoutLoad,
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
              group: createSubGroup3.name,
              container: 'Container 1C'
            }))
          ])
        })
      })
    })
  })
})