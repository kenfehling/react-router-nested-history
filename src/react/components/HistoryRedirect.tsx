import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createCachingSelector, getDispatch} from '../selectors'
import Push from '../../model/actions/Push'
import Replace from '../../model/actions/Replace'
import {compose, getContext, renameProps} from 'recompose'
import waitForInitialization from '../waitForInitialization'

/**
 * The public API for updating the location programatically
 * with a component.
 */
class InnerHistoryRedirect extends Component<undefined, undefined> {
  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      //PropTypes.object
    ])
  }

  static defaultProps = {
    push: false
  }

  isStatic() {
    return this.context.router && this.context.router.staticContext
  }

  componentWillMount() {
    if (this.isStatic())
      this.perform()
  }

  componentDidMount() {
    if (!this.isStatic())
      this.perform()
  }

  perform() {
    const {push, to, pushFn, replaceFn} = this.props as any
    if (push) {
      pushFn(to)
    } else {
      replaceFn(to)
    }
  }

  render() {
    return null
  }
}

const makeGetActions = ():any => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    pushFn: (url:string) => dispatch(new Push({url})),
    replaceFn: (url:string) => dispatch(new Replace({url})),
  })
)

const HistoryRedirect = connect(
  () => ({}),
  makeGetActions
)(InnerHistoryRedirect)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired
  }),
  renameProps({
    rrnhStore: 'store'
  }),
  waitForInitialization
)

export default enhance(HistoryRedirect)