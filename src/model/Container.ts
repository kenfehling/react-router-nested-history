import Page from './Page'
import {parseParamsFromPatterns, patternsMatch} from '../util/url'
import PageVisit, {VisitType} from './PageVisit'

export default class Container {
  readonly name: string
  readonly enabled: boolean
  readonly initialUrl: string
  readonly patterns: string[]
  readonly isDefault: boolean
  readonly resetOnLeave: boolean
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
   */
  constructor({time, name, enabled=true, initialUrl, patterns,
               isDefault=false, resetOnLeave=false, groupName}:
      {time:number, name:string, enabled?:boolean,
         initialUrl:string, patterns:string[], isDefault?:boolean,
        resetOnLeave?:boolean, groupName:string}) {
    this.name = name
    this.enabled = enabled
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.isDefault = isDefault
    this.resetOnLeave = resetOnLeave
    this.groupName = groupName
  }

  get wasManuallyVisited():boolean {
    return this.isDefault || this.activePage.wasManuallyVisited
  }

  patternsMatch(url:string):boolean {
    return patternsMatch(this.patterns, url)
  }

  push({page, time, type}:{page: Page, time:number, type?:VisitType}):Container {
    return this.setEnabled(true).replacePages(this.pages.push({page, time, type}))
  }

  pushUrl({url, time, type=VisitType.MANUAL}:
          {url:string, time:number, type?:VisitType}):Container {
    if (this.activePage.url === url) {
      return this.activate({time, type})
    }
    else {
      const page:Page = new Page({
        url,
        params: parseParamsFromPatterns(this.patterns, url),
        containerName: this.name,
      })
      return this.push({page, time, type})
    }
  }

  load({url, time}:{url: string, time: number}):IContainer {
    if (this.patternsMatch(url)) {
      const container:Container = this.isAtTopPage ?
          this.activate({time: time - 1, type: VisitType.MANUAL}) : this
      return container.pushUrl({url, time, type: VisitType.MANUAL})
    }
    else {
      return this
    }
  }

  activate(visit:PageVisit):Container {
    return this.replacePages(this.pages.activate(visit))
  }

  top({time, reset=false}:{time: number, reset?:boolean}):Container {
    return this.replacePages(this.pages.top({time, reset}))
  }

  getShiftAmount(page:Page) {
    return this.pages.getShiftAmount(page)
  }

  shiftTo({page, time}:{page:Page, time}):Container {
    return this.replacePages(this.pages.shiftTo({page, time}))
  }

  containsPage(page:Page):boolean {
    return this.pages.containsPage(page)
  }

  get firstManualVisit():PageVisit|undefined {
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
}