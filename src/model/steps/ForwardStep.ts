import Step from '../interfaces/Step'
import * as browser from '../../util/browserFunctions'

export default class ForwardStep implements Step {
  readonly n:number
  readonly needsPopListener:boolean = true

  constructor(n:number=1) {
    this.n = n
  }

  run() {
    browser.forward(this.n)
  }
}