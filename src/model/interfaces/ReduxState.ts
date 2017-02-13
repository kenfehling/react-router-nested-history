import {ISerialized} from '../../util/serializer'

interface ReduxState {
  readonly actions: ISerialized[]
}

export default ReduxState