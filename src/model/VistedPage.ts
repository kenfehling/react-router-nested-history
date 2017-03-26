import PageVisit, {VisitType} from './PageVisit'
import Page from './Page'
import * as R from 'ramda'

export default class VisitedPage extends Page {
  readonly visits: PageVisit[]

  constructor({url, params, containerName, isZeroPage=false, visits=[]}:
      {url:string, params:Object, groupName:string, containerName:string,
        isZeroPage?:boolean, visits:PageVisit[]}) {
    super({url, params, containerName, isZeroPage})
    this.visits = visits
  }

  touch(visit: PageVisit):VisitedPage {
    return new VisitedPage({
      ...Object(this),
      visits: [...this.visits, visit]
    })
  }

  get wasManuallyVisited():boolean {
    return R.any((v:PageVisit) => v.type === VisitType.MANUAL, this.visits)
  }

  get firstManualVisit():PageVisit {
    return this.visits.filter(p => p.type === VisitType.MANUAL)[0]
  }

  get lastVisit():PageVisit {
    return R.last(this.visits)
  }

  toPage():Page {
    return new Page(this)
  }
}