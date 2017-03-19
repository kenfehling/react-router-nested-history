import ISerializableClass from './ISerializableClass'
import {Map, fromJS} from 'immutable'

// Stores all classes with @Serializable decorator

class Serializables {
  serializables:Map<string, ISerializableClass>

  constructor() {
    this.serializables = fromJS({})
  }

  set(key:string, value:ISerializableClass) {
    this.serializables = this.serializables.set(key, value)
  }

  get(key:string) {
    return this.serializables.get(key)
  }

  has(key:string) {
    return this.serializables.has(key)
  }
}

export default new Serializables()