import * as React from 'react'
import { Component, PropTypes, ReactNode } from 'react'
import {
  getActiveUrlInGroup, urlMatchesGroup, switchToGroup,
  isInitialized
} from '../../main'
import { patternsMatch } from '../../util/url'
import {Location} from 'history'
import {stringToLocation, locationToString} from '../../util/location'

const getKey = (groupName, locationIndex) => groupName + '_' + locationIndex

export interface DumbContainerProps {
  location: string | Location,
  children?: ReactNode,
  name: string,
  initialUrl: string,
  patterns: string[],
  style?: any

  groupName: string,
  useDefaultContainer?: boolean,
  hideInactiveContainers?: boolean
}

export default class DumbContainer extends Component<DumbContainerProps, undefined> {
  private static locations = {}  // Stays stored even if Container is unmounted

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

  getNewLocation():Location {
    const {name, groupName, initialUrl, location} = this.props
    const key = getKey(groupName, name)
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
    const {name, groupName} = this.props
    const key = getKey(groupName, name)
    DumbContainer.locations[key] = location
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
    const {hideInactiveContainers, children, style, ...divProps} = this.props
    if (!hideInactiveContainers || this.matchesLocation(this.props)) {
      return (
        <div {...divProps}
             onClick={this.onClick.bind(this)}
             style={{...style, width: '100%', height: '100%', position: 'inherit'}}>
          {children}
        </div>
      )

    }
    else {
      return <div></div>
    }
  }
}