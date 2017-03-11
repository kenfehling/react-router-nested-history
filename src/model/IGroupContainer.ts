import IContainer from './IContainer'

abstract class IGroupContainer extends IContainer {
  abstract get groupName(): string
  abstract get isDefault(): boolean
}

export default IGroupContainer