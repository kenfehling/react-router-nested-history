import CreateContainer from '../../../../src/model/actions/CreateContainer'
import CreateGroup from '../../../../src/model/actions/CreateGroup'
import Startup from '../../../../src/model/actions/Startup'
import Push from '../../../../src/model/actions/Push'
import Action from '../../../../src/model/BaseAction'
import LoadFromUrl from '../../../../src/model/actions/LoadFromUrl'
import {expect} from 'chai'
declare const describe:any
declare const it:any

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
      url: '/a/2',
      groupName: 'Group 1',
      containerName: 'Container 1'
    })
  ]

  it('simply updates the old actions if from a browser refresh', () => {
    const action:Startup = new Startup({fromRefresh: true})
    const actions:Action[] = action.store(originalActions)
    expect(actions.length).to.equal(originalActions.length)
  })
})