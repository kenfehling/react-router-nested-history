import * as React from 'react'
import {Component, ReactNode, PropTypes} from 'react'
import {Route} from 'react-router'
import {connect} from 'react-redux'
import {createStore, Store} from '../../store'
import DumbHistoryRouter from './DumbHistoryRouter'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
import {
  canUseWindowLocation,
  wasLoadedFromRefresh
} from '../../util/browserFunctions'
import Load from '../../model/actions/Load'
import SetZeroPage from '../../model/actions/SetZeroPage'
import StepRunner from './StepRunner'
import TitleSetter from './TitleSetter'
import ComputedState from '../../model/ComputedState'
import reducer, {initialState, ReduxState} from '../../reducers'
import {createStore as createRegularReduxStore} from 'redux'
import {autoRehydrate, persistStore} from 'redux-persist'
import {
  getDispatch, createCachingSelector,
  getIsInitialized
} from '../selectors'
declare const window:any

// For IE
import * as Promise from 'promise-polyfill'
import {createStructuredSelector} from 'reselect'

if (canUseDOM && !window.Promise) {
  window.Promise = Promise
}

export interface HistoryRouterProps {
  basename?: string
  forceRefresh?: boolean
  getUserConfirmation?: Function
  keyLength?: number
  children?: ReactNode
  zeroPage?: string
  location?: string

  listener?: (state:ComputedState) => void
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
    if (canUseWindowLocation) {
      return window.location.pathname
    }
    else {
      const location:string|undefined = this.props.location
      if (location) {
        return location
      }
      else {
        console.warn('You should pass location when testing')
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
)(InnerHistoryRouter)

class HistoryRouter extends Component<HistoryRouterProps, HistoryRouterState> {
  private store:Store

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.store = createStore({
      loadFromPersist: wasLoadedFromRefresh,
      regularReduxStore: this.makeReduxStore()
    })

    if (this.props.listener) {
      this.store.subscribe(() => {
        this.props.listener && this.props.listener(this.store.getState())
      })
    }
  }

  makeReduxStore() {
    const store = createRegularReduxStore<ReduxState>(
      reducer,
      initialState,
      autoRehydrate<ReduxState>()
    )
    persistStore(store, {}, () => this.setState({loaded: true}))
    return store
  }

  render() {
    return this.state.loaded ?
      <ConnectedHistoryRouter {...this.props} store={this.store} /> : null
  }
}

export default HistoryRouter