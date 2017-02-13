import CreateContainer from '../../../../src/model/actions/CreateContainer'
import CreateGroup from '../../../../src/model/actions/CreateGroup'
import Startup from '../../../../src/model/actions/Startup'
import Push from '../../../../src/model/actions/Push'
import Page from '../../../../src/model/Page'
import ReduxState from '../../../../src/model/interfaces/ReduxState'
import Action from '../../../../src/model/Action'
import {serialize, deserialize} from '../../../../src/util/serializer'
import LoadFromUrl from '../../../../src/model/actions/LoadFromUrl'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('Startup action', () => {
  const now:number = new Date().getTime()
  const originalActions:Action[] = [
    new Startup(),
    new CreateGroup({
      name: 'Group 1'
    }),
    new CreateContainer({
      groupName: 'Group 1',
      name: 'Container 1',
      initialUrl: '/a',
      patterns: ['/a', '/a/:id'],
      time: now
    }),
    new LoadFromUrl({
      url: '/a/1'
    }),
    new Push({
      page: new Page({
        url: '/a/2',
        params: {id: '2'},
        groupName: 'Group 1',
        containerName: 'Container 1'
      })
    })
  ]

  it('cleans all original actions if not from browser refresh', () => {
    const action:Startup = new Startup({fromRefresh: false})
    const reduxState:ReduxState = {actions: originalActions.map(a => serialize(a))}
    const actions:Action[] = action.store(reduxState).actions.map(a => deserialize(a))
    expect(actions.length).toEqual(1)
  })

  it('simply updates the old actions if from a browser refresh', () => {
    const action:Startup = new Startup({fromRefresh: true})
    const reduxState:ReduxState = {actions: originalActions.map(a => serialize(a))}
    const actions:Action[] = action.store(reduxState).actions.map(a => deserialize(a))
    expect(actions.length).toEqual(originalActions.length)
  })
})