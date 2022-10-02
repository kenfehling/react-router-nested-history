import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Route} from 'react-router'
import {connect} from 'react-redux'
import {createStore, Store} from '../../store'
import DumbHistoryRouter, {DumbHistoryRouterProps} from './DumbHistoryRouter'
import {canUseDOM} from 'exenv'
import {wasLoadedFromRefresh} from '../../util/browserFunctions'
import Load from '../../model/actions/Load'
import SetZeroPage from '../../model/actions/SetZeroPage'
import StepRunner from './StepRunner'
import TitleSetter from './TitleSetter'
import reducer, {initialState, ReduxState} from '../../reducers'
import {createStore as createRegularReduxStore} from 'redux'
import {autoRehydrate, persistStore} from 'redux-persist'
import {
  getDispatch, createCachingSelector,
  getIsInitialized
} from '../selectors'
declare const window:any

import {createStructuredSelector} from 'reselect'

type HistoryRouterProps = DumbHistoryRouterProps & {
  basename?: string
  forceRefresh?: boolean
  getUserConfirmation?: Function
  keyLength?: number
  zeroPage?: string
  location?: string
}

type RouterPropsWithStore = HistoryRouterProps & {
  store: Store
}

type ConnectedRouterProps = RouterPropsWithStore & {
  isInitialized: boolean
  loadedFromRefresh: boolean
  load: (url:string) => void
  setZeroPage: (url:string) => void
}

interface HistoryRouterState {
  loaded: boolean
}

class InnerHistoryRouter extends Component<ConnectedRouterProps, undefined> {
  static childContextTypes = {
    rrnhStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const {loadedFromRefresh} = this.props
    if (!loadedFromRefresh) {
      this.initialize()
    }
  }

  shouldComponentUpdate() {
    return false
  }

  initialize() {
    const {zeroPage, setZeroPage} = this.props
    if (zeroPage) {
      setZeroPage(zeroPage)
    }
  }

  componentDidMount() {
    const {load, isInitialized} = this.props
    if (!isInitialized) {
      load(this.getLocation())
    }
  }

  getChildContext() {
    return {
      rrnhStore: this.props.store
    }
  }

  getLocation():string {
    if (canUseDOM) {
      return window.location.pathname
    }
    else {
      const location:string|undefined = this.props.location
      if (location) {
        return location
      }
      else {
        console.warn('You should pass location on the server or when testing')
        return '/'
      }
    }
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        <DumbHistoryRouter{...this.props} />
        <StepRunner store={this.props.store}/>
        <TitleSetter store={this.props.store} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isInitialized: getIsInitialized
})

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    load: (url:string) => dispatch(new Load({url})),
    setZeroPage: (url:string) => dispatch(new SetZeroPage({url}))
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:RouterPropsWithStore):ConnectedRouterProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHistoryRouter = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerHistoryRouter as any) as any;

class HistoryRouter extends Component<HistoryRouterProps, HistoryRouterState> {
  private store:Store

  constructor(props) {
    super(props)
    this.store = createStore({
      loadFromPersist: wasLoadedFromRefresh,
      regularReduxStore: this.makeReduxStore()
    })
  }

  makeReduxStore() {
    const regularReduxStore = createRegularReduxStore<ReduxState>(
      reducer,
      initialState,
      autoRehydrate<ReduxState>()
    )
    // Wait for persistStore to finish before rendering
    // Removing this messes up SSR
    persistStore(regularReduxStore)
    return regularReduxStore
  }

  render() {
    return <ConnectedHistoryRouter {...this.props} store={this.store} />
  }
}

export default HistoryRouter