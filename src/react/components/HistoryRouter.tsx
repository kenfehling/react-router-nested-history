import * as React from 'react'
import {Component, ReactNode, PropTypes} from 'react'
import {Route} from 'react-router'
import {connect, Dispatch} from 'react-redux'
import {createStore, Store} from '../../store/store'
import DumbHistoryRouter from './DumbHistoryRouter'
import cloneElement = React.cloneElement
import IUpdateData from '../../store/IUpdateData'
import Startup from '../../model/actions/Startup'
import * as browser from '../../util/browserFunctions'
import InitializedState from '../../model/InitializedState'
import LoadFromUrl from '../../model/actions/LoadFromUrl'
import SetZeroPage from '../../model/actions/SetZeroPage'
import {canUseWindowLocation} from '../../util/browserFunctions'
import StepRunner from './StepRunner'
import TitleSetter from './TitleSetter'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import UninitializedState from '../../model/UninitializedState'
declare const window:any

export interface HistoryRouterProps {
  basename?: string
  forceRefresh?: boolean
  getUserConfirmation?: Function
  keyLength?: number
  children?: ReactNode
  zeroPage?: string
  location?: string
}

type RouterPropsWithStore = HistoryRouterProps & {
  store: Store<State, Action>
}

type ConnectedRouterProps = RouterPropsWithStore & {
  isInitialized: boolean
  startup: () => void
  loadFromUrl: (url:string) => void
  setZeroPage: (url:string) => void
}

class HistoryRouter extends Component<ConnectedRouterProps, undefined> {
  static childContextTypes = {
    rrnhStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const {
      store,
      zeroPage,
      setZeroPage,
      startup,
    } = this.props

    if (zeroPage) {
      setZeroPage(zeroPage)
    }
    startup()

    /*
    class R extends Component<{children: ReactNode}, undefined> {
      static childContextTypes = {
        rrnhStore: PropTypes.object.isRequired,
        initializing: PropTypes.bool,
        router: PropTypes.object,
      }

      getChildContext() {
        return {
          rrnhStore: store,
          initializing: true,
          router: {
            location: {pathname: '/'},
            listen: () => {},
            push: () => {},
            replace: () => {}
          }
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    // Initialize the ContainerGroups
    // (since most tab libraries lazy load tabs)
    const cs = getChildren(this, [ContainerGroup, DumbContainerGroup, WindowGroup])
    cs.forEach(c => renderToStaticMarkup(<R children={c} />))
    */
  }

  componentDidMount() {
    const {loadFromUrl, isInitialized} = this.props
    if (!isInitialized) {
      loadFromUrl(this.getLocation())
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
    const {isInitialized} = this.props
    return (
      <div>
        <DumbHistoryRouter{...this.props} />
        {isInitialized && (
          <div>
            <StepRunner store={this.props.store}/>
            <TitleSetter store={this.props.store} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state:IUpdateData<State, Action>) => ({
  isInitialized: state.state instanceof InitializedState
})

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData<State, Action>>,
                            ownProps:RouterPropsWithStore) => ({
  startup: () => dispatch(new Startup({
    fromRefresh: browser.wasLoadedFromRefresh
  })),
  loadFromUrl: (url:string) => dispatch(new LoadFromUrl({
    url,
    fromRefresh: browser.wasLoadedFromRefresh
  })),
  setZeroPage: (url:string) => dispatch(new SetZeroPage({url}))
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:RouterPropsWithStore):ConnectedRouterProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHistoryRouter = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(HistoryRouter)

export default (props:HistoryRouterProps) => (
  <ConnectedHistoryRouter
    {...props} store={createStore<State, Action>({
                      persist: browser.wasLoadedFromRefresh,
                      initialState: new UninitializedState()})} />
)