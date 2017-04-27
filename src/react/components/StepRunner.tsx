import * as React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {Location} from 'history'
import {Store} from '../../store'
import Page from '../../model/Page'
import OnPopState from '../../model/actions/OnPopState'
import * as browser from '../../util/browserFunctions'
import Action from '../../model/Action'
import Step from '../../model/Step'
import {createSteps} from '../../util/reconciler'
import UpdateBrowser from '../../model/actions/UpdateBrowser'
import {runSteps} from '../../util/stepRunner'
import State from '../../model/State'
import ComputedState from '../../model/ComputedState'
import waitForInitialization from '../waitForInitialization'
import {getDispatch, createCachingSelector} from '../selectors'

export interface StepRunnerProps {
  store: Store
}

type ConnectedStepRunnerProps = StepRunnerProps & {
  popstate: (page:Page) => void
  oldState: State,
  newActions: Action[],
  recordBrowserUpdate: () => void
}

class InnerStepRunner extends Component<ConnectedStepRunnerProps, undefined> {
  private unlistenForPopState: () => void
  private isListening: boolean = true

  update(props) {
    const {oldState, newActions, recordBrowserUpdate} = props
    const steps: Step[] = createSteps(oldState, newActions)
    if (newActions.length > 0) {
      if (steps.length > 0) {
        const before = () => this.isListening = false
        const after = () => this.isListening = true
        runSteps(steps, before, after)
      }
      recordBrowserUpdate()
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
  oldState: state.oldState,
  newActions: state.newActions
})

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    recordBrowserUpdate: () => dispatch(new UpdateBrowser()),
    popstate: (page: Page) => dispatch(new OnPopState({page}))
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:StepRunnerProps):ConnectedStepRunnerProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedStepRunner = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerStepRunner)

const StepRunner = ({store}:StepRunnerProps) => (
  <ConnectedStepRunner store={store} />
)

export default waitForInitialization(StepRunner as any)