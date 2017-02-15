import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import WindowGroup from '../../../../src/react/components/WindowGroup'
import Window from '../../../../src/react/components/Window'
import Container from '../../../../src/react/components/Container'
import store from '../../../../src/store'
import {_resetHistory} from '../../../../src/browserFunctions'
import ClearActions from '../../../../src/model/actions/ClearActions'
import SetZeroPage from '../../../../src/model/actions/SetZeroPage'
import {getActiveUrlInGroup} from '../../../../src/main'

declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any
declare const afterEach:any
declare const jest:any
declare const Promise:any

describe('WindowGroup', () => {
  const groupName:string = 'Group 1'

  afterEach(async () => {
    _resetHistory()
    await store.dispatch(new SetZeroPage({url: null}))
    await store.dispatch(new ClearActions())
  })

  interface AppState {
    currentContainerIndex: number
  }

  describe('currentContainerIndex', () => {
    it('can be set by user', () => {

      const App = () => (
        <WindowGroup name={groupName}
                     children={({setCurrentContainerIndex}) => (
            <div>
              <Window>
                <Container name='Container 1'
                           initialUrl='/a/1'
                           patterns={['/a/:id']}>

                </Container>
              </Window>
              <Window>
                <Container name='Container 2'
                           initialUrl='/b/1'
                           patterns={['/b/:id']}>
                 <button onClick={() => setCurrentContainerIndex(1)}>
                  Switch
                </button>
                </Container>
              </Window>
            </div>
        )} />
      )
      const app = mount(<App />)



      //console.log(app.find('Window'))

      //app.find('button').simulate('click')

      console.log(store.getState())

      expect(getActiveUrlInGroup(groupName)).toEqual('/b/1')
      app.unmount()
    })
  })
})