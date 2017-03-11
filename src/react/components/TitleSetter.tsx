import * as React from 'react'
import {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../../store/IUpdateData'
import {Store} from '../../store/store'
import {canUseWindowLocation} from '../../util/browserFunctions'
import State from '../../model/State'
import Action from '../../model/BaseAction'

type TitleSetterPropsWithStore = {
  store: Store<State, Action>,
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

const mapStateToProps = (state:IUpdateData<State, Action>,
                         ownProps:TitleSetterPropsWithStore):
                         ConnectedTitleSetterProps => ({
  ...ownProps,
  activeTitle: state.state.activeTitle
})

const ConnectedTitleSetter = connect(mapStateToProps)(TitleSetter)
export default ({store}) => <ConnectedTitleSetter store={store} />