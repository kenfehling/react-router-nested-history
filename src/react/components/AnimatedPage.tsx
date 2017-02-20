import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import * as TransitionGroup from 'react-addons-transition-group'
import {getActivePageInContainer, isInitialized, getLastAction} from '../../main'
import Page from '../../model/Page'
import Push from '../../model/actions/Push'
import Back from '../../model/actions/Back'
import Forward from '../../model/actions/Forward'
import Top from '../../model/actions/Top'
import Action from '../../model/Action'
import PopState from '../../model/actions/PopState'

interface TransPageProps {
  children?: ReactNode
}

interface AnimatedPageProps {
  children?: ReactNode
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
    return action.n < 0 ? left : 0 - left
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

class TransPage extends Component<TransPageProps, undefined> {
  private container: HTMLDivElement

  setLeft(stage:LifecycleStage, callback?:Function, timeout?:number) {
    const action:Action = getLastAction()
    const transition:Transition|undefined = transitions.get(action.type)
    if (transition) {

      console.log(action.type)

      this.container.style.left = transition.getLeftPercent(stage, action)
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

export default class AnimatedPage extends Component<AnimatedPageProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
  }

  render() {

    //this.prevAction = lastActionType
    /*
     if (lastActionType === SwitchToContainer.type) {
     resetMasterScrolls()
     }
     */
    //const timeout = SwitchToContainer.type === 'switch-to-container' ? 1 : 1000

    const {children} = this.props
    const {groupName, containerName} = this.context
    if (groupName && containerName) {
      const activePage:Page|null = isInitialized() ?
        getActivePageInContainer(groupName, containerName) : null

      return (
        <div style={{position: 'relative'}}>
          <TransitionGroup component='div'>
            {activePage &&
              <TransPage key={activePage.url}>{children}</TransPage>
            }
          </TransitionGroup>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}