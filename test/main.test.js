import { runSteps } from '../src/main'
import * as util from '../src/util/history'
import { push, back, forward, go, _history } from '../src/browserFunctions'
import { LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../src/constants/ActionTypes"
import { createContainers } from "./react/fixtures"

describe('main', () => {
  describe('memoryHistory tests', () => {
    const run = (actions:Object[]) =>
        runSteps(util.createSteps([...createContainers, ...actions]))

    it('for push', async () => {
      await run([
        {type: PUSH, url: '/a/1'}
      ]).then(() => {
        expect(_history.entries.length).toBe(2)
        expect(_history.index).toBe(1)
      })
    })

    it.only('for back', async () => {
      await run([
        {type: PUSH, url: '/a/1'},
        {type: BACK}
      ]).then(() => {

        // TODO: It only cares about the last action. This is kinda weird.

        expect(_history.entries.length).toBe(2)
        expect(_history.index).toBe(0)
      })
    })
  })
})