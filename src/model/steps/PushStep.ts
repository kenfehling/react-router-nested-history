import Step from '../interfaces/Step'
import * as browser from '../../util/browserFunctions'
import Page from '../Page'

export default class PushStep implements Step {
  readonly page:Page
  readonly needsPopListener:boolean = false

  constructor(page:Page) {
    this.page = page
  }

  run() {
    browser.push(this.page)
  }
}