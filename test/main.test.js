import { runSteps } from '../src/main'
import * as util from '../src/util/history'
import { push, back, forward, go, _history, _resetHistory } from '../src/browserFunctions'
import { LOAD_FROM_URL, SWITCH_TO_CONTAINER, PUSH, BACK, FORWARD, POPSTATE } from "../src/constants/ActionTypes"
import { createContainers } from "./react/fixtures"
import type { Step } from "../src/types"
import * as _ from "lodash"

describe('main', () => {
  describe('memoryHistory tests', () => {

    beforeEach(_resetHistory)

    const createStepsForAllActions = (actions:Object[]) : Step[] =>
        actions.reduce((steps:Step[], action:Object, i:number) => _.flatten([
          ...steps,
          util.createStepsForLastAction(actions.slice(0, i + 1))
        ], []))
    const run = (actions:Object[]) =>
        runSteps(createStepsForAllActions([...createContainers, ...actions]))

    it('for push', async () => {
      await run([
        {type: PUSH, url: '/a/1'}
      ]).then(() => {
        expect(_history.entries.length).toBe(2)
        expect(_history.index).toBe(1)
      })
    })

    it('for back', async () => {
      await run([
        {type: PUSH, url: '/a/1'},
        {type: BACK}
      ]).then(() => {
        expect(_history.entries.length).toBe(2)
        expect(_history.index).toBe(0)
      })
    })
  })
})