import Action from './Action'

export interface IActionClass {
  new (...args: any[]):Action
}

interface PageVisit {
  action: IActionClass
  time: number
}

export default PageVisit