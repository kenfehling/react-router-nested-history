import * as React from 'react'
import {Component, PropTypes} from 'react'
import ContainerGroup from './ContainerGroup'
import {
  ContainerGroupProps, BaseGroupPropsWithoutChildren
} from './SmartContainerGroup'
import {GroupChildrenFunctionArgs} from './DumbContainerGroup'
import ReactNode = React.ReactNode
import ReactElement = React.ReactElement
import {connect} from 'react-redux'
import {Store} from '../../store'
import {resetWindowPositions} from '../../actions/WindowActions'
import {getDispatch, createCachingSelector, getGroupName} from '../selectors'
import OpenWindow from '../../model/actions/OpenWindow'

const defaultToFalse = (p:boolean|undefined):boolean => p == null ? false : p

const changeDefaults = (props:ContainerGroupProps):ContainerGroupProps => ({
  ...props,
  hideInactiveContainers: defaultToFalse(props.hideInactiveContainers)
})

type OpenWindowParams = {index:number} | {name:string}

type WindowGroupChildrenFunctionArgs = GroupChildrenFunctionArgs & {
  openWindow: (params:OpenWindowParams) => void
  resetWindowPositions: () => void
}

type ChildrenType =
  ReactNode | ((args:WindowGroupChildrenFunctionArgs) => ReactElement<any>)

type BaseWindowGroupProps = BaseGroupPropsWithoutChildren & {
  children: ChildrenType
}

type WindowGroupProps = BaseWindowGroupProps & {
  name: string
}

type WindowGroupPropsWithStore = BaseWindowGroupProps & {
  store: Store
  groupName: string
}

type ConnectedWindowGroupProps = WindowGroupPropsWithStore &
                                 WindowGroupChildrenFunctionArgs

interface InnerWindowGroupState {
  width: number
  height: number
}

class InnerInnerWindowGroup extends Component<undefined, InnerWindowGroupState> {
  static childContextTypes = {
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
    return {
      windowGroupWidth: this.state.width,
      windowGroupHeight: this.state.height
    }
  }

  calculateDimensions(element:HTMLElement) {
    if (element) {
      const width = element.offsetWidth // || window.innerWidth
      const height = element.offsetHeight // || window.innerHeight
      if (width > this.state.width || height > this.state.height) {
        this.setState({width, height})
      }
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

const InnerWindowGroup = ({children, openWindow, resetWindowPositions, groupName,
                           ...groupProps}:ConnectedWindowGroupProps) => (
  <ContainerGroup {...changeDefaults({...groupProps, name: groupName})}>
    {(props:GroupChildrenFunctionArgs) => (
      <InnerInnerWindowGroup>
        {
          children instanceof Function ?
              children({...props, openWindow, resetWindowPositions}) :
              children
        }
      </InnerInnerWindowGroup>
    )}
  </ContainerGroup>
)

const makeGetActions = () => createCachingSelector(
  getDispatch, getGroupName,
  (dispatch, groupName) => ({
    openWindow: (params:OpenWindowParams) => dispatch(new OpenWindow({
      ...params,
      groupName
    })),
    resetWindowPositions: () => dispatch(resetWindowPositions())
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowGroupPropsWithStore):ConnectedWindowGroupProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedWindowGroup = connect(
  () => ({}),
  makeGetActions,
  mergeProps
)(InnerWindowGroup)

export default class WindowGroup extends Component<WindowGroupProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {rrnhStore} = this.context
    const {name, ...props} = this.props
    return (
      <ConnectedWindowGroup store={rrnhStore}
                            groupName={name}
                            {...props} />
    )
  }
}