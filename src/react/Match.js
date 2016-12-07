import React, { Component, PropTypes } from 'react';
import * as reactRouter from 'react-router';
import MatchProvider from 'react-router/MatchProvider';
import matchPattern from 'react-router/matchPattern';
import { LocationSubscriber } from 'react-router/Broadcasts';
import { isActivePage } from '../main';

class RegisterMatch extends React.Component {
  static contextTypes = {
    match: PropTypes.object,
    serverRouter: PropTypes.object
  };

  registerMatch() {
    const { match:matchContext } = this.context;
    const { match } = this.props;

    if (match && matchContext) {
      matchContext.addMatch(match);
    }
  }

  componentWillMount() {
    if (this.context.serverRouter) {
      this.registerMatch();
    }
  }

  componentDidMount() {
    if (!this.context.serverRouter) {
      this.registerMatch();
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.context;

    if (match) {
      if (prevProps.match && !this.props.match) {
        match.removeMatch(prevProps.match);
      } else if (!prevProps.match && this.props.match) {
        match.addMatch(this.props.match);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.context.match.removeMatch(this.props.match);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

// Added by Ken Fehling to support multiple groups of nested tabs/windows
function reallyMatches(location) {
  return isActivePage(location.state.id);
}

export default class extends reactRouter.Match {

  render() {
    return (
      <LocationSubscriber>
        {(location) => {
          const {
              children,
              render,
              component:Component,
              pattern,
              exactly
          } = this.props;

          const { match:matchContext } = this.context;
          const parent = matchContext && matchContext.parent;
          const newMatch = matchPattern(pattern, location, exactly, parent);

          // Added by Ken Fehling to support multiple groups of nested tabs/windows
          const groupMatch = matchPattern('/tabs', location, false, parent);
          let match;
          if (!!groupMatch) {  // the change was inside this tab group
            if (!!newMatch && location.state.real) {  // if this was a change to this tab
              this.oldMatch = newMatch;
            }
            match = newMatch;  // proceed normally
          }
          else {  // the change was outside this tab group
            match = this.oldMatch;  // keep showing the page you were on
          }

          const props = { ...match, location, pattern };
          return (
              <RegisterMatch match={match}>
                <MatchProvider match={match}>
                  {children ? (
                      children({ matched: !!match && reallyMatches(location), ...props })
                  ) : match ? (
                      render ? (
                          render(props)
                      ) : (
                          <Component {...props}/>
                      )
                  ) : null}
                </MatchProvider>
              </RegisterMatch>
          )
        }}
      </LocationSubscriber>
    )
  }

  /*
  componentWillReceiveProps(props) {
    console.log("CWRP", props);
  }

  shouldComponentUpdate(props) {
    console.log('CSU', props);
    return true;
  }

  render() {
    const {component} = this.props;

    const r = (props) => {

      console.log(props);

      return component(props);
    };

    console.log("RENDER", this.props);

    return <reactRouter.Match {...this.props} render={r} />
  }
  */
};