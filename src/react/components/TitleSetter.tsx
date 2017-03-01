import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import IUpdateData from '../../model/interfaces/IUpdateData'
import {Store} from '../../store'
import {canUseWindowLocation} from '../../browserFunctions'

type TitleSetterPropsWithStore = {
  store: Store
}

type InnerTitleSetterProps = TitleSetterPropsWithStore & {

}

class TitleSetter extends Component<InnerTitleSetterProps, undefined> {

  componentWillMount() {
    const onStep = (currentUrl:string) => {
      const {titles} = this.props
      const title = getTitleForUrl(titles, currentUrl)
      if (canUseWindowLocation) {
        if (title) {
          document.title = title
        }
        else {
          console.warn('Cannot find title for ' + currentUrl)
        }
      }
    }

    addStepListener({before: onStep, after: onStep})
  }

  render() {
    return <div></div>
  }
}

const ConnectedTitleSetter = connect(
  (state:IUpdateData, ownProps:TitleSetterPropsWithStore) => ({
    titles: state.titles
  })
)(TitleSetter)

export default class extends Component<undefined, undefined> {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const {store} = this.context
    return <ConnectedTitleSetter store={store} />
  }
}