import Page from './Page'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import IContainer from './IContainer'
import Pages, {HistoryStack} from './Pages'
import PageVisit, {VisitType} from './PageVisit'
import VisitedPage from './VistedPage'
import {ComputedContainer, ComputingWindow} from './ComputedState'
import HistoryWindow from './HistoryWindow'
import {Map, fromJS, OrderedMap} from 'immutable'

export default class Container implements IContainer {
  readonly name: string
  readonly enabled: boolean
  readonly associatedWindow: HistoryWindow|undefined
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
   * @param enabled - Is this container enabled/visible?
   * @param initialUrl - The starting URL of this container
   * @param patterns - Patterns of URLs that this container handles
   * @param isDefault - Is this the default container?
   * @param resetOnLeave - Keep container history after navigating away?
   * @param groupName - The name of this container's group
   * @param pages - The pages visited in this container
   */
  constructor({time, name, enabled=true, associatedWindow, initialUrl, patterns,
               isDefault=false, resetOnLeave=false, groupName, pages}:
      {time:number, name:string, enabled?:boolean,
        associatedWindow?: HistoryWindow, initialUrl:string, patterns:string[],
        isDefault?:boolean, resetOnLeave?:boolean, groupName:string, pages?:Pages}) {
    this.name = name
    this.enabled = enabled
    this.associatedWindow = associatedWindow
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
        visits: [{time, type: isDefault ? VisitType.MANUAL : VisitType.AUTO}]
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

  replaceWindow(w:HistoryWindow):Container {
    return new Container({
      ...Object(this),
      associatedWindow: w
    })
  }

  get wasManuallyVisited():boolean {
    return this.isDefault || this.activePage.wasManuallyVisited
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

  push(page:Page, time:number, type:VisitType=VisitType.MANUAL):Container {
    return this.setEnabled(true).replacePages(this.pages.push(page, time, type))
  }

  pushUrl(url:string, time:number, type:VisitType=VisitType.MANUAL):Container {
    if (this.activePage.url === url) {
      return this.activate({time, type})
    }
    else {
      const page:Page = new Page({
        url,
        params: parseParamsFromPatterns(this.patterns, url),
        containerName: this.name,
      })
      return this.push(page, time, type)
    }
  }

  loadFromUrl(url:string, time:number):IContainer {
    if (this.patternsMatch(url)) {
      const container:Container = this.isAtTopPage ?
          this.activate({time: time - 1, type: VisitType.MANUAL}) : this
      return container.pushUrl(url, time, VisitType.MANUAL)
    }
    else {
      return this
    }
  }

  activate(visit:PageVisit):Container {
    return this.setEnabled(true).replacePages(this.pages.activate(visit))
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

  get activeUrl():string {
    return this.activePage.url
  }

  get backPage():Page|undefined {
    return this.pages.backPage
  }

  get forwardPage():Page|undefined {
    return this.pages.forwardPage
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

  get firstManualVisit():PageVisit|null {
    return this.pages.firstManualVisit
  }

  get lastVisit():PageVisit {
    return this.pages.lastVisit
  }

  get isGroup():boolean {
    return false
  }

  setEnabled(enabled:boolean):Container {
    return new Container({...Object(this), enabled})
  }

  computeState():ComputedContainer {
    return {
      name: this.name,
      enabled: this.enabled,
      activeUrl: this.activeUrl,
      history: this.history
    }
  }

  private computeWindow(parentVisible:boolean):ComputingWindow {
    if (this.associatedWindow) {
      return {
        forName: this.name,
        visible: parentVisible && this.enabled,
        groupName: this.groupName
      }
    }
    else {
      throw new Error('No associated window')
    }
  }

  /**
   * Returns a map with 0 or 1 items
   */
  computeWindows(parentVisible:boolean):Map<string, ComputingWindow> {
    const map = OrderedMap<string, ComputingWindow>()
    if (this.associatedWindow) {
      return map.set(this.name, this.computeWindow(parentVisible))
    }
    else {
      return map
    }
  }
}