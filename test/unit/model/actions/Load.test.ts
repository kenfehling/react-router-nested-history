import * as fixtures from '../../fixtures'
import State from '../../../../src/model/State'
import Load from '../../../../src/model/actions/Load'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('Load', () => {
  const state:State = fixtures.simpleState

  it('loads into each group that it matches', () => {
    const action:Load = new Load({url: '/a/1', time: 2000})
    const s = action.reduce(state)
    expect(s.getContainerActivePage('Group 1').url).to.equal('/a/1')
    expect(s.getContainerActivePage('Group 2').url).to.equal('/e')
    expect(s.getContainerActivePage('Group 3').url).to.equal('/g')
  })

})