import * as React from 'react'
import {Component, PropTypes} from 'react'

interface TestComponentProps { }

export class TestComponent extends Component<TestComponentProps, void> {
  static contextTypes = {
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    groupName: PropTypes.string,
    containerName: PropTypes.string,
    useDefaultContainer: PropTypes.bool,
    activePage: PropTypes.object,
    lastAction: PropTypes.object
  }
  render() {
    return <div>Test</div>
  }
}