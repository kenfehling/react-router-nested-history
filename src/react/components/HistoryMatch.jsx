import * as React from 'react'
import { Component, PropTypes } from 'react'
import * as reactRouter from 'react-router'
import MatchProvider from 'react-router/MatchProvider'
import matchPattern from 'react-router/matchPattern'

class RegisterMatch extends Component {
  static contextTypes = {
    match: PropTypes.object,
    serverRouter: PropTypes.object
  }

  registerMatch() {
    const { match:matchContext } = this.context
    const { match } = this.props

    if (match && matchContext) {
      matchContext.addMatch(match)
    }
  }

  componentWillMount() {
    if (this.context.serverRouter) {
      this.registerMatch()
    }
  }

  componentDidMount() {
    if (!this.context.serverRouter) {
      this.registerMatch()
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.context

    if (match) {
      if (prevProps.match && !this.props.match) {
        match.removeMatch(prevProps.match)
      } else if (!prevProps.match && this.props.match) {
        match.addMatch(this.props.match)
      }
    }
  }

  componentWillUnmount() {
    if (this.props.match && this.context.match) {
      this.context.match.removeMatch(this.props.match)
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default class HistoryMatch extends reactRouter.Match {
  static contextTypes = {
    ...(reactRouter.Match.contextTypes ? reactRouter.Match.contextTypes : []),
    location: PropTypes.object.isRequired
  }

  static childContextTypes = {
    pattern: PropTypes.string
  }

  getChildContext() {
    return {
      pattern: this.props.pattern
    }
  }
  
  render() {
    const {
        children,
        render,
        component:Component,
        pattern,
        exactly
    } = this.props

    const { match:matchContext, location} = this.context
    const parent = matchContext && matchContext.parent
    const match = matchPattern(pattern, location, exactly, parent)
    const props = { ...match, location, pattern }

    return (
      <RegisterMatch match={match}>
        <MatchProvider match={match}>
          {children ? (
              children({ matched: !!match, ...props })
            ) : match ? (
                  render ? (
                          render(props)
                      ) : (
                          <Component {...props} />
                      )
              ) : null}
        </MatchProvider>
      </RegisterMatch>
    )
  }
}