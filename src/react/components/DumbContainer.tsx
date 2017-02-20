import * as React from 'react'
import {Component, Children, PropTypes, ReactNode} from 'react'
import {findDOMNode} from 'react-dom'
import {
  getActiveUrlInGroup, urlMatchesGroup, switchToGroup,
  isInitialized
} from '../../main'
import { patternsMatch } from '../../util/url'
import {Location} from 'history'
import {stringToLocation, locationToString} from '../../util/location'
import * as TransitionGroup from 'react-addons-transition-group'
import Page from '../../model/Page'
import SwitchToContainer from '../../model/actions/SwitchToContainer'

const getContainerKey = (groupName, name) => groupName + '_' + name

interface AnimatedPageProps {
  children?: ReactNode,
  lastActionType: string
}

class AnimatedPage extends Component<AnimatedPageProps, undefined> {
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
        position: 'absolute',
        transition: 'all 1s',
      }}
           ref={c => this.container = c}>
        {this.props.children}
      </div>
    )
  }
}

export interface DumbContainerProps {
  location: string | Location
  children?: ReactNode
  name: string
  initialUrl: string
  patterns: string[]
  style?: any

  groupName: string
  useDefaultContainer?: boolean
  hideInactiveContainers?: boolean

  activePage: Page|null
  lastActionType: string
}

export default class DumbContainer extends Component<DumbContainerProps, undefined> {
  private static locations = {}  // Stays stored even if Container is unmounted
  private prevAction:string

  static childContextTypes = {
    containerName: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    patterns: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  getChildContext() {
    return {
      containerName: this.props.name,
      location: this.getFilteredLocation(),
      patterns: this.props.patterns
    }
  }

  getCurrentUrl():string {
    const {location} = this.props
    return locationToString(location)
  }

  matchesCurrentUrl():boolean {
    const {patterns} = this.props
    const url:string = this.getCurrentUrl()
    return patternsMatch(patterns, url)
  }

  matchesLocation({groupName, patterns}):boolean {
    if (isInitialized()) {
      const currentUrl:string = this.getCurrentUrl()
      const activeGroupUrl:string = getActiveUrlInGroup(groupName)
      const isActiveInGroup:boolean = patternsMatch(patterns, activeGroupUrl)
      const isGroupActive:boolean = urlMatchesGroup(currentUrl, groupName)
      if (isActiveInGroup) {
        if (isGroupActive) {
          return currentUrl === activeGroupUrl
        }
        else {
          return true
        }
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  getKey():string {
    const {name, groupName} = this.props
    return getContainerKey(groupName, name)
  }

  getNewLocation():Location {
    const {initialUrl, location} = this.props
    const key = this.getKey()
    if (location) {
      if (this.matchesCurrentUrl()) {        // If url matches container
        return stringToLocation(location)    // Use this new location
      }
      else if (DumbContainer.locations[key]) {
        return DumbContainer.locations[key]  // Use old location
      }
    }
    return stringToLocation(initialUrl)      // Use default location
  }

  saveLocation(location:Location) {
    DumbContainer.locations[this.getKey()] = location
  }

  getFilteredLocation() {
    const location:Location = this.getNewLocation()
    this.saveLocation(location)
    return location
  }

  onClick() {
    const {groupName} = this.props
    switchToGroup(groupName)
  }

  render() {
    const {
      hideInactiveContainers,
      children,
      style,
      activePage,
      lastActionType,
      ...divProps
    } = this.props


      //this.prevAction = lastActionType
      /*
      if (lastActionType === SwitchToContainer.type) {
        resetMasterScrolls()
      }
      */
      //const timeout = SwitchToContainer.type === 'switch-to-container' ? 1 : 1000

      return (

        <div {...divProps}
             onClick={this.onClick.bind(this)}
             style={{
               ...style,
               width: '100%',
               height: '100%',
               position: 'inherit',
               overflow: 'hidden'
             }}>
          <div style={{position: 'relative'}}>
            <TransitionGroup component='div'>
              {activePage &&
      (!hideInactiveContainers || this.matchesLocation(this.props)) ?
              <AnimatedPage lastActionType={lastActionType} key={activePage.url}>
                {children}
              </AnimatedPage> : <div></div>}
            </TransitionGroup>
          </div>
        </div>
      )
  }
}