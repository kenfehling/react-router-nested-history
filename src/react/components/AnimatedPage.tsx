import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import { TransitionMotion, spring } from 'react-motion'
import Push from '../../model/actions/Push'
import Back from '../../model/actions/Back'
import Forward from '../../model/actions/Forward'
import Top from '../../model/actions/Top'
import Action from '../../model/Action'
import PopState from '../../model/actions/PopState'
import {connect, Store} from 'react-redux'
import LocationState from '../model/LocationState'
import store from '../store'

interface AnimatedPageProps {
  children?: ReactNode
  match: any
}

type ConnectedProps = AnimatedPageProps & {
  store: Store<LocationState>
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

  getLeft(stage:LifecycleStage, action:Action):number {
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
  getLeft(stage:LifecycleStage, action:PopState):number {
    const left:number = super.getLeft(stage, action)
    return action.n > 0 ? 0 - left : left
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

const transitions:Map<string, Transition> = new Map<string, Transition>()
transitions.set(Push.type, slideLeft)
transitions.set(Forward.type, slideLeft)
transitions.set(Back.type, slideRight)
transitions.set(Top.type, slideRight)
transitions.set(PopState.type, popstate)

function getLeft(stage:LifecycleStage, action:Action):number {
  const transition:Transition|undefined = transitions.get(action.type)
  if (transition) {
    return transition.getLeft(stage, action)
  }
  else {
    return 0
  }
}

function getFn(stage:LifecycleStage, action:Action):() => Object {
  const left = getLeft(stage, action)
  return () => ({left})
}

class AnimatedPage extends Component<InnerProps, undefined> {
  static contextTypes = {
    animate: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired
  }

  render() {

    /*
     if (lastActionType === SwitchToContainer.type) {
        resetMasterScrolls()
     }
     */

    const {children, match, lastAction} = this.props
    const {animate, pathname} = this.context

    if (animate !== false) {
      const matches = match && match.url === pathname
      return (
      <div style={{position: 'relative'}}>
        <TransitionMotion
          willEnter={getFn(LifecycleStage.WILL_ENTER, lastAction)}
          willLeave={getFn(LifecycleStage.WILL_LEAVE, lastAction)}
          styles={matches ? [ {
          key: pathname,
          style: {left: spring(0)}
        } ] : []}
        >
          {interpolatedStyles => (
            <div>
              {interpolatedStyles.map(config => (
                <div
                  style={{
                    left: config.style.left + '%',
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                  }}
                >
                  {matches && children}
                </div>
              ))}
            </div>
          )}
        </TransitionMotion>
      </div>
    )

    }
    else {
      return <div>{match ? children : ''}</div>
    }
  }
}

const mapStateToProps = (state:LocationState,
                         ownProps:ConnectedProps):InnerProps => ({
  lastAction: state.lastAction,
  ...ownProps
})

const ConnectedPage = connect(mapStateToProps)(AnimatedPage)

export default class extends Component<AnimatedPageProps, undefined> {
  render() {
    return <ConnectedPage {...this.props} store={store} />
  }
}