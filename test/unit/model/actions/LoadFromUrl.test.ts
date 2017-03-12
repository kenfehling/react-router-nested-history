import * as fixtures from '../../fixtures'
import Group from '../../../../src/model/Group'
import UninitializedState from '../../../../src/model/UninitializedState'
import LoadFromUrl from '../../../../src/model/actions/LoadFromUrl'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('LoadFromUrl', () => {
  const state:UninitializedState = fixtures.simpleState

  it('loads into each group that it matches', () => {
    const action:LoadFromUrl = new LoadFromUrl({url: '/a/1', time: 2000})
    const groups:Group[] = action.reduce(state).groups
    expect(groups[0].activeContainer.activePage.url).to.equal('/a/1')
    expect(groups[1].activeContainer.activePage.url).to.equal('/e')
    expect(groups[2].activeContainer.activePage.url).to.equal('/g')
  })

})