import State from '../State'
import Action, {Origin, ActionOrigin} from '../Action'
import Page from '../Page'
import {parseParamsFromPatterns} from '../../util/url'
import SwitchToContainer from './SwitchToContainer'
import Serializable from '../../store/decorators/Serializable'
import Container from '../Container'
import Push from './Push'
import Step from '../Step'
import ReplaceStep from '../steps/ReplaceStep'

@Serializable
export default class Replace extends Push {
  static readonly type: string = 'Replace'
  readonly type: string = Replace.type

  fn(state:State):Function {
    return state.replace
  }

  addSteps(steps: Step[], state: State): Step[] {
    return [...steps, new ReplaceStep(this.createPage(state))]
  }
}