abstract class IContainer {
  readonly name: string
  readonly isDefault: boolean
  readonly resetOnLeave: boolean
  readonly group: string|undefined

  abstract get isGroup(): boolean
}

export default IContainer