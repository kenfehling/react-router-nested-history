import IContainer from './IContainer'
import Page from '../Page'
import Pages from '../Pages'

abstract class IGroupContainer extends IContainer {
  abstract get groupName(): string
  abstract get isDefault(): boolean
}

export default IGroupContainer