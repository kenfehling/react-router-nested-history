import * as React from 'react'
import {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import {Store} from '../../store'
import ComputedState from '../../model/ComputedState'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'

type TitleSetterProps = {
  store: Store
  children?: ReactNode
}

type ConnectedTitleSetterProps = TitleSetterProps & {
  activeTitle?: string|undefined
}

class InnerTitleSetter extends Component<ConnectedTitleSetterProps, undefined> {

  updateTitle() {
    const {activeTitle} = this.props
    if (canUseDOM) {
      if (activeTitle) {
        setTimeout(() => {
          document.title = activeTitle
        }, 1)
      }
    }
  }

  componentDidMount() {
    this.updateTitle()
  }

  componentDidUpdate() {
    this.updateTitle()
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

const TitleSetter = connect(mapStateToProps)(InnerTitleSetter)

export default ({store}:TitleSetterProps) => (
  <TitleSetter store={store} />
)