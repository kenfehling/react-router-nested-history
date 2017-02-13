import Comparable from './interfaces/Comparable'
import Page from './Page'
import * as R from 'ramda'
import IHistory from './interfaces/IHistory'

/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
export default class HistoryStack implements Comparable, IHistory {
  readonly back: Page[]
  readonly current: Page
  readonly forward: Page[]

  constructor({back, current, forward}:
      {back:Page[], current:Page, forward:Page[]}) {
    this.back = back
    this.current = current
    this.forward = forward
  }

  activate(time:number):HistoryStack {
    return new HistoryStack({
      ...Object(this),
      current: this.current.touch(time)
    })
  }

  push(page:Page):HistoryStack {
    return new HistoryStack({
      back: [...this.back, this.current],
      current: page,
      forward: []
    })
  }

  /**
   * Go back to the first page of the history
   * @param time - The time this action was originally run
   * @param reset - Should it remove the forward pages from history?
   */
  top(time:number, reset:boolean=false):HistoryStack {
    const h:HistoryStack = this.shiftTo(this.back[0] || this.current, time)
    if (reset) {
      return new HistoryStack({
        ...h,
        forward: []
      })
    }
    else {
      return h
    }
  }

  goBack(n:number=1, time:number):HistoryStack {
    return n === 0 ? this.activate(time) : new HistoryStack({
          back: R.init(this.back),
          current: R.last(this.back),
          forward: [this.current, ...this.forward]
        }).goBack(n - 1, time)
  }

  goForward(n:number=1, time:number):HistoryStack {
    return n === 0 ? this.activate(time) : new HistoryStack({
          back: [...this.back, this.current],
          current: R.head(this.forward),
          forward: R.tail(this.forward)
        }).goForward(n - 1, time)
  }

  go(n:number, time:number):HistoryStack {
    return n === 0 ? this : n < 0 ?
            this.goBack(0 - n, time) : this.goForward(n, time)
  }

  /**
   * @returns {[Page]} This HistoryStack as a flat array of Page objects
   */
  flatten():Page[] {
    return [...this.back, this.current, ...this.forward]
  }

  /**
   * @returns {number} The index of the current page in the stack
   */
  get index():number {
    return this.back.length
  }

  canGoBack(n:number=1):boolean {
    return this.back.length > n - 1
  }

  canGoForward(n:number=1):boolean {
    return this.forward.length > n - 1
  }

  containsPage(page:Page):boolean {
    try {
      this.getShiftAmount(page)
      return true
    }
    catch(Error) {
      return false
    }
  }

  /**
   * Gets the distance and direction of a page on the stack
   * @param page - The page to look for
   * @returns {number} - The amount (-2 = 2 steps back)
   * @throws Error if page not found
   */
  getShiftAmount(page:Page):number {
    if (page.equals(this.current)) {
      return 0
    }
    else {
      const findIndex = R.findIndex(page.equals.bind(page))
      if (!R.isEmpty(this.back)) {
        const i = findIndex(this.back)
        if (i !== -1) {
          return 0 - (this.back.length - i)
        }
      }
      if (!R.isEmpty(this.forward)) {
        const i = findIndex(this.forward)
        if (i !== -1) {
          return i + 1
        }
      }
    }
    throw new Error('Page not found')
  }

  /**
   * Go to a given page on the stack
   * @param page - The page to look for
   * @param time - The time this action was originally run
   * @returns {HistoryStack} - A new HistoryStack with this action performed
   * @throws Error if page not found
   */
  shiftTo(page:Page, time):HistoryStack {
    return this.go(this.getShiftAmount(page), time)
  }

  get activePage():Page {
    return this.current
  }

  get backPage():Page {
    return R.last(this.back)
  }

  get forwardPage():Page {
    return R.head(this.forward)
  }

  get firstVisited():number {
    return ([...this.back, this.current][0]).firstVisited
  }

  get lastVisited():number {
    return this.current.lastVisited
  }

  compareTo(other:HistoryStack):number {
    return this.current.compareTo(other.current)
  }
  
  equals(other:HistoryStack):boolean {
    if (this.back.length !== other.back.length || 
        this.forward.length !== other.forward.length) {
      return false
    }
    if (!this.current.equals(other.current)) {
      return false
    }
    for (let i = 0; i < this.back.length; i++) {
      if (!this.back[i].equals(other.back[i])) {
        return false
      }
    }
    for (let i = 0; i < this.forward.length; i++) {
      if (!this.forward[i].equals(other.forward[i])) {
        return false
      }
    }
    return true
  }
}