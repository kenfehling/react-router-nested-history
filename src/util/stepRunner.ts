import * as Queue from 'promise-queue'
import Step from '../model/interfaces/Step'
import * as browser from './browserFunctions'

const queue = new Queue(1, Infinity)  // maxConcurrent = 1, maxQueue = Infinity

function runStep(step:Step):Promise<any> {
  step.run()
  return browser.canUseWindowLocation && step.needsPopListener ?
    browser.listenPromise() : Promise.resolve()
}

export function runSteps(steps:Step[]):Promise<void> {
  const ps:() => Promise<void> = () =>
    steps.reduce((p, step) => p.then(() => runStep(step)), Promise.resolve())
  return queue.add(ps)
}