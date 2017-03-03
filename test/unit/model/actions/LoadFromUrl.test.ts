import * as fixtures from '../../fixtures'
import Group from '../../../../src/model/Group'
import UninitializedState from '../../../../src/model/UninitializedState'
import LoadFromUrl from '../../../../src/model/actions/LoadFromUrl'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('LoadFromUrl', () => {
  const state:UninitializedState = fixtures.simpleState

  it('loads into each group that it matches', () => {
    const action:LoadFromUrl = new LoadFromUrl({url: '/a/1', time: 2000})
    const groups:Group[] = action.reduce(state).groups
    expect(groups[0].activeContainer.activePage.url).toBe('/a/1')
    expect(groups[1].activeContainer.activePage.url).toBe('/e')
    expect(groups[2].activeContainer.activePage.url).toBe('/a/1')
  })

})