import PageVisit, {VisitType} from './PageVisit'
import Page from './Page'
import * as some from 'lodash/some'
import * as last from 'lodash/last'

export default class VisitedPage extends Page {
  readonly visits: PageVisit[]

  constructor({url, params, container, group, isZeroPage=false, visits=[]}:
      {url:string, params:Object, container:string, group:string,
        isZeroPage?:boolean, visits?:PageVisit[]}) {
    super({url, params, container, group, isZeroPage})
    this.visits = visits
  }

  touch(visit: PageVisit):VisitedPage {
    return new VisitedPage({
      ...Object(this),
      visits: [...this.visits, visit]
    })
  }

  get wasManuallyVisited():boolean {
    return some(this.visits, (v:PageVisit) => v.type === VisitType.MANUAL)
  }

  get firstManualVisit():PageVisit {
    return this.visits.filter(p => p.type === VisitType.MANUAL)[0]
  }

  get lastVisit():PageVisit {
    return last(this.visits)
  }

  toPage():Page {
    return new Page(this)
  }
}