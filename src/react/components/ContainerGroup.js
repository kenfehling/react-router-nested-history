import React from 'react'
import { connect } from "react-redux";
import store from '../store'
import DumbContainerGroup from './DumbContainerGroup'

const ContainerGroup = connect(
  state => ({
    location: state.location
  }),
  {}
)(DumbContainerGroup)

export default props => <ContainerGroup store={store} {...props} />