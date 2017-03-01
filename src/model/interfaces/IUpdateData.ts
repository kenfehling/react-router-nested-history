import IState from '../IState'
import Action from '../Action'
import LocationTitle from '../../react/model/LocationTitle'

interface IUpdateData {
  readonly lastAction: Action
  readonly state: IState
}

export default IUpdateData