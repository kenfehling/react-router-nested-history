import PageVisit from './PageVisit'
import Page from './Page'
import * as R from 'ramda'
import SetZeroPage from './actions/SetZeroPage'
import CreateContainer from './actions/CreateContainer'
import CreateGroup from './actions/CreateGroup'

export default class VisitedPage extends Page {
  static readonly AUTO_TYPES =
      [SetZeroPage, CreateGroup, CreateContainer]
  readonly visits: PageVisit[]

  constructor({url, params, groupName, containerName, isZeroPage=false, visits=[]}:
      {url:string, params:Object, groupName:string, containerName:string,
        isZeroPage?:boolean, visits:PageVisit[]}) {
    super({url, params, groupName, containerName, isZeroPage})
    this.visits = visits
  }

  touch(visit: PageVisit):VisitedPage {
    return new VisitedPage({
      ...Object(this),
      visits: [...this.visits, visit]
    })
  }

  get wasManuallyVisited():boolean {
    return R.any((v:PageVisit) =>
        R.none(type => type === v.action, VisitedPage.AUTO_TYPES), this.visits)
  }

  get firstVisit():PageVisit {
    return this.visits[0]
  }

  get lastVisit():PageVisit {
    return R.last(this.visits)
  }
}