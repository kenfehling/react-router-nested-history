import React, { Component, PropTypes } from 'react';
import * as reactRouter from 'react-router';
import MatchProvider from 'react-router/MatchProvider';
import matchPattern from 'react-router/matchPattern';
import { connect } from 'react-redux';
import { isPageActive } from '../../main';
import store from '../store';
import {listenToLocation} from "../actions/StateActions";

//store.dispatch(listenToLocation());

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
  return location.state && isPageActive(location.state.id);
}

class HistoryMatch extends reactRouter.Match {
  render() {
    const newLocation = this.props.location;
    const {children, render, component:Component, pattern, exactly} = this.props;
    if (newLocation) {
      const { match:matchContext } = this.context;
      const parent = matchContext && matchContext.parent;
      const newMatch = matchPattern(pattern, newLocation, exactly, parent);

      // Added by Ken Fehling to support multiple groups of nested tabs/windows
      const groupMatch = matchPattern('/tabs', newLocation, false, parent);
      let match, location;
      if (!!groupMatch) {  // the change was inside this tab group
        if (!!newMatch && newLocation.state) {  // if this was a change to this tab
          this.oldMatch = newMatch;
          this.oldLocation = newLocation;
        }
        match = newMatch;  // proceed normally
        location = newLocation;
      }
      else {  // the change was outside this tab group
        match = this.oldMatch;  // keep showing the page you were on
        location = this.oldLocation;
      }

      //console.log(match, this.oldMatch, reallyMatches(location), location);

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
    }
    else {
      return <div></div>;
    }
  }
}

const ConnectedHistoryMatch = connect(
  state => ({
    location: state.location
  })
)(HistoryMatch);

export default props => <ConnectedHistoryMatch store={store} {...props} />