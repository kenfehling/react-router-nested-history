import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {RouteTransition} from 'react-router-transition'
import Push from '../../model/actions/Push'
import Back from '../../model/actions/Back'
import Forward from '../../model/actions/Forward'
import Top from '../../model/actions/Top'
import Action from '../../model/Action'
import PopState from '../../model/actions/PopState'
import {connect} from 'react-redux'
import {Store} from '../../store'
import IUpdateData from '../../model/IUpdateData'

interface AnimatedPageProps {
  children?: ReactNode
  match: any
}

type ConnectedProps = AnimatedPageProps & {
  store: Store
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

const willEnter = (action:Action) => ({
  left: getLeft(LifecycleStage.WILL_ENTER, action)
})

const willLeave = (action:Action) => ({
  left: getLeft(LifecycleStage.WILL_LEAVE, action)
})

class AnimatedPage extends Component<InnerProps, undefined> {
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

    /*
     if (lastActionType === SwitchToContainer.type) {
        resetMasterScrolls()
     }
     */

    const {children, lastAction} = this.props
    const {animate, pathname} = this.context

    if (animate !== false) {
      return (
        <RouteTransition
          pathname={pathname}
          runOnMount={false}
          atEnter={willEnter(lastAction)}
          atLeave={willLeave(lastAction)}
          atActive={{left: 0}}
          mapStyles={styles => ({
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: styles.left + '%'
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

const mapStateToProps = (state:IUpdateData, ownProps:ConnectedProps) => ({
  lastAction: state.lastAction
})

const ConnectedPage = connect(mapStateToProps)(AnimatedPage)

export default class extends Component<AnimatedPageProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {rrnhStore} = this.context
    return <ConnectedPage {...this.props} store={rrnhStore} />
  }
}