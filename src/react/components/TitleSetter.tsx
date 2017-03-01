import * as React from 'react'
import {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../../model/interfaces/IUpdateData'
import {Store} from '../../store'
import {canUseWindowLocation} from '../../util/browserFunctions'
import * as browser from '../../util/browserFunctions'
import HistoryStack from '../../model/HistoryStack'

type TitleSetterPropsWithStore = {
  store: Store,
  children?: ReactNode
}

type ConnectedTitleSetterProps = TitleSetterPropsWithStore & {
  browserHistory: HistoryStack,
  activeUrl: string,
  activeTitle?: string|null
}

class TitleSetter extends Component<ConnectedTitleSetterProps, undefined> {
  private unlistenForPopState: () => void
  private isListening: boolean = true
  
  updateTitle() {
    const {activeUrl, activeTitle} = this.props
    if (canUseWindowLocation) {
      if (activeTitle) {
        document.title = activeTitle
      }
      else {
        console.warn('Cannot find title for ' + activeUrl)
      }
    }
  }
  
  componentWillMount() {
    this.unlistenForPopState = browser.listen(() => {
      if (this.isListening) {
        this.updateTitle()
      }
    })
  }

  componentWillUnmount() {
    this.unlistenForPopState()
  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = (state:IUpdateData, ownProps:TitleSetterPropsWithStore):
                                                ConnectedTitleSetterProps => ({
  ...ownProps,
  browserHistory: state.state.browserHistory,
  activeUrl: state.state.activeUrl,
  activeTitle: state.state.activeTitle
})

const ConnectedTitleSetter = connect(mapStateToProps)(TitleSetter)
export default ({store}) => <ConnectedTitleSetter store={store} />