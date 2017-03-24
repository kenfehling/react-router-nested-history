import * as React from 'react'
import {Component, PropTypes} from 'react'
import ContainerGroup from './ContainerGroup'
import {ContainerGroupProps} from './SmartContainerGroup'
import {GroupChildrenFunctionArgs} from './DumbContainerGroup'
import {ComputedContainer} from '../../model/ComputedState'

const defaultToFalse = (p:boolean|undefined):boolean => p == null ? false : p

const changeDefaults = (props:ContainerGroupProps):ContainerGroupProps => ({
  ...props,
  hideInactiveContainers: defaultToFalse(props.hideInactiveContainers)
})

interface InnerWindowGroupState {
  width: number
  height: number
}

type InnerWindowGroupProps = {
  stackOrder: ComputedContainer[]
  setCurrentContainerName: (name:string) => void
}

class InnerWindowGroup extends Component<InnerWindowGroupProps, InnerWindowGroupState> {
  static childContextTypes = {
    stackOrder: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentContainerName: PropTypes.func.isRequired,
    windowGroupWidth: PropTypes.number.isRequired,
    windowGroupHeight: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  getChildContext() {
    const {stackOrder, setCurrentContainerName} = this.props
    return {
      stackOrder,
      setCurrentContainerName,
      windowGroupWidth: this.state.width,
      windowGroupHeight: this.state.height
    }
  }

  calculateDimensions(element:HTMLElement) {
    if (element && this.state.width === 0) {
      this.setState({
        width: element.offsetWidth,
        height: element.offsetHeight
      })
    }
  }

  render() {
    return (
      <div ref={(element) => this.calculateDimensions(element)}
           style={{
            width: '100%',
            height: '100%',
            position: 'relative'
           }}
      >
        {this.props.children}
      </div>
    )
  }
}

const WindowGroup = ({children, ...groupProps}:ContainerGroupProps) => (
  <ContainerGroup {...changeDefaults(groupProps)}>
    {(props:GroupChildrenFunctionArgs) => (
      <InnerWindowGroup stackOrder={props.stackOrder}
                        setCurrentContainerName={props.setCurrentContainerName}
      >
        {children instanceof Function ? children(props) : children}
      </InnerWindowGroup>
    )}
  </ContainerGroup>
)

export default WindowGroup