// @flow
/* globals describe, it, expect, beforeEach */
declare var describe:any
declare var it:any
declare var expect:any
declare var beforeEach:any
import React, { Component, PropTypes } from 'react'
import { shallow, mount, render } from 'enzyme'
import ContainerGroup from '../../../src/react/components/ContainerGroup'
import Container from '../../../src/react/components/Container'
import HistoryRouter from '../../../src/react/components/HistoryRouter'
import { getDerivedState, getActions } from "../../../src/main"
import {_resetHistory} from "../../../src/browserFunctions"

describe('Container', () => {

  beforeEach(() => {
    _resetHistory()
  })

  it('initializes even inside a loop', () => {
    const group = (
      <HistoryRouter>
        <ContainerGroup>
        {['a', 'b', 'c'].map(x => (
          <Container key={x} initialUrl={'/' + x} pattern={'/' + x}>
            <div></div>
          </Container>))}
        </ContainerGroup>
      </HistoryRouter>
    )
    mount(group)
    expect(getDerivedState().groups[0].containers.length).toBe(3)
  })

})