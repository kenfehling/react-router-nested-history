import { createStore } from 'redux'
import { autoRehydrate } from 'redux-persist'
import reducer, {initialState} from './reducers'

const store = createStore(reducer, initialState, autoRehydrate())

export default store