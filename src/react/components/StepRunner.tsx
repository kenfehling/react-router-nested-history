import * as React from 'react'
import {Component} from 'react'
import {connect, Dispatch} from 'react-redux'
import {Location} from 'history'
import {Store} from '../../store/store'
import Page from '../../model/Page'
import PopState from '../../model/actions/PopState'
import * as browser from '../../util/browserFunctions'
import Action from '../../model/BaseAction'
import Step from '../../model/Step'
import {createStepsSince} from '../../util/reconciler'
import UpdateBrowser from '../../model/actions/UpdateBrowser'
import {runSteps} from '../../util/stepRunner'
import State from '../../model/State'
import ComputedState from '../../model/ComputedState'
import waitForInitialization from '../waitForInitialization'
import {getDispatch, createCachingSelector} from '../selectors'

export interface StepRunnerProps {
  store: Store<State, Action, ComputedState>
}

type ConnectedStepRunnerProps = StepRunnerProps & {
  popstate: (page:Page) => void
  actions: Action[],
  lastUpdate: number,
  recordBrowserUpdate: () => void
}

class InnerStepRunner extends Component<ConnectedStepRunnerProps, undefined> {
  private unlistenForPopState: () => void
  private isListening: boolean = true

  update(props) {
    const {actions, lastUpdate, recordBrowserUpdate} = props
    const steps: Step[] = createStepsSince(actions, lastUpdate)
    if (steps.length > 0) {
      recordBrowserUpdate()
      const before = () => this.isListening = false
      const after = () => this.isListening = true
      runSteps(steps, before, after)
    }
  }

  componentWillReceiveProps(newProps) {
    this.update(newProps)
  }

  componentWillMount() {
    this.unlistenForPopState = browser.listen((location:Location) => {
      if (this.isListening && location.state) {
        const {popstate} = this.props
        const page:Page = new Page(location.state)
        popstate(page)
      }
    })
  }

  componentWillUnmount() {
    this.unlistenForPopState()
  }

  componentDidMount() {
    this.update(this.props)
  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = (state:ComputedState) => ({
  actions: state.actions,
  lastUpdate: state.lastUpdate,
  pages: state.pages
})

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    recordBrowserUpdate: () => dispatch(new UpdateBrowser()),
    dispatch
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:StepRunnerProps):ConnectedStepRunnerProps => {

  const popstate = (page: Page) => {
    dispatchProps.dispatch(new PopState({
      n: stateProps.pages.getShiftAmount(page)
    }))
  }
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    popstate
  }
}

const ConnectedStepRunner = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerStepRunner)

const StepRunner = ({store}:StepRunnerProps) => (
  <ConnectedStepRunner store={store} />
)

export default waitForInitialization(StepRunner as any)