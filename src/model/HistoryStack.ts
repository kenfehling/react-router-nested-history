import Page from './Page'

/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
export default class HistoryStack {
  readonly back: Page[]
  readonly current: Page
  readonly forward: Page[]

  constructor({back, current, forward}:
      {back:Page[], current:Page, forward:Page[]}) {
    this.back = back
    this.current = current
    this.forward = forward
  }

  get lastVisited():number {
    return this.current.lastVisited
  }

  flatten():Page[] {
    return [...this.back, this.current, ...this.forward]
  }
}