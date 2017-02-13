import Group from '../Group'

export default class ContainerNotFound implements Error {
  public name: string = 'ContainerNotFound'
  public message: string

  constructor(name:string, group:Group) {
    this.message = `'${name}' not found in '${group.name}'`
  }
} 