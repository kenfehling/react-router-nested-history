import Page from './Page'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import IContainer from './IContainer'
import Pages, {HistoryStack} from './Pages'
import PageVisit, {IActionClass} from './PageVisit'
import VisitedPage from './VistedPage'
import Push from './actions/Push'
import LoadFromUrl from './actions/LoadFromUrl'
import CreateContainer from './actions/CreateContainer'

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
      new VisitedPage({
        url: initialUrl,
        params: parseParamsFromPatterns(patterns, initialUrl),
        containerName: name,
        groupName,
        visits: [{time, action: CreateContainer}]
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

  push(page:Page, time:number, action:IActionClass=Push):Container {
    return this.replacePages(this.pages.push(page, time))
  }

  pushUrl(url:string, time:number, action:IActionClass=Push):Container {
    if (this.activePage.url === url) {
      return this.activate({time, action: Push})
    }
    else {
      const page:Page = new Page({
        url,
        params: parseParamsFromPatterns(this.patterns, url),
        containerName: this.name,
        groupName: this.groupName
      })
      return this.push(page, time, action)
    }
  }

  loadFromUrl(url:string, time:number):Container {
    if (this.patternsMatch(url)) {
      return this.pushUrl(url, time, LoadFromUrl)
    }
    else {
      return this
    }
  }

  activate(visit:PageVisit):Container {
    return this.replacePages(this.pages.activate(visit))
  }

  top(time:number, reset:boolean=false):Container {
    return this.replacePages(this.pages.top(time, reset))
  }

  go(n:number, time:number):Container {
    return this.replacePages(this.pages.go(n, time))
  }

  forward(n:number=1, time:number):Container {
    return this.replacePages(this.pages.forward(n, time))
  }

  back(n:number=1, time:number):Container {
    return this.replacePages(this.pages.back(n, time))
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

  get activePage():VisitedPage {
    return this.pages.activePage
  }

  getBackPage(n:number=1):Page|undefined {
    return this.pages.getBackPage(n)
  }

  getForwardPage(n:number=1):Page|undefined {
    return this.pages.getForwardPage(n)
  }

  get backPages():Page[] {
    return this.pages.backPages
  }

  get forwardPages():Page[] {
    return this.pages.forwardPages
  }

  get backLength():number {
    return this.pages.backLength
  }

  get forwardLength():number {
    return this.pages.forwardLength
  }

  get lastVisit():PageVisit {
    return this.pages.lastVisit
  }

  get isGroup():boolean {
    return false
  }
}