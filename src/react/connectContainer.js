import React, { Component } from 'react';

export default function(WrappedComponent) {
  return class extends Component {
    componentWillMount() {

    }

    componentWillReceiveProps(props) {
      console.log('CWRP');
      console.log(props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}