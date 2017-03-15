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

  componentWillReceiveProps(newProps) {
    const {actions, lastUpdate, recordBrowserUpdate} = newProps
    const steps: Step[] = createStepsSince(actions, lastUpdate)
    if (steps.length > 0) {
      recordBrowserUpdate()
      const before = () => this.isListening = false
      const after = () => this.isListening = true
      runSteps(steps, before, after)
    }
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

  render() {
    return <div></div>
  }
}

const mapStateToProps = (state:ComputedState) => ({
  actions: state.actions,
  lastUpdate: state.lastUpdate,
  pages: state.pages
})

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:StepRunnerProps) => ({
  recordBrowserUpdate: () => dispatch(new UpdateBrowser()),
  dispatch
})

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
  mapDispatchToProps,
  mergeProps
)(InnerStepRunner)

const StepRunner = ({store}:StepRunnerProps) => (
  <ConnectedStepRunner store={store} />
)

export default waitForInitialization(StepRunner as any)