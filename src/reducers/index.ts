import ReduxState from '../model/interfaces/ReduxState'
import Action from '../model/Action'
import {deserialize, isSerialized, ISerialized} from '../util/serializer'
import {REHYDRATE} from 'redux-persist/constants'

const initialState:ReduxState = {
  actions: []
}

export default (store:ReduxState=initialState, obj:ISerialized):ReduxState => {
  if (isSerialized(obj)) {
    const action:Action = deserialize(obj) // convert back into Action object
    return action.store(store)  // run action's store reducer
  }
  else {
    switch(obj.type) {
      case REHYDRATE:
        const action:any = obj as any
        const objs:Object[] = action.payload.actions || []
        const actions:Action[] = objs.map(deserialize)
        return actions.reduce((store:ReduxState, action:Action):ReduxState =>
            action.store(store), store)
    }
    return store
  }
}