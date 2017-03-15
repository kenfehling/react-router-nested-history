import * as React from 'react'
import {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import {Store} from '../../store/store'
import {canUseWindowLocation} from '../../util/browserFunctions'
import State from '../../model/State'
import Action from '../../model/BaseAction'
import ComputedState from '../../model/ComputedState'
import waitForInitialization from '../waitForInitialization'

type TitleSetterProps = {
  store: Store<State, Action, ComputedState>,
  children?: ReactNode
}

type ConnectedTitleSetterProps = TitleSetterProps & {
  activeTitle?: string|null
}

class InnerTitleSetter extends Component<ConnectedTitleSetterProps, undefined> {

  componentWillReceiveProps(newProps) {
    const {activeTitle} = newProps
    if (canUseWindowLocation) {
      if (activeTitle) {
        document.title = activeTitle
      }
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state:ComputedState,
                         ownProps:TitleSetterProps):
                         ConnectedTitleSetterProps => ({
  ...ownProps,
  activeTitle: state.activeTitle
})

const ConnectedTitleSetter = connect(mapStateToProps)(InnerTitleSetter)

const TitleSetter = ({store}:TitleSetterProps) => (
  <ConnectedTitleSetter store={store} />
)

export default waitForInitialization(TitleSetter as any)