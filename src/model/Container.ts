import Comparable from './interfaces/Comparable'
import Page from './Page'
import HistoryStack from './HistoryStack'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import IContainer from './interfaces/IContainer'

export default class Container implements Comparable, IContainer {
  readonly name: string
  readonly initialUrl: string
  readonly patterns: string[]
  readonly isDefault: boolean
  readonly resetOnLeave: boolean
  readonly history: HistoryStack
  readonly groupName:string

  /**
   * Construct a new Container
   * @param name - The container's name
   * @param initialUrl - The starting URL of this container
   * @param patterns - Patterns of URLs that this container handles
   * @param isDefault - Is this the default container?
   * @param resetOnLeave - Keep container history after navigating away?
   * @param groupName - The name of this container's group
   * @param history - Optional but only if time is specified
   */
  constructor({time, name, initialUrl, patterns, isDefault=false,
      resetOnLeave=false, groupName, history}:
      {time:number, name: string, initialUrl: string, patterns: string[],
        isDefault?: boolean, resetOnLeave?: boolean, groupName:string,
        history?: HistoryStack}) {
    this.name = name
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.isDefault = isDefault
    this.resetOnLeave = resetOnLeave
    this.groupName = groupName
    this.history = history ? history : new HistoryStack({
      back: [],
      current: new Page({
        url: initialUrl,
        params: parseParamsFromPatterns(patterns, initialUrl),
        containerName: name,
        groupName,
        firstVisited: 0,
        lastVisited: isDefault ? time : 0
      }),
      forward: []
    })
  }

  replaceHistory(history:HistoryStack):Container {
    return new Container({
      ...Object(this),
      history
    })
  }

  get isAtTopPage():boolean {
    return !this.canGoBack()
  }

  patternsMatch(url:string):boolean {
    return patternsMatch(this.patterns, url)
  }

  push(page:Page):Container {
    return this.replaceHistory(this.history.push(page))
  }

  pushUrl(url:string, time:number):Container {
    if (this.activePage.url === url) {
      return this.activate(time)
    }
    else {
      const page:Page = new Page({
        url,
        params: parseParamsFromPatterns(this.patterns, url),
        containerName: this.name,
        groupName: this.groupName
      })
      return this.activate(time -1).push(page.touch(time))
    }
  }

  loadFromUrl(url:string, time:number):Container {
    if (this.patternsMatch(url)) {
      return this.pushUrl(url, time)
    }
    else {
      return this
    }
  }

  activate(time:number):Container {
    return this.replaceHistory(this.history.activate(time))
  }

  top(time:number, reset:boolean=false):Container {
    return this.replaceHistory(this.history.top(time, reset))
  }

  go(n:number=1, time:number):Container {
    return this.replaceHistory(this.history.go(n, time))
  }

  goForward(n:number=1, time:number):Container {
    return this.replaceHistory(this.history.goForward(n, time))
  }

  goBack(n:number=1, time:number):Container {
    return this.replaceHistory(this.history.goBack(n, time))
  }

  canGoForward(n:number=1):boolean {
    return this.history.canGoForward(n)
  }

  canGoBack(n:number=1):boolean {
    return this.history.canGoBack(n)
  }

  getShiftAmount(page:Page) {
    return this.history.getShiftAmount(page)
  }

  shiftTo(page:Page, time):Container {
    return this.replaceHistory(this.history.shiftTo(page, time))
  }

  containsPage(page:Page):boolean {
    return this.history.containsPage(page)
  }

  get activePage():Page {
    return this.history.activePage
  }

  get backPage():Page {
    return this.history.backPage
  }

  get forwardPage():Page {
    return this.history.forwardPage
  }

  get firstVisited():number {
    return this.history.firstVisited
  }

  get lastVisited():number {
    return this.history.lastVisited
  }

  compareTo(other:IContainer):number {
    try {
      return this.history.compareTo(other.history)
    }
    catch(e) {
      return -1
    }
  }

  get isGroup():boolean {
    return false
  }
}