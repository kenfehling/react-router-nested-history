import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {compose, getContext, renameProps, shouldUpdate} from 'recompose'
import {RouteTransition} from 'react-router-transition'
import {spring} from 'react-motion'
import Push from '../../model/actions/Push'
import Back from '../../model/actions/Back'
import Forward from '../../model/actions/Forward'
import Top from '../../model/actions/Top'
import Action from '../../model/Action'
import PopState from '../../model/actions/PopState'
import {connect} from 'react-redux'
import {Store} from '../../store'
import {Map, fromJS} from 'immutable'
import {createStructuredSelector} from 'reselect'
import {getLastAction} from '../selectors'

interface AnimatedPageProps {
  children?: ReactNode
  match: any
}

type ConnectedProps = AnimatedPageProps & {
  store: Store
  animate: boolean
  pathname: string
}

type InnerProps = ConnectedProps & {
  lastAction: Action
}

enum LifecycleStage {
  WILL_ENTER,
  DID_ENTER,
  DID_LEAVE,
  WILL_LEAVE
}

enum Side {
  LEFT = -100,
  RIGHT = 100
}

const config = {stiffness: 250, damping: 40, precision: 1};

class Transition {
  readonly willEnter: Side
  readonly didEnter: Side
  readonly didLeave: Side
  readonly willLeave: Side

  constructor({willEnter, didEnter=0, willLeave, didLeave=willLeave}:
                {willEnter:Side, didEnter?:Side,
                  willLeave:Side, didLeave?:Side}) {
    this.willEnter = willEnter
    this.didEnter = didEnter
    this.willLeave = willLeave
    this.didLeave = didLeave
  }

  getOffset(stage:LifecycleStage, action:Action):number {
    switch(stage) {
      case LifecycleStage.WILL_ENTER: return this.willEnter
      case LifecycleStage.DID_ENTER: return this.didEnter
      case LifecycleStage.WILL_LEAVE: return this.willLeave
      case LifecycleStage.DID_LEAVE: return this.didLeave
      default: throw new Error('Unknown lifecycle stage: ' + stage)
    }
  }
}

class PopStateTransition extends Transition {
  getOffset(stage:LifecycleStage, action:PopState):number {
    const offset:number = super.getOffset(stage, action)
    return action.n > 0 ? 0 - offset : offset
  }
}

const slideLeft:Transition = new Transition({
  willEnter: Side.RIGHT,
  willLeave: Side.LEFT
})

const slideRight:Transition = new Transition({
  willEnter: Side.LEFT,
  willLeave: Side.RIGHT
})

// Slide right by default, reverses if n > 0 (popped to a forward page)
const popstate:PopStateTransition = new PopStateTransition({...slideRight})

const transitions:Map<string, Transition> = fromJS({
  [Push.type]: slideLeft,
  [Forward.type]: slideLeft,
  [Back.type]: slideRight,
  [Top.type]: slideRight,
  [PopState.type]: popstate
})

function getOffset(stage:LifecycleStage, action:Action):number {
  const transition:Transition|undefined = transitions.get(action.type)
  if (transition) {
    return transition.getOffset(stage, action)
  }
  else {
    return 0
  }
}

const willEnter = (action:Action) => ({
  offset: getOffset(LifecycleStage.WILL_ENTER, action)
})

const willLeave = (action:Action) => ({
  offset: spring(getOffset(LifecycleStage.WILL_LEAVE, action), config)
})

class InnerAnimatedPage extends Component<InnerProps, undefined> {

  shouldComponentUpdate(nextProps) {
    return this.props.pathname !== nextProps.pathname
  }

  render() {
    const {children, lastAction, animate, pathname} = this.props
    if (pathname && animate !== false) {
      return (
        <RouteTransition
          pathname={pathname}
          runOnMount={false}
          atEnter={willEnter(lastAction)}
          atLeave={willLeave(lastAction)}
          atActive={{offset: spring(0, config)}}
          mapStyles={styles => ({
            willChange: 'transform',
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'translateX(' + styles.offset + '%)'
          })}
        >
          {children}
        </RouteTransition>
      )
    }
    else {
      return <div>{children}</div>
    }
  }
}

const mapStateToProps = createStructuredSelector({
  lastAction: getLastAction
})

const AnimatedPage = connect(mapStateToProps)(InnerAnimatedPage)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired,
    animate: PropTypes.bool.isRequired,
    pathname: PropTypes.string
  }),
  renameProps({
    rrnhStore: 'store'
  }),
  shouldUpdate(
    (props, nextProps) => props.pathname !== nextProps.pathname
  )
)

export default enhance(AnimatedPage)