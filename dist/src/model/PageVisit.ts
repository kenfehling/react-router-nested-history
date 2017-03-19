export enum VisitType {
  AUTO,
  MANUAL
}

interface PageVisit {
  type: VisitType
  time: number
}

export default PageVisit