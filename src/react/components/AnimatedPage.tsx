import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {RouteTransition} from 'react-router-transition'
import Push from '../../model/actions/Push'
import Back from '../../model/actions/Back'
import Forward from '../../model/actions/Forward'
import Top from '../../model/actions/Top'
import Action from '../../model/BaseAction'
import PopState from '../../model/actions/PopState'
import {connect} from 'react-redux'
import {Store} from '../../store/store'
import State from '../../model/State'
import ComputedState from '../../model/ComputedState'
import UpdateBrowser from '../../model/actions/UpdateBrowser'
import * as R from 'ramda'
import {Map, fromJS} from 'immutable'

interface AnimatedPageProps {
  children?: ReactNode
  match: any
}

type ConnectedProps = AnimatedPageProps & {
  store: Store<State, Action, ComputedState>
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

const willEnter = (action:Action):Object => ({
  offset: getOffset(LifecycleStage.WILL_ENTER, action)
})

const willLeave = (action:Action):Object => ({
  offset: getOffset(LifecycleStage.WILL_LEAVE, action)
})

const getWidth = (offset:number, match:boolean):number => {
  if (offset === 0) {
    return match ? 100 : 0
  }
  else {
    return 100
  }
}

class InnerAnimatedPage extends Component<InnerProps, undefined> {
  static contextTypes = {
    animate: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired
  }

  shouldComponentUpdate(nextProps) {
    const {match} = this.props
    const nextMatch = nextProps.match
    return !(!match && !nextMatch) &&
      (!match || !nextMatch || match.url !== nextMatch.url)
  }

  render() {
    const {children, lastAction, match} = this.props
    const {animate, pathname} = this.context

    if (animate !== false) {
      return (
        <RouteTransition
          pathname={pathname}
          runOnMount={false}
          atEnter={willEnter(lastAction)}
          atLeave={willLeave(lastAction)}
          atActive={{offset: 0}}
          style={{
            width: '50%',
            height: '100%'
          }}
          mapStyles={styles => ({
              willChange: 'transform',
              position: 'absolute',
              width: '50%',
              height: '100%',
              left: 0,
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

const mapStateToProps = (state:ComputedState, ownProps:ConnectedProps) => ({
  lastAction: R.last(state.actions.filter(a => !(a instanceof UpdateBrowser)))
})

const ConnectedPage = connect(mapStateToProps)(InnerAnimatedPage)

export default class AnimatedPage extends Component<AnimatedPageProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {rrnhStore} = this.context
    return <ConnectedPage {...this.props} store={rrnhStore} />
  }
}