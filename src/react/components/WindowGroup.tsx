import * as React from 'react'
import {Component, PropTypes} from 'react'
import ContainerGroup from './ContainerGroup'
import {
  ContainerGroupPropsWithoutChildren, ContainerGroupProps
} from './SmartContainerGroup'
import {GroupChildrenFunctionArgs} from './DumbContainerGroup'
import ComputedState from '../../model/ComputedState'
import ReactNode = React.ReactNode
import ReactElement = React.ReactElement
import {connect, Dispatch} from 'react-redux'
import {Store} from '../../store/store'
import State from '../../model/State'
import Action from '../../store/Action'
import {resetWindowPositions} from '../../actions/WindowActions'
import {getDispatch, createCachingSelector} from '../selectors'

const defaultToFalse = (p:boolean|undefined):boolean => p == null ? false : p

const changeDefaults = (props:ContainerGroupProps):ContainerGroupProps => ({
  ...props,
  hideInactiveContainers: defaultToFalse(props.hideInactiveContainers)
})

type WindowGroupChildrenFunctionArgs = GroupChildrenFunctionArgs & {
  resetWindowPositions: () => void
}

type ChildrenType =
  ReactNode | ((args:WindowGroupChildrenFunctionArgs) => ReactElement<any>)

type WindowGroupProps = ContainerGroupPropsWithoutChildren & {
  children: ChildrenType
}

type WindowGroupPropsWithStore = WindowGroupProps & {
  store: Store<State, Action, ComputedState>
}

type ConnectedWindowGroupProps = WindowGroupPropsWithStore & {
  resetWindowPositions: () => void
}

interface InnerWindowGroupState {
  width: number
  height: number
}

type InnerWindowGroupProps = {
  setCurrentContainerName: (name:string) => void
}

class InnerInnerWindowGroup extends Component<InnerWindowGroupProps, InnerWindowGroupState> {
  static childContextTypes = {
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
    const {setCurrentContainerName} = this.props
    return {
      setCurrentContainerName,
      windowGroupWidth: this.state.width,
      windowGroupHeight: this.state.height
    }
  }

  calculateDimensions(element:HTMLElement) {
    if (element && this.state.width === 0) {
      this.setState({
        width: element.offsetWidth || window.innerWidth,
        height: element.offsetHeight || window.innerHeight
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

const InnerWindowGroup = ({children, resetWindowPositions,
                           ...groupProps}:ConnectedWindowGroupProps) => (
  <ContainerGroup {...changeDefaults(groupProps)}>
    {(props:GroupChildrenFunctionArgs) => (
      <InnerInnerWindowGroup setCurrentContainerName={props.setCurrentContainerName}>
        {
          children instanceof Function ?
              children({...props, resetWindowPositions}) :
              children
        }
      </InnerInnerWindowGroup>
    )}
  </ContainerGroup>
)

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
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
    return (
      <ConnectedWindowGroup store={rrnhStore} {...this.props} />
    )
  }
}