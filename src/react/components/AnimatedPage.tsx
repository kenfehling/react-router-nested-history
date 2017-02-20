import * as React from 'react'
import {Component, Children, PropTypes, ReactNode} from 'react'
import {findDOMNode} from 'react-dom'
import * as TransitionGroup from 'react-addons-transition-group'
import {
  getActivePageInContainer, isInitialized,
  getLastActionType
} from '../../main'
import Page from '../../model/Page'

interface TransPageProps {
  children?: ReactNode,
  lastActionType: string
}

interface AnimatedPageProps {
  children?: ReactNode
}

class TransPage extends Component<TransPageProps, undefined> {
  private container: HTMLDivElement

  componentWillEnter(callback) {
    this.container.style.left = '100%'
    setTimeout(callback, 1);
  }

  componentDidEnter() {
    this.container.style.left = '0'
  }

  componentWillLeave(callback) {
    this.container.style.left = '-100%'
    setTimeout(callback, 1000);
  }

  componentDidLeave() {
    this.container.style.left = '-100%'
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 1s',
        left: 0
      }}
           ref={c => this.container = c}>
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
      const lastActionType:string = getLastActionType()

      return (
        <div style={{
               position: 'relative'
             }}>
          <TransitionGroup component='div'>
            {activePage ?
              <TransPage lastActionType={lastActionType} key={activePage.url}>
                {children}
              </TransPage> : <div></div>}
          </TransitionGroup>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}