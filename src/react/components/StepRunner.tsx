import * as React from 'react'
import {Component} from 'react'
import {connect, Dispatch} from 'react-redux'
import {Location} from 'history'
import {Store} from '../../store'
import {HistoryStack} from '../../model/Pages'
import Page from '../../model/Page'
import IUpdateData from '../../model/IUpdateData'
import PopState from '../../model/actions/PopState'
import * as browser from '../../util/browserFunctions'
import Action from '../../model/Action'
import Step from '../../model/Step'
import {createStepsSince} from '../../util/actions'
import UpdateBrowser from '../../model/actions/UpdateBrowser'
import {runSteps} from '../../util/stepRunner'

export interface StepRunnerProps {
  store: Store
}

type ConnectedStepRunnerProps = StepRunnerProps & {
  browserHistory: HistoryStack
  popstate: (page:Page) => void
  actions: Action[],
  lastUpdate: number,
  recordBrowserUpdate: () => void
}

class StepRunner extends Component<ConnectedStepRunnerProps, undefined> {
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

const mapStateToProps = ({state, actions}:IUpdateData) => ({
  actions,
  lastUpdate: state.lastUpdate,
  browserHistory: state.browserHistory
})

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
                            ownProps:StepRunnerProps) => ({
  recordBrowserUpdate: () => dispatch(new UpdateBrowser()),
  dispatch
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:StepRunnerProps):ConnectedStepRunnerProps => {

  const popstate = (page: Page) => {
    dispatchProps.dispatch(new PopState({
      n: stateProps.browserHistory.getShiftAmount(page)
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
)(StepRunner)

export default ({store}:StepRunnerProps) => (
  <ConnectedStepRunner store={store} />
)