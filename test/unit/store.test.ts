import {createStore, Store} from '../../src/store'
import ClearActions from '../../src/store/actions/ClearActions'
import BaseAction from '../../src/model/BaseAction'
import UpdateBrowser from '../../src/model/actions/UpdateBrowser'
import {createContainers1, createGroup1} from './fixtures'
import Load from '../../src/model/actions/Load'
import Push from '../../src/model/actions/Push'
import {expect} from 'chai'
declare const describe:any
declare const it:any
declare const beforeEach:any
declare const afterEach:any

const makeNewStore = () => createStore({
  loadFromPersist: false
})

describe('store', () => {
  let store:Store

  beforeEach(() => {
    store = makeNewStore()
    dispatchAll([
      createGroup1,
      ...createContainers1,
      new Load({
        url: '/a'
      }),
      new UpdateBrowser()
    ])
  })

  afterEach(() => {
    store.dispatch(new ClearActions())
  })

  const dispatchAll = (actions: BaseAction[]) =>
      actions.forEach(store.dispatch.bind(store))

  describe('dispatch', () => {
    let originalState
    let actions

    beforeEach(() => {
      originalState = store.getRawState()
      actions = [
        new Push({
          url: '/a/2',
          container: 'Container 1A'
        }),
        new Push({
          url: '/a/3',
          container: 'Container 1A'
        }),
      ]
      dispatchAll(actions)
    })

    it('holds on to the old state', () => {
      expect(store.getState().oldState).to.deep.equal(originalState)
    })

    it('keeps new actions', () => {
      expect(store.getState().newActions).to.deep.equal(actions)
    })
  })
})