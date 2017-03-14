import * as React from 'react'
import {Component, Children, PropTypes, cloneElement, ReactElement} from 'react'
import ContainerGroup from './ContainerGroup'
import {ContainerGroupProps} from './SmartContainerGroup'
import {ChildrenFunctionArgs} from './DumbContainerGroup'
import IContainer from '../../model/IContainer'

const defaultToFalse = (p:boolean|undefined):boolean => p == null ? false : p

const changeDefaults = (props:ContainerGroupProps):ContainerGroupProps => ({
  ...props,
  hideInactiveContainers: defaultToFalse(props.hideInactiveContainers)
})

interface InnerWindowGroupProps {
  stackOrder: IContainer[]|null
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
    {(props:ChildrenFunctionArgs) => (
      <InnerWindowGroup stackOrder={props.stackOrder}
                        setCurrentContainerName={props.setCurrentContainerName}>
        {children instanceof Function ? children(props) : children}
      </InnerWindowGroup>
    )}
  </ContainerGroup>
)

export default WindowGroup