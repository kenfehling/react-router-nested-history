import * as Queue from 'promise-queue'
import Step from '../model/interfaces/Step'
import * as browser from './browserFunctions'

const queue = new Queue(1, Infinity)  // maxConcurrent = 1, maxQueue = Infinity

function runStep(step:Step, before:()=>void, after:()=>void):Promise<any> {
  before()
  step.run()
  return browser.canUseWindowLocation && step.needsPopListener ?
    browser.listenPromise().then(after) : Promise.resolve().then(after)
}

export function runSteps(steps:Step[], before:()=>void, after:()=>void):Promise<void> {
  const ps:() => Promise<void> = () =>
    steps.reduce((p, step) => p.then(() => runStep(step, before, after)), Promise.resolve())
  return queue.add(ps)
}