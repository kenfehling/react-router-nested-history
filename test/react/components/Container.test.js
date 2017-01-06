import React, { Component, PropTypes } from 'react'
import { shallow, mount, render } from 'enzyme'
import WithContext from 'react-with-context'
import Container from '../../../src/react/components/Container'
import HistoryRouter from '../../../src/react/components/HistoryRouter'
import ContainerGroup from '../../../src/react/components/ContainerGroup'
import { CREATE_CONTAINER } from "../../../src/constants/ActionTypes"

describe('Container', () => {

  class MyComponent extends Component {
    static contextTypes = {
      activePage: PropTypes.object.isRequired,
      lastAction: PropTypes.string.isRequired
    }
    render() {
      const {activePage:{params:{id}}} = this.context
      return <div>{id}</div>
    }
  }

  it('provides activePage in context', () => {
    const container = (
      <WithContext context={{groupIndex: 0, location: {pathname: '/a/2'}}}>
        <Container initialUrl="/a/2" patterns={["/a/:id"]}>
          <MyComponent />
        </Container>
      </WithContext>)
    const myComponent = mount(container).find(MyComponent)
    expect(myComponent.node.context.activePage).toBeDefined()
    expect(myComponent.node.context.activePage.url).toBe('/a/2')
    expect(myComponent.node.context.activePage.params).toEqual({id: '2'})
  })

  it.only('provides lastAction in context', () => {
    const container = (
        <HistoryRouter>
          <ContainerGroup>
            <WithContext context={{groupIndex: 0, location: {pathname: '/a/2'}}}>
              <Container initialUrl="/a/2" patterns={["/a/:id"]}>
                <MyComponent />
              </Container>
            </WithContext>
          </ContainerGroup>
        </HistoryRouter>)
    const myComponent = mount(container).find(MyComponent)
    expect(myComponent.node.context.lastAction).toBeDefined()
    expect(myComponent.node.context.lastAction).toBe(CREATE_CONTAINER)
  })
})