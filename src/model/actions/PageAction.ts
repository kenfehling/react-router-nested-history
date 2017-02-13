import Page from '../Page'
import Action from '../Action'

abstract class PageAction extends Action {
  readonly page: Page

  constructor({time, page}:{time?: number, page: Page}) {
    super({time})
    this.page = page
  }
}

export default PageAction