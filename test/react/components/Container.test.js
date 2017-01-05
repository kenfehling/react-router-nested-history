import React, {Component, PropTypes} from 'react'
import { shallow, mount, render } from 'enzyme'
import WithContext from 'react-with-context'
import Container from '../../../src/react/components/Container'

describe('Container', () => {

  class MyComponent extends Component {
    static contextTypes = {
      activePage: PropTypes.object.isRequired
    }
    render() {
      const {activePage:{params:{id}}} = this.context
      return <div>{id}</div>
    }
  }

  it('provides activePage in context', () => {
    const container = (
      <WithContext context={{groupIndex: 0, location: {pathname: '/a/2'}}}>
        <Container initialUrl="/a/2" pattern="/a/:id">
          <MyComponent />
        </Container>
      </WithContext>)
    const myComponent = mount(container).find(MyComponent)
    expect(myComponent.node.context.activePage).toBeDefined()
    expect(myComponent.node.context.activePage.url).toBe('/a/2')
    expect(myComponent.node.context.activePage.params).toEqual({id: '2'})
  })
})