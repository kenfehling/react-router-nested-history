import Step from '../interfaces/Step'
import * as browser from '../../browserFunctions'

export default class BackStep implements Step {
  readonly n:number
  readonly needsPopListener:boolean = true

  constructor(n:number=1) {
    this.n = n
  }

  run() {
    browser.back(this.n)
  }
}