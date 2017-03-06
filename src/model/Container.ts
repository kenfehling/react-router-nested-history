import Page from './Page'
import HistoryStack from './HistoryStack'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import IContainer from './interfaces/IContainer'
import Pages from './Pages'

export default class Container implements IContainer {
  readonly name: string
  readonly initialUrl: string
  readonly patterns: string[]
  readonly isDefault: boolean
  readonly resetOnLeave: boolean
  readonly pages: Pages
  readonly groupName:string

  /**
   * Construct a new Container
   * @param time - The time this container was created
   * @param name - The container's name
   * @param initialUrl - The starting URL of this container
   * @param patterns - Patterns of URLs that this container handles
   * @param isDefault - Is this the default container?
   * @param resetOnLeave - Keep container history after navigating away?
   * @param groupName - The name of this container's group
   * @param pages - The pages visited in this container
   */
  constructor({time, name, initialUrl, patterns, isDefault=false,
      resetOnLeave=false, groupName, pages}:
      {time:number, name: string, initialUrl: string, patterns: string[],
        isDefault?: boolean, resetOnLeave?: boolean, groupName:string,
        pages?:Pages}) {
    this.name = name
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.isDefault = isDefault
    this.resetOnLeave = resetOnLeave
    this.groupName = groupName
    this.pages = pages || new Pages([
      new Page({
        url: initialUrl,
        params: parseParamsFromPatterns(patterns, initialUrl),
        containerName: name,
        groupName
      })
    ])
  }

  replacePages(pages:Pages):Container {
    return new Container({
      ...Object(this),
      pages
    })
  }

  updatePages(pages:Pages):Container {
    return new Container({
      ...Object(this),
      pages: this.pages.update(pages)
    })
  }

  get isAtTopPage():boolean {
    return !this.canGoBack()
  }

  patternsMatch(url:string):boolean {
    return patternsMatch(this.patterns, url)
  }

  get history():HistoryStack {
    return this.pages.toHistoryStack()
  }

  push(page:Page, time:number):Container {
    return this.replacePages(this.pages.push(page, time))
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
        groupName: this.groupName,
        firstVisited: time
      })
      return this.push(page, time)
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
    return this.replacePages(this.pages.activate(time))
  }

  top(time:number, reset:boolean=false):Container {
    return this.replacePages(this.pages.top(time, reset))
  }

  go(n:number, time:number):Container {
    return this.replacePages(this.pages.go(n, time))
  }

  goForward(n:number=1, time:number):Container {
    return this.replacePages(this.pages.goForward(n, time))
  }

  goBack(n:number=1, time:number):Container {
    return this.replacePages(this.pages.goBack(n, time))
  }

  canGoForward(n:number=1):boolean {
    return this.pages.canGoForward(n)
  }

  canGoBack(n:number=1):boolean {
    return this.pages.canGoBack(n)
  }

  getShiftAmount(page:Page) {
    return this.pages.getShiftAmount(page)
  }

  shiftTo(page:Page, time):Container {
    return this.replacePages(this.pages.shiftTo(page, time))
  }

  containsPage(page:Page):boolean {
    return this.pages.containsPage(page)
  }

  get activePage():Page {
    return this.pages.activePage
  }

  getBackPage(n:number=1):Page {
    return this.pages.getBackPage(n)
  }

  getForwardPage(n:number=1):Page {
    return this.pages.getForwardPage(n)
  }

  get lastVisited():number {
    return this.pages.lastVisited
  }

  get isGroup():boolean {
    return false
  }
}