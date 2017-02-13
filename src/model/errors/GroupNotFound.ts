export default class GroupNotFound implements Error {
  public name: string = 'GroupNotFound'
  public message: string

  constructor(name) {
    this.message = `Group '${name}' not found`
  }
} 