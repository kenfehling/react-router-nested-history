import IGroupContainer from './IGroupContainer'
import Group from '../Group'

type ISubGroup = IGroupContainer & Group & {
  replaceContainer(container:IGroupContainer):ISubGroup
}

export default ISubGroup