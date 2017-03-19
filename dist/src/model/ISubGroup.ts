import IContainer from './IContainer'
import Group from './Group'

type ISubGroup = IContainer & Group & {
  replaceContainer(container:IContainer):ISubGroup
}

export default ISubGroup