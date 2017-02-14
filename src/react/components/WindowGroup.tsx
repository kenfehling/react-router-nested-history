import * as React from 'react'
import {Component, Children, ReactNode, ReactElement} from 'react'
import ContainerGroup from './ContainerGroup'
import {ContainerGroupProps} from './ContainerGroup'

interface WindowGroupState {
  activeWindowIndex: number,
  indexedStackOrder: number[]
}

function getWindowZIndex(indexedStackOrder, index) {
  if (indexedStackOrder.length > index) {
    return indexedStackOrder.length - indexedStackOrder[index] + 1
  }
  else {
    return 1
  }
}

export default class WindowGroup extends Component<ContainerGroupProps, WindowGroupState> {
  constructor(props) {
    super(props)
    this.state = {
      activeWindowIndex: 0,
      indexedStackOrder: []
    }
  }

  onContainerActivate({currentContainerIndex, indexedStackOrder}) {
    this.setState({
      activeWindowIndex: currentContainerIndex,
      indexedStackOrder
    })
    if (this.props.onContainerActivate) {
      this.props.onContainerActivate({currentContainerIndex, indexedStackOrder})
    }
  }

  render() {
    const {children, ...groupProps} = this.props
    const currentContainerIndex:number = this.props.currentContainerIndex != null ?
        this.props.currentContainerIndex : this.state.activeWindowIndex
    const {indexedStackOrder} = this.state
    return (
      <ContainerGroup
        {...groupProps}
        currentContainerIndex={currentContainerIndex || this.state.activeWindowIndex}
        onContainerActivate={this.onContainerActivate.bind(this)}
      >
        <div style={{position: 'relative'}}>
          {Children.map(children, (child:ReactElement<any>, i:number) => (
            <div key={i}
                 onClick={() => this.setState({activeWindowIndex: i})}
                 className={'rrnh-window-wrapper-' + (i + 1)}
                 style={{
                    zIndex: getWindowZIndex(indexedStackOrder, i),
                    position: 'absolute'
                 }}
            >
              {child}
            </div>
          ))}
        </div>
      </ContainerGroup>
    )
  }
}