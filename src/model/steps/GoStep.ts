import Step from '../Step'
import * as browser from '../../util/browserFunctions'

export default class GoStep implements Step {
  readonly n:number
  readonly needsPopListener:boolean = true

  constructor(n:number) {
    this.n = n
  }

  run() {
    browser.go(this.n)
  }
}