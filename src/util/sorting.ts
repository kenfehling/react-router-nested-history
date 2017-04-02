import VisitedPage from '../model/VistedPage'

export function comparePagesByFirstVisited(p1:VisitedPage, p2:VisitedPage):number {
  if (p1.isZeroPage) {
    return -1
  }
  if (p2.isZeroPage) {
    return 1
  }
  if (p1.wasManuallyVisited) {
    if (p2.wasManuallyVisited) {
      return p1.firstManualVisit.time - p2.firstManualVisit.time
    }
    else {
      return -1 //1
    }
  }
  else {
    if (p2.wasManuallyVisited) {
      return 1 //-1
    }
    else {
      return 0
    }
  }
}

export function comparePagesByLastVisited(p1:VisitedPage, p2:VisitedPage):number {
  return p2.lastVisit.time - p1.lastVisit.time
}