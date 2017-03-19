import * as Queue from 'promise-queue'
import Step from '../model/Step'
import * as browser from './browserFunctions'

const queue = new Queue(1, Infinity)  // maxConcurrent = 1, maxQueue = Infinity
const noop:()=>void = () => {}

function runStep(step:Step, before=noop, after=noop):Promise<any> {
  before()
  step.run()
  return browser.needsPopstateConfirmation && step.needsPopListener ?
    browser.listenPromise().then(after) : Promise.resolve().then(after)
}

export function runSteps(steps:Step[], before=noop, after=noop):Promise<any> {
  const ps:() => Promise<any> = () =>
    steps.reduce(
      (prev, step) => prev.then(() => runStep(step, before, after)),
      Promise.resolve()
    )
  return queue.add(ps)
}