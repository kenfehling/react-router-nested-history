import * as Queue from 'promise-queue'
import Step from '../model/interfaces/Step'
import * as browser from './browserFunctions'

const queue = new Queue(1, Infinity)  // maxConcurrent = 1, maxQueue = Infinity

function runStep(step:Step, before:()=>void, after:()=>void):Promise<any> {
  const stepPromise = ():Promise<any> => {
    step.run()
    return browser.canUseWindowLocation && step.needsPopListener ?
      browser.listenPromise() : Promise.resolve()
  }
  const beforePromise = ():Promise<{}> => new Promise(resolve => {
    before()
    return resolve()
  })
  const afterPromise = ():Promise<{}> => new Promise(resolve => {
    after()
    return resolve()
  })
  return [beforePromise, stepPromise, afterPromise].reduce(
    (p:Promise<any>, s:() => Promise<any>) => p.then(s), Promise.resolve())

}

export function runSteps(steps:Step[], before:()=>void, after:()=>void):Promise<void> {
  const ps:() => Promise<void> = () =>
    steps.reduce((p, step) => p.then(() => runStep(step, before, after)), Promise.resolve())
  return queue.add(ps)
}