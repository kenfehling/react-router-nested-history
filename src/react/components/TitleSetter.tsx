import * as React from 'react'
import {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import {Store} from '../../store/store'
import {canUseWindowLocation} from '../../util/browserFunctions'
import State from '../../model/State'
import Action from '../../model/BaseAction'
import ComputedState from '../../model/ComputedState'

type TitleSetterPropsWithStore = {
  store: Store<State, Action, ComputedState>,
  children?: ReactNode
}

type ConnectedTitleSetterProps = TitleSetterPropsWithStore & {
  activeTitle?: string|null
}

class TitleSetter extends Component<ConnectedTitleSetterProps, undefined> {

  componentWillReceiveProps(newProps) {
    const {activeTitle} = newProps
    if (canUseWindowLocation) {
      if (activeTitle) {
        document.title = activeTitle
      }
    }
  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = (state:ComputedState,
                         ownProps:TitleSetterPropsWithStore):
                         ConnectedTitleSetterProps => ({
  ...ownProps,
  activeTitle: state.activeTitle
})

const ConnectedTitleSetter = connect(mapStateToProps)(TitleSetter)
export default ({store}) => <ConnectedTitleSetter store={store} />