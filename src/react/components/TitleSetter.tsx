import * as React from 'react'
import {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../../model/IUpdateData'
import {Store} from '../../store'
import {canUseWindowLocation} from '../../util/browserFunctions'
import {HistoryStack} from '../../model/Pages'
import State from '../../model/State'
import Action from '../../model/BaseAction'

type TitleSetterPropsWithStore = {
  store: Store<State, Action>,
  children?: ReactNode
}

type ConnectedTitleSetterProps = TitleSetterPropsWithStore & {
  browserHistory: HistoryStack,
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
  browserHistory: state.state.browserHistory,
  activeTitle: state.state.activeTitle
})

const ConnectedTitleSetter = connect(mapStateToProps)(TitleSetter)
export default ({store}) => <ConnectedTitleSetter store={store} />