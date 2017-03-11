import Step from '../Step'
import * as browser from '../../util/browserFunctions'
import Page from '../Page'

export default class ReplaceStep implements Step {
  readonly page:Page
  readonly needsPopListener:boolean = false

  constructor(page:Page) {
    this.page = page
  }

  run() {
    browser.replace(this.page)
  }
}