import IGroupContainer from './IGroupContainer'

export default class Container implements IGroupContainer {
  readonly name: string
  readonly initialUrl: string
  readonly patterns: string[]
  readonly isDefault: boolean
  readonly resetOnLeave: boolean
  readonly group:string

  /**
   * Construct a new Container
   * @param name - The container's name
   * @param initialUrl - The starting URL of this container
   * @param patterns - Patterns of URLs that this container handles
   * @param isDefault - Is this the default container?
   * @param resetOnLeave - Keep container history after navigating away?
   * @param group - The name of this container's group
   */
  constructor({name, initialUrl, patterns, isDefault=false, resetOnLeave=false, group}:
              {name:string, enabled?:boolean, initialUrl:string, patterns:string[],
               isDefault?:boolean, resetOnLeave?:boolean, group:string}) {
    this.name = name
    this.initialUrl = initialUrl
    this.patterns = patterns
    this.isDefault = isDefault
    this.resetOnLeave = resetOnLeave
    this.group = group
  }

  get isGroup():boolean {
    return false
  }
}