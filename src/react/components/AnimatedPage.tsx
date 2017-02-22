import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import * as TransitionGroup from 'react-addons-transition-group'
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

interface TransPageProps {
  children?: ReactNode
}

type ConnectedProps = TransPageProps & {
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
  
  getLeftPercent(stage:LifecycleStage, action:Action):string {
    return this.getLeft(stage, action) + '%'
  }
}

class PopStateTransition extends Transition {
  getLeft(stage:LifecycleStage, action:PopState):number {
    const left:number = super.getLeft(stage, action)

    console.log(action, left)

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

class InnerTransPage extends Component<InnerProps, undefined> {
  private container: HTMLDivElement

  setLeft(stage:LifecycleStage, callback?:Function, timeout?:number) {
    const {lastAction} = this.props
    const transition:Transition|undefined = transitions.get(lastAction.type)
    if (transition) {
      this.container.style.left = transition.getLeftPercent(stage, lastAction)
      if (callback) {
        setTimeout(callback, timeout || 0)
      }
    }
    else {
      if(callback) {
        callback()
      }
    }
  }

  componentWillEnter(callback) {

    console.log('CWE')

    this.setLeft(LifecycleStage.WILL_ENTER, callback)
  }

  componentDidEnter() {
    this.setLeft(LifecycleStage.DID_ENTER)
  }

  componentWillLeave(callback) {
    this.setLeft(LifecycleStage.WILL_LEAVE, callback, 1000)
  }

  componentDidLeave() {
    this.setLeft(LifecycleStage.DID_LEAVE)
  }

  render() {
    return (
      <div ref={c => this.container = c}
           style={{
             width: '100%',
             height: '100%',
             position: 'absolute',
             transition: 'all 1s',
             left: 0
            }}
      >
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state:LocationState,
                         ownProps:ConnectedProps):InnerProps => ({
  lastAction: state.lastAction,
  ...ownProps
})

const ConnectedTransPage = connect(mapStateToProps)(InnerTransPage)

class TransPage extends Component<TransPageProps, undefined> {
  render() {
    return <ConnectedTransPage {...this.props} store={store} />
  }
}

export default class AnimatedPage extends Component<AnimatedPageProps, undefined> {
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

    const {children, match} = this.props
    const {animate, pathname} = this.context

    if (animate !== false) {
      const matches = match && match.url === pathname
      return (
      <div style={{position: 'relative'}}>
        <TransitionGroup component='div'>
          {matches && <TransPage key={pathname}>{children}</TransPage>}
        </TransitionGroup>
      </div>
    )

    }
    else {
      return <div>{match ? children : ''}</div>
    }
  }
}