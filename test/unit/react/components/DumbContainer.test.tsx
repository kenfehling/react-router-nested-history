import * as React from 'react'
import {shallow, mount, render} from 'enzyme'
import DumbContainer from '../../../../src/react/components/DumbContainer'
import {getOrCreateGroup} from '../../../../src/main'
import {_resetHistory} from '../../../../src/browserFunctions'
import store from '../../../../src/store'
import {TestComponent} from '../fixtures'
import CreateGroup from '../../../../src/model/actions/CreateGroup'
import ClearActions from '../../../../src/model/actions/ClearActions'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any

describe('DumbContainer', () => {
  const groupName:string = 'Group 1'

  beforeEach(() => {
    return getOrCreateGroup(new CreateGroup({name: groupName}))
  })

  afterEach(() => {
    _resetHistory()
    return store.dispatch(new ClearActions())
  })

  describe('context', () => {

    it('provides filtered location', () => {
      const c = (
        <DumbContainer name='Container 1'
                       initialUrl='/a/3'
                       patterns={['/a/3']}
                       location='/a/1'
                       useDefaultContainer={true}
                       groupName={groupName}>
          <TestComponent />
        </DumbContainer>
      )
      const container = mount(c)

      // TypeScript definitions for Enzyme are lacking .node and .getNode()
      const myComponent:any = container.find(TestComponent)

      expect(myComponent.node.context.location).toBeDefined()
      expect(myComponent.node.context.location.pathname).toBe('/a/3')
      container.unmount()
    })
  })

})