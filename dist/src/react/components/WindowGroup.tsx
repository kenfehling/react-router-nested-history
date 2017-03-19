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

interface InnerWindowGroupProps {
  stackOrder: ComputedContainer[]
  setCurrentContainerName: (name:string) => void
}

class InnerWindowGroup extends Component<InnerWindowGroupProps, undefined> {
  static childContextTypes = {
    stackOrder: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentContainerName: PropTypes.func.isRequired
  }

  getChildContext() {
    const {stackOrder, setCurrentContainerName} = this.props
    return {
      stackOrder,
      setCurrentContainerName
    }
  }

  render() {
    return (
      <div style={{
          width: '100%',
          height: '100%',
          position: 'relative'
      }}>
        {this.props.children}
      </div>
    )
  }
}

const WindowGroup = ({children, ...groupProps}:ContainerGroupProps) => (
  <ContainerGroup {...changeDefaults(groupProps)}>
    {(props:GroupChildrenFunctionArgs) => (
      <InnerWindowGroup stackOrder={props.stackOrder}
                        setCurrentContainerName={props.setCurrentContainerName}>
        {children instanceof Function ? children(props) : children}
      </InnerWindowGroup>
    )}
  </ContainerGroup>
)

export default WindowGroup