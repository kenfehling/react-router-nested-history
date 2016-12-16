import React from 'react'
import { shallow, mount, render } from 'enzyme'
import WithContext from 'react-with-context'
import Container from '../../../src/react/components/Container'

describe('Container', () => {

  it('', () => {
    const container = (
      <WithContext context={{groupIndex: 0}}>
        <Container initialUrl="/a" pattern="/a/:id">
          <div>Content</div>
        </Container>
      </WithContext>)
    const output = mount(container)
  })
})