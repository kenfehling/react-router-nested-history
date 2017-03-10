import Action from './BaseAction'

export interface IActionClass {
  new (...args: any[]):Action
}

interface PageVisit {
  action: IActionClass
  time: number
}

export default PageVisit